(function () {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  var scriptUrl = document.currentScript ? document.currentScript.src : window.location.origin + "/assets/js/pwa.js";

  window.addEventListener("load", function () {
    var workerUrl = new URL("../../service-worker.js", scriptUrl);
    var scopeUrl = new URL("../../", scriptUrl);

    navigator.serviceWorker.register(workerUrl.pathname, { scope: scopeUrl.pathname }).then(function (registration) {
      registration.update();
    }).catch(function () {
      // The site still works as a static page if registration is unavailable.
    });
  });
})();
