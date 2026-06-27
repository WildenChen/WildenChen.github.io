---
title: "實作 Swift 設計模式"
---

# 實作 Swift 設計模式

說到設計模式，相信大家都不陌生，但是又有多少人知道它背後的真正含義？絕大多數程式設計師都知道設計模式十分重要，不過關於這個話題的文章卻不是很多，開發者們在開發的時候有時也不太在意設計模式方面的內容。

設計模式針對應用程式設計中的常見問題，提供了一些靈活的解決方案，開發者可以通過這些程式設計的方式寫出易於理解且能夠重複應用的程式碼。正確的使用設計模式可以降低程式碼之間的耦合度，很輕鬆的修改或者替換以前的程式碼。

大家對設計模式這名詞雖然感覺還很陌生，其實在我們現在做過的各種專案，尤其是感覺被我半強迫要遵守的程式撰寫的規則，無論是命名、LionEvents Framework等，其實你在不知不覺已經用了很多設計模式。這得益於 Cocoa 提供的框架和一些良好的程式撰寫的習慣。接下來的這篇教程將會帶你一起領略設計模式的魅力。

## 常見模式

第一部分我們將會完成一個完整的應用，展示 Flickr 推薦照片 的瀏覽器應用程式。

通過開發這個應用程式，我們會接觸一些 Cocoa 中常見的設計模式：

* 創建型 \(Creational\)：單例模式 \(Singleton\)、簡易工廠模式\(Simple Factory\)
* 結構型 \(Structural\)：裝飾者模式 \(Decorator\)、適配器模式 \(Adapter\)、外觀模式 \(Facade\)、MVC、MVP
* 行為型 \(Behavioral\)：觀察者模式 \(Observer\)、事件流模式 \(Event Flow\)

先來預覽一下最終的結果：

我們將會完成一個完整的應用，展示 Flickr 推薦照片 的瀏覽器應用程式。

通過開發這個應用程式，我們會接觸一些 Cocoa 中常見的設計模式：

* 創建型 \(Creational\)：單例模式 \(Singleton\)、簡易工廠模式\(Simple Factory\)
* 結構型 \(Structural\)：裝飾者模式 \(Decorator\)、適配器模式 \(Adapter\)、外觀模式 \(Facade\)、MVC、MVP
* 行為型 \(Behavioral\)：觀察者模式 \(Observer\)、事件流模式 \(Event Flow\)

### 聲明

而本書的教學內容，經過改編後，並不適合一開始剛接觸 iOS 開發的新手，而是已經熟悉基本 Swift 撰寫開發以外，並且對於物件導向 OOP 已經有基本概念的開發者進一步學習使用。

1. 已有 OOP 概念。
2. 已熟悉 Swift 程式語言。
3. 已瞭解 Project、Library、WorkSpace 以及 cocoaPods 使用方式。

在 `Xcode 7` 中進行撰寫測試， `Swift 2.1`

### 本書改編自：

* [Swift设计模式 \(iOS\)](https://www.gitbook.com/book/yourtion/swiftdesignpatterns/details)
* [iOS 中的設計模式 \(Swift版本\) Part 1](http://blog.callmewhy.com/2014/12/29/introducing-ios-design-patterns-in-swift-part-1/)
* [iOS 中的設計模式 \(Swift版本\) Part 2](http://blog.callmewhy.com/2015/03/01/introducing-ios-design-patterns-in-swift-part-2/)
* [大話設計模式](http://www.books.com.tw/products/0010430101)

### 完成檔案

[範例完整版](https://github.com/wildenchen/swift-bethel-of-the-road/tree/eed3c8ff6c1141681b3d3b2c69fac406cd11c24c/DesignPatterns/workspaces/FlickrPhotos-Finish.zip)

---

## 本書目錄

* [入門 - 開始](gettingstarted.html)
* [設計模式之王 - MVC](mvc.html)
* [如何使用 MVC 模式](use-mvc.html)
* [簡易工廠模式 - Simple Factory](simplefactory.html)
* [如何使用 簡易工廠模式](use-simplefactory.html)
* [外觀模式 - Facade](facade.html)
* [如何使用外觀模式](use-facade.html)
* [裝飾者模式 - Decorator](decorator.html)
  * [裝飾者 - 擴展](decorator-extension.html)
  * [如何使用擴展](use-decorator-extension.html)
  * [裝飾者 - 委派](decorator-delegation.html)
  * [如何使用委派模式](use-decorator-delegation.html)
* [單例模式 - Singleton](singleton.html)
* [如何使用單例模式](use-singleton.html)
* [適配器模式 - Adapter](adapter.html)
* [如何使用適配器模式](use-adapter.html)
* [觀察者模式 - Observer](observer.html)
  * [通知 - Notification](notification.html)
  * [鍵值觀察 - KVO](kvo.html)
  * [事件流 - Event Flow](eventflow.html)
* [設計模式之神話 - MVP](mvp.html)
* [如何使用 MVP 模式](use-mvp.html)
* [最後的潤色](finaltouches.html)
* [本章小結](final.html)

---

**作者：雄獅資訊 - 互動系統部 - Wilden**

* wildenchen@liontravel.com
* GitBook 編寫

