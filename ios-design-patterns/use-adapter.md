---
title: "如何使用適配器模式"
---

# 如何使用適配器模式

到目前我們完成了可以呈現照片的 PhotoView，還希望能夠有一個資訊導覽列，用作顯示目前的圖片訊息，所以我們再新增一個繼承 `UIView` 的類別，取名為 `InfoBarView` ，並完成下面程式碼。

```swift
import UIKit

class InfoBarView: UIView {
    private let mInfoLabel:UILabel = UILabel()
    var infoLabel:UILabel{
        return mInfoLabel
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.backgroundColor = UIColor.whiteGoldColor()
        mInfoLabel.textColor = UIColor.goldColor()
        mInfoLabel.font = UIFont.systemFont(ofSize: 20.0)
        mInfoLabel.text = "Photo Information"
        mInfoLabel.textAlignment = NSTextAlignment.left
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }


    override func draw(_ rect: CGRect) {
        mInfoLabel.frame = CGRect(x: 20.0, y: 0.0, width: rect.width - 40.0, height: rect.height)
        self.addSubview(mInfoLabel)
    }

    func setText(aText:String) {
        mInfoLabel.text = aText
    }

    func setHighlight(aIsHighlight:Bool) {
        if aIsHighlight {
            mInfoLabel.textColor = UIColor.whiteGoldColor()
            self.backgroundColor = UIColor.goldColor()
        } else {
            mInfoLabel.textColor = UIColor.goldColor()
            self.backgroundColor = UIColor.whiteGoldColor()
        }
    }
}
```

我們建立了一個繼承自 UIView 但是又是用做文字功能的一個自訂 View，其實在最開始我們自訂 PhotoView 時，應該就有類似的感覺：

* PhotoView 有著和 UIImageView 類似的功能，但是 PhotView 不是繼承 UIImageView 做出來的 View，而是繼承 UIView 來複合 UIImageView。
  * PhotoView 可以從外部類別實體去賦予 PhotoView 的 UIImage 做圖片的顯示。
  * UIImageView 可以從外部類別實體去賦予 PhotoView 的 UIImage 做圖片的顯示。
* InfoBarView 有著和 UILabel 類似的功能，，但是 InfoBarView 不是繼承 UILabel 做出來的 View，而是繼承 UIView 來複合 UILabel。
  * InfoBarView 可以從外部類別實體去賦予 InfoBarView 的 String 做字串的顯示。
  * UILabel 可以從外部類別實體去賦予 UILabel 的 String 做字串的顯示。

> 若無法理解上述內容的，可以回顧 `Swift 殿堂之路` 的`繼承與複合`的篇章，這也是適配器模式的主要概念。

適配器模式的概念，在於把兩個以上不同類別中相同的功能整理出來，甚至可以把這些沒有彼此直接繼承的不同類別當成同一個「類別」來使用。

有沒有發現，高光的功能，不管是資訊列 `InfoBarView` 以及 `PhotoView` 都有這功能，儘管他們有不同的內容，但是卻有同樣的方法名稱，而且使用的時機與情景也幾乎一樣。

在我們實際導入 Adapter 模式之前，我們先嘗試用目前的程式碼做一次操作。我們在 `MainViewController` 裡的`viewDidLoad` 再添加 InforBarView 的視覺物件，並修改之前範例建立的 UIButton 的 \#selector。

先宣告我們要測試的 `InfoBarView` 以及一個高亮開關 `mIsHighLight` 。

```swift
    private let mInfoView    :InfoBarView  = InfoBarView()
    private var mIsHighLight :Bool         = false
```

```swift
    private func createDemoLayout(){
        mFlickrModel.loadFlickrData(aPageIndex:1)

        for _index in 0..<10 {
            let _photoView  :PhotoView = PhotoView()
            let _boardWidth :CGFloat = 5.0
            let _dWidth     :CGFloat = (self.view.bounds.width - _boardWidth * 5.0)  / 4.0
            let _dHeight    :CGFloat = (self.view.bounds.height - _boardWidth * 6.0) / 5.0
            let _dX         :CGFloat = _boardWidth + CGFloat(_index % 4) * (_dWidth + _boardWidth)
            let _dY         :CGFloat = 50.0 + CGFloat(_index / 4) * (_dHeight + _boardWidth)
            _photoView.frame = CGRect(x:_dX, y:_dY , width:_dWidth, height:_dHeight)

            self.view.addSubview(_photoView)
            mPhotoViews.append(_photoView)
        }

        let _button:UIButton = UIButton()
        _button.frame = CGRect(x:10.0, y:self.view.bounds.height - 30.0, width:self.view.bounds.width - 20.0, height:25.0)
        _button.backgroundColor = UIColor.red
        self.view.addSubview(_button)

        _button.addTarget(self, action: #selector(self.onTestHighLightHandler), for: UIControlEvents.touchUpInside)

        mInfoView.frame = CGRect(x: 0.0, y: self.view.bounds.height - 80.0, width: self.view.bounds.width, height: 20.0)
        self.view.addSubview(mInfoView)
    }

    func onTestHighLightHandler(){
        mIsHighLight = !mIsHighLight
        mInfoView.setHighlight(aIsHighlight:mIsHighLight)
        for _photoView:PhotoView in mPhotoViews {
            _photoView.setHighlight(aIsHightlight:mIsHighLight)
        }
 }
```

