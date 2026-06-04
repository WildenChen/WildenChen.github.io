---
title: "鍵值觀察 - KVO"
---

# 鍵值觀察 - KVO

在 KVO 中，實體物件可以註冊監聽任何屬性的變化，不管它是否持有該屬性。如果感興趣的話，可以讀一讀[蘋果 KVO 編程指南](https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.html)。

## 如何使用 KVO

正如前面所提及的， 實體物件可以關注任何屬性的變化。在我們的專案裡面，我們可以用 KVO 關注 `UIImageView` 的 `image` 屬性變化。

打開 `PhotoView.swift` 文件，找到 `override init(frame: CGRect)` 方法，把 `mImageView` 添加到 `subView` 的程式碼後面添加如下程式：

```swift
let _observOption:NSKeyValueObservingOptions = NSKeyValueObservingOptions([NSKeyValueObservingOptions.new,NSKeyValueObservingOptions.old])
mImageView.addObserver(self, forKeyPath: "image", options: _observOption, context: nil)
```

這行程式把 `self` \(也就是目前類別的實體\) 加到了 `mImageView` 的 `image` 屬性的觀察者裡。

* 觀察者：self
* 被觀察者：mImageView

在銷毀的時候，我們也需要取消觀察。還是在 `PhotoView.swift` 文件里，添加如下代碼：

```swift
deinit {
    mImageView.removeObserver(self, forKeyPath: "image")
}
```

至於觸發的時機，則是內建在 `NSObject` 下的 `observeValueForKeyPath` ，所以我們直接在 `PhotoView` 裡面複寫該方法即可：

```swift
override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        if keyPath == "image" {
            mLoadingView.stopAnimating()
        }
    }
```

必須在所有的觀察者裡複寫上面的程式。在檢測到屬性變化的時候，系統會自動調用這個方法。在上面的程式碼里，我們在圖片載入完成的時候把那個提示加載的小菊花去掉了。

再次運行項目，你會發現一切正常了：

![](../.gitbook/assets/kvo1.png)

注意：一定要記得移除觀察者，否則如果物件已經銷毀了還給它發送消息會導致應用閃退。

完成到這一步的Demo：

* 查看原始碼
* [下載ZIP](https://github.com/wildenchen/swift-bethel-of-the-road/tree/eed3c8ff6c1141681b3d3b2c69fac406cd11c24c/DesignPatterns/workspaces/FlickrPhotos-7-KVO.zip)

