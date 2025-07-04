# 第一章 Swift 語言介紹與開發環境

Swift 是由 Apple 創造，強大且直覺易用的全新程式語言，用於打造 iOS 與 Mac 的 app。

Application 的構成很簡單，其中包含了「美術設計」與「互動設計」兩大部分，美術設計使用設計工具製作精美的圖片，讓使用者可以賞心悅目的觀看畫面效果的呈現，製作完的成品可以儲存在一個 Images.xcassets 資料夾中，或是使用 XCode 內建的 Interface Builder 製作 storyboard 或 xib。

互動設計則是描述畫面上的元件該如何與使用者互動，它是一種邏輯的組合，簡稱為程式。在 iOS App 中是用 Swift 或是 Objective-C 來完成，撰寫完的程式儲存在 swift檔或 h檔與 m檔中。

當這兩大部分結合在一起時，才能夠發揮精緻與互動兼具的效果。

專案完成後，就可以經過 Xcdoe 的編譯成為 app檔，這個 app檔是以中介碼\(Bytecode\)的方式存在，最後再經由 OS 系統來進行執行的動作，

```text
*.swift + xib/StoryBoard + <Images.xcassets> -> App
```

如上所示，一個 App 的專案就是這樣構成而已。

這個觀念與 JAVA 是非常相似的，JAVA 也會先編譯成 JAVA 中介碼\(JAVA Bytecode\)，並交由 JVM\(Java Virtual Machine\)在不同的作業系統上執行。像 Android 則是透過 Dalvik VM 來執行 Android App。

而和 Android 開發的不同處，就在於 JAVA 要透過 VM 來執行應用程式，而在 OS 的系統下，VM 是直接建立在系統層級內的。

