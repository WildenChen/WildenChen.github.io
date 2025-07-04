# 如何使用 MVC 模式

首先，你需要確定你的專案中的每個類別都是三大基本類型中的一種：控制器、模型、視圖。不要在一個類別裡耦合多個角色。目前我們建立了 `PhotoVO` 類別和 `PhotoView` 類別是符合要求的。

然後，為了確保你遵循這種模式，你最好建立三個項目分組\(資料夾\)來存放程式碼，分別是 Model、View、Controller，保持每個類型的類別分別獨立。

接下來把 `PhotoVO.swift` 拖到 `Model` 分組，把 `PhotoView.swift` 拖到 `View` 分組，然後把 `MainViewController.swift` 拖到 `Controller` 分組中。然後還有一個工具類型的分組 `Utils`。

現在你的專案應該是這個樣子：

![](../.gitbook/assets/mvc3.png)

現在我們的專案已經有點樣子了，不再是各個檔案顛沛流離居無定所了。顯然你還會有其他分組資料夾和類別，但是應用程式的核心就在這三個分類裡面。

現在你的內容已經組織好了，接下來要做的就是取得 Flickr 的 資料。

筆者將會建立一個 API 類別來描述 Flickr 的 API 資料內容 - 這裡我們會用到下一個設計模式：簡易工廠模式。

完成到這一步的Demo：

* 查看原始碼
* [下載ZIP](https://github.com/wildenchen/swift-bethel-of-the-road/tree/eed3c8ff6c1141681b3d3b2c69fac406cd11c24c/DesignPatterns/workspaces/FlickrPhotos-MVC-1.zip)

