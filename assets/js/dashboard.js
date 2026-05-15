(function () {
  var statusOrder = [
    "All",
    "Reachable",
    "Login page",
    "Sign in",
    "External",
    "JS required",
    "Loading",
    "Needs check",
    "Needs URL",
    "Empty response",
    "Widget only",
    "Widget missing",
    "External login"
  ];
  var reviewStatuses = new Set([
    "JS required",
    "Loading",
    "Needs check",
    "Needs URL",
    "Empty response",
    "Widget only",
    "Widget missing",
    "External login"
  ]);
  var liveStatuses = new Set(["Reachable", "Login page", "Sign in", "External"]);
  var activeStatus = "All";
  var servicesData = null;

  function getBadgeClass(status) {
    if (liveStatuses.has(status)) {
      return "badge-live";
    }
    if (reviewStatuses.has(status)) {
      return status === "JS required" || status === "Loading" || status === "External login" || status === "Widget missing"
        ? "badge-warn"
        : "badge-unknown";
    }
    return "";
  }

  function makeEl(tag, className, text) {
    var el = document.createElement(tag);
    if (className) {
      el.className = className;
    }
    if (text) {
      el.textContent = text;
    }
    return el;
  }

  function flattenServices(data) {
    return data.categories.reduce(function (items, category) {
      return items.concat(
        category.services.map(function (service) {
          return Object.assign({ categoryId: category.id, categoryTitle: category.title }, service);
        })
      );
    }, []);
  }

  function renderSummary(data) {
    var allServices = flattenServices(data);
    var reachable = allServices.filter(function (service) {
      return liveStatuses.has(service.status);
    }).length;
    var review = allServices.filter(function (service) {
      return reviewStatuses.has(service.status);
    }).length;

    document.getElementById("service-count").textContent = String(allServices.length);
    document.getElementById("reachable-count").textContent = String(reachable);
    document.getElementById("review-count").textContent = String(review);
    document.getElementById("audit-date").textContent = data.auditDate || "--";
  }

  function renderFilters(data) {
    var filters = document.getElementById("status-filters");
    var allServices = flattenServices(data);
    var available = new Set(allServices.map(function (service) {
      return service.status;
    }));

    filters.innerHTML = "";
    statusOrder.forEach(function (status) {
      if (status !== "All" && !available.has(status)) {
        return;
      }
      var count = status === "All"
        ? allServices.length
        : allServices.filter(function (service) { return service.status === status; }).length;
      var button = makeEl("button", "filter-chip", status + " " + count);
      button.type = "button";
      button.dataset.status = status;
      button.setAttribute("aria-pressed", status === activeStatus ? "true" : "false");
      button.addEventListener("click", function () {
        activeStatus = status;
        renderFilters(data);
        renderCatalog(data);
      });
      filters.appendChild(button);
    });
  }

  function makeServiceCard(service) {
    var card = makeEl(service.url ? "a" : "article", "service-card");
    if (service.url) {
      card.href = service.url;
      card.rel = "noopener";
    }

    var top = makeEl("div", "service-card-top");
    top.appendChild(makeEl("span", "badge " + getBadgeClass(service.status), service.status));
    top.appendChild(makeEl("span", "service-category", service.categoryTitle));
    card.appendChild(top);

    card.appendChild(makeEl("h3", "", service.name));
    card.appendChild(makeEl("p", "", service.description));

    if (service.url) {
      card.appendChild(makeEl("span", "service-action", "Open"));
    } else {
      card.appendChild(makeEl("span", "service-action muted-action", "No public URL"));
    }

    return card;
  }

  function renderCatalog(data) {
    var catalog = document.getElementById("service-catalog");
    catalog.innerHTML = "";

    data.categories.forEach(function (category) {
      var services = category.services
        .map(function (service) {
          return Object.assign({ categoryTitle: category.title }, service);
        })
        .filter(function (service) {
          return activeStatus === "All" || service.status === activeStatus;
        });

      if (!services.length) {
        return;
      }

      var section = makeEl("section", "service-section");
      var heading = makeEl("h2", "", category.title);
      heading.id = category.id;
      section.setAttribute("aria-labelledby", category.id);
      section.appendChild(heading);

      var grid = makeEl("div", "service-grid");
      services.forEach(function (service) {
        grid.appendChild(makeServiceCard(service));
      });
      section.appendChild(grid);
      catalog.appendChild(section);
    });

    if (!catalog.children.length) {
      var empty = makeEl("div", "notice-panel");
      empty.appendChild(makeEl("h2", "", "沒有符合的服務"));
      empty.appendChild(makeEl("p", "", "換一個狀態篩選，或回到 All 檢視完整清單。"));
      catalog.appendChild(empty);
    }
  }

  function render(data) {
    servicesData = data;
    renderSummary(data);
    renderFilters(data);
    renderCatalog(data);
  }

  fetch("../data/services.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Unable to load services");
      }
      return response.json();
    })
    .then(render)
    .catch(function () {
      var catalog = document.getElementById("service-catalog");
      catalog.innerHTML = "";
      var error = makeEl("div", "notice-panel");
      error.appendChild(makeEl("h2", "", "服務清單暫時無法載入"));
      error.appendChild(makeEl("p", "", "請稍後重新整理，或先使用首頁的其他入口。"));
      catalog.appendChild(error);
    });

  window.wildenDashboard = {
    refresh: function () {
      if (servicesData) {
        render(servicesData);
      }
    }
  };
})();
