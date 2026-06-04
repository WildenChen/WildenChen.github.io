---
title: "入門 - 開始"
---

# 入門 - 開始

下載[初始項目](https://github.com/wildenchen/swift-bethel-of-the-road/tree/eed3c8ff6c1141681b3d3b2c69fac406cd11c24c/DesignPatterns/workspaces/FlickrPhotos-Start.zip)並解壓，在 Xcode 中打開 `FlickrPhotos.xcworkspace` 專案。

項目中有三個地方需要注意一下：

* `Podfile` 是 cocoapods 的描述檔，用來管理專案會用到的各類第三方的 Library 或是 Framework，檔案內容是`Ruby`語法。
* `AppleDegegate.swift` 是我們應用程式主要的程式進入點，裡面的 UIWindow 為主要的視覺容器，並且把畫面的主頁 `MainViewController.swift` 設定好背景顏色為白色。
* `FlickrAPI.swf`是 Flickr 的 API 網址基本資料。

![](../.gitbook/assets/intro-1.png)

> 注意：其實當你建立一個新的 Xcode 的專案的時候，你的程式碼裡面就已經有很多設計模式的影子了： MVC、委託、代理、單一。

在學習第一個設計模式之前，你需要建立兩個類別，用來存儲和展示照片資料。

建立一個新的類別，不要繼承任何東西，命名為 `PhotoVO` ，記得選擇 Swift 作為撰寫語言然後點擊下一步。

打開 `PhotoVO.swift` 然後添加如下定義：

```swift
import Foundation
import UIKit

class PhotoVO {
    var id      :String?
    var farm    :String?
    var server  :String?
    var secret  :String?
    var title   :String?
    var owner   :String?
    var url     :String = ""
}
```

VO，是Variable Object的簡寫，意思是一個只有儲存數據資料的物件。 這裡宣告了七個屬性，分別對應照片的編號、標題、作者、縮圖網址、大圖網址和大圖的寬高。

接下來我們添加一個建構式/初始化方法：

```swift
 init(aID:String,aFarm:String,aServer:String,aSecret:String) {
   self.id = aID
   self.farm = aFarm
   self.server = aServer
   self.secret = aSecret

        self.url = "https://farm\(aFarm).staticflickr.com/\(aServer)/\(aID)_\(aSecret)"
    }
```

加入初始化方法以後，表示全部的屬性都不會有空值，這樣我們就可以原本宣告的七個屬性的問號移除。

然後再遵從 `CustomStringConvertible` 這個協定，加上下面這個屬性：

```swift
    var description:String {
        let _result:String = "PhotoVO" + "fram:\(self.farm)"
        + "server:\(self.server)" + "id:\(self.id)"
        + "secret:\(self.secret)"
        return _result
    }
```

這是 PhotoVO 的文字格式化方法，詳細的印出了 `PhotoVO` 的所有屬性值，方便我們查看各個屬性的值。

所以在 swift 中一個完整的 VO \(Variable Object\)應該如下：

```swift
import Foundation

class PhotoVO:CustomStringConvertible {
    var id      :String?
    var farm    :String?
    var server  :String?
    var secret  :String?
    var title   :String?
    var owner   :String?
    var url     :String = "" 
    init(aID:String,aFarm:String,aServer:String,aSecret:String,aTitle:String,aOwner:String) {
        self.id = aID
        self.farm = aFarm
        self.server = aServer
        self.secret = aSecret
        self.title = aTitle
        self.owner = aOwner
        self.url = "https://farm\(aFarm).staticflickr.com/\(aServer)/\(aID)_\(aSecret)"
    }

    var description:String {
        let _result:String = "PhotoVO" + "fram:\(self.farm)"
            + "server:\(self.server)" + "id:\(self.id)"
            + "secret:\(self.secret)" + "title: \(self.title)"
            + "owner:\(self.owner)"
        return _result
    }
}
```

接下來，再建立一個繼承自 `UIView` 的顯示物件類別 `PhotoView.swift`。

在新建的類別中添加兩個屬性：

```swift
private var mImageView      :UIImageView             = UIImageView()
private var mLoadingView    :UIActivityIndicatorView = UIActivityIndicatorView()
```

`mImageView` 代表了圖片， `mLoadingView` 則是在載入過程中顯示的等待指示器。

這兩個屬性都是私有屬性，因為除了 `PhotoView` 之外，其他類別沒有必要知道這兩個實體的存在。在寫一些框架或者類別庫的時候，這種規範十分重要，可以避免一些誤操作。

接下來給這個類別添加初始化方法：

```swift
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.backgroundColor = UIColor.blue
        mLoadingView.activityIndicatorViewStyle = UIActivityIndicatorViewStyle.whiteLarge
        mImageView.contentMode = UIViewContentMode.scaleAspectFit
        self.addSubview(mImageView)
        self.addSubview(mLoadingView)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
```

因為 `UIView` 遵從 `NSCoding` 協議，所以我們需要 `NSCoder` 的初始化方法。不過目前我們沒有 `encode` 和 `decode` 的必要，所以就把它放在那裡就行，調用父類方法初始化即可。

在真正的初始化方法: `init:frame:` ，筆者設置了一些初始化的預設值。比如設置背景顏色預設為藍色，建立 `UIImageView` 並設置了 `margin` 值，加了一個載入顯示元件。

我們再加上如下方法：

```swift
func setHighlight(aIsHightlight:Bool) {
    if aIsHightlight {
        self.backgroundColor = UIColor.white
    } else {
        self.backgroundColor = UIColor.blue
    }
}

override func drawRect(rect: CGRect) {
    // Drawing code
    mImageView.frame = CGRect(x: 5.0, y: 5.0, width: rect.width - 10.0, height: rect.height - 10.0)
        mLoadingView.center = CGPoint(x: rect.width / 2.0, y: rect.height / 2.0)
}
```

這會切換照片的背景顏色，如果高亮就是白色，否則就是黑色。

在繼續下面的內容之前， `Command + B` 試一下確保沒有什麼問題，一切正常？那就開始第一個設計模式的學習啦！

完成到這一步的Demo：

* [下載ZIP](https://github.com/wildenchen/swift-bethel-of-the-road/tree/eed3c8ff6c1141681b3d3b2c69fac406cd11c24c/DesignPatterns/workspaces/FlickrPhotos-1.zip)