其實，是因為在編寫`InfoBarView`的時候，我們故意把設定底圖狀態方法的名稱取的跟`PhotoView`的設定底圖狀態方法一樣，所以在外面的類別使用這些方法的時候，才會有統一性與一致性。

再導入 Adapter 模式，我們需要再開啟一個新的檔案，在`Views`這資料夾裡再添加一個檔案`HighLightable.swift`，

```swift
import Foundation

protocol HighLightable{
    func setHighlight(aIsHighlight:Bool)
}
```

只要有需要這功能的，無論是視覺物件或是資料，都可以實做這個協定。

我們再把我們的 `PhotoView` 以及 `InfoBarView` 都遵從這協定。

當然，因為方法名稱我們之前都取好了，所以雖然實踐這個協定，但是程式碼內容幾乎都不用改動。

```swift
class PhotoView: UIView,HighLightable {
    // 中間略
}
```

```swift
class InfoBarView: UIView,HighLightable {
    // 中間略
}
```

我們來看看 `MainViewController.swift` 裡面，我們在做這樣的修改：

```swift
    private var mHighLightViews:[HighLightable] = [HighLightable]()
```

先把協定的 `HighLightable` 當成類別宣告一個陣列。 然後在 `self.view.addSubview` 的下面都分別把有實踐 `HighLightable` 協定的物件都加進去，有 `PhotoView` 和 `InfoBarView` 。

```swift
    private func createDemoLayout() {
        mFlickrModel.loadFlickrData(aPageIndex:1)

        for _index:UInt in 0..<10 {
            let _photoView  :PhotoView = PhotoView()
            let _boardWidth :CGFloat = 5.0
            let _dWidth     :CGFloat = (self.view.bounds.width - _boardWidth * 5.0)  / 4.0
            let _dHeight    :CGFloat = (self.view.bounds.height - _boardWidth * 6.0) / 5.0
            let _dX         :CGFloat = _boardWidth + CGFloat(_index % 4) * (_dWidth + _boardWidth)
            let _dY         :CGFloat = 50.0 + CGFloat(_index / 4) * (_dHeight + _boardWidth)
            _photoView.frame = CGRect(x: _dX,y: _dY ,width: _dWidth, height:_dHeight)

            self.view.addSubview(_photoView)
            mHighLightViews.append(_photoView)
        }

        let _button:UIButton = UIButton()
        _button.frame = CGRect(x:10.0, y:self.view.bounds.height - 30.0, width:self.view.bounds.width - 20.0, height:25.0)
        _button.backgroundColor = UIColor.red
        self.view.addSubview(_button)

        _button.addTarget(self, action: #selector(self.onTestHighLightHandler), for: UIControlEvents.touchUpInside)

        let _infoView:InfoBarView = InfoBarView()
        _infoView.frame = CGRect(x: 0.0, y: self.view.bounds.height - 80.0, width: self.view.bounds.width, height: 20.0)
        self.view.addSubview(_infoView)
        mHighLightViews.append(_infoView)
    }
```

我們再把按鈕事件給成如下：

```swift
    func onTestHighLightHandler(){
        mIsHighLight = !mIsHighLight
        //mInfoView.setHighlight(aIsHighlight:mIsHighLight)
        for _view:HighLightable in mHighLightViews {
            _view.setHighlight(aIsHighlight:mIsHighLight)
        }
    }
```

是的，本來 `PhotoView` 和 `InfoBarView` 是不同的類別，彼此沒有上下關聯的繼承關係，所以是不可能互相做轉型的，而因為統一了介面，實踐了同樣的協定，所以可以把這些實體都當成 `HighLightable` 的物件來做同樣的操作，而各自都可以實踐他們自己的功能。

這就是 Adapter 適配器模式。

完成到這一步的Demo：

* 查看原始碼
* [下載ZIP](https://github.com/wildenchen/swift-bethel-of-the-road/tree/eed3c8ff6c1141681b3d3b2c69fac406cd11c24c/DesignPatterns/workspaces/FlickrPhotos-Adapter.zip)

