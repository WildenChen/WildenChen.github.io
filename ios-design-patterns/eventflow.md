# 事件流 - Event Flow

`LionEvents` 是雄獅資訊目前 iOS 行動開發使用的一個框架，它實踐了 iOS 所沒有的事件機制，效能比 KVO 以及 Notification 還要快，目前的版本還少了 weak 弱引用的宣告，所以在 ARC 中還有些記憶體釋放的問題，在短時間內會盡快改版\(等到我有空時\)。

事件流是觀察者模式的一種實踐，觀察者與被觀察者在事件流中，被稱為「偵聽者」與「被偵聽者」。

不用通過 `NotificationCenter` 來發送通知，而是自己本身就當成「事件通知」的角色，在事件流裡又稱為「廣播事件」。

我們再打開 `PhotoView.swift` 並且先引用 `LionEvents` 框架。

```swift
import LionEvents
```

我們想要讓 `PhotoView` 也能像按鈕一樣有 `TouchUpInside` 的功能，我們跟之前實踐通知的方式一樣，在 `PhotoView.swift` 也宣告一個靜態常數字串來當事件名稱：

```swift
static let TOUCH_UP_INSIDE:String = "touchUpInside"
```

然後我們再找到之前覆寫的 `touchesEnded(touches: Set<UITouch> , withEvent event: UIEvent?)` ，在 `self.delegate?.onTouchUpInside(_touchendPoint)` 的下面再追加一行：

```swift
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        let _touch:UITouch = touches.first!
        let _touchendPoint:CGPoint = _touch.location(in: self)
        if _touchendPoint.x > 0 && _touchendPoint.x < self.bounds.width && _touchendPoint.y > 0 && _touchendPoint.y < self.bounds.height {
            self.delegate?.onTouchUpInside(aTouchendPoint: _touchendPoint)
            let _event:Event = Event(aType:PhotoView.TOUCH_UP_INSIDE, aBubbles: true)
            _event.information = _touchendPoint
            self.dispatchEvent(_event)
        }
    }
```

這時候，只要手指在 `PhotoView` 裡面按下又在裡面抬起來的時候，就會「廣播」一個叫做 `PhotoView.TOUCH_UP_INSIDE` 的事件。

他的功能跟之前的委派有點類似，但是耦合性卻是更低，我們再打開`MainViewController.swift` ，先引入 `LionEvents` 框架，然後再改寫剛剛的 `createDemoLayoutSecond` ，在裡面對 `PhotoView` 註冊`PhotoView.TOUCH_UP_INSIDE` 事件。

不過別忘記導入 `LionEvents` 框架。

```swift
    private func createDemoLayoutSecond() {
        NotificationCenter.default.addObserver(self, selector:#selector(self.onFlickrDataCompleteHandler(aNotification:)), name: NSNotification.Name(rawValue:FlickrModel.FLICKR_DATA_COMPLETE), object: nil)

        mFlickrModel.loadFlickrData(aPageIndex:1)

        for _index:UInt in 0..<10 {
            let _photoView  :PhotoView = PhotoView()
            let _boardWidth :CGFloat = 5.0
            let _dWidth     :CGFloat = (self.view.bounds.width - _boardWidth * 5.0)  / 4.0
            let _dHeight    :CGFloat = (self.view.bounds.height - _boardWidth * 6.0) / 5.0
            let _dX         :CGFloat = _boardWidth + CGFloat(_index % 4) * (_dWidth + _boardWidth)
            let _dY         :CGFloat = 50.0 + CGFloat(_index / 4) * (_dHeight + _boardWidth)
            _photoView.frame = CGRect(x:_dX,y:_dY , width:_dWidth, height:_dHeight)

            self.view.addSubview(_photoView)
            mPhotoViews.append(_photoView)
            _photoView.addEventListener(PhotoView.TOUCH_UP_INSIDE, onPhotoViewTouchHandler)
        }
    }
```

```swift
    private func onPhotoViewTouchHandler(aEvent:Event){
        print("\(aEvent.type),target:\(aEvent.target),currentTarget:\(aEvent.currentTarget)")
        if let _photoView:PhotoView = aEvent.target as? PhotoView {
            _photoView.setHighlight(aIsHighlight:true)
        }
    }
```

在觀察者模式下，都要記得deinit時要移除觀察者，也就是事件流下的偵聽者：

```swift
    deinit {
        NotificationCenter.default.removeObserver(self)

        for _view:PhotoView in mPhotoViews {
            _view.removeEventListener(PhotoView.TOUCH_UP_INSIDE)
        }
    }
```

此時可以發現點擊之後，所選的 `PhotoView` 實體物件都會被設為高光背景了。

事件還有一個強大的地方，稱為冒泡。冒泡是針對於視覺顯示物件才有的一個機制，視覺物件往往會被一層一層的顯示容器包著，以現在的 `MainViewController` 來說，我們執行時看到的藍色底的 `PhotoView` ，是被 `MainViewController` 的 `View` 包著的，我們要顯示 `PhotoView` 都需要執行這一行程式碼才可以 `self.view.addSubview(_photoView)` 。

每一個 `PhotoView` 都會廣播 `PhotoView.TOUCH_UP_INSIDE` 這個名稱的事件，而 `MainViewController` 的 `View` 「包住」了這些 `PhotoView` ，而廣報的事件會冒泡的話，就是包著 `PhotoView` 的外面一層的顯示容器，也可以接收到這個事件，就像泡泡在水裡冒出來一樣。

我們在將程式碼改寫成這樣：

```swift
    private func createDemoLayoutSecond() {

        NotificationCenter.default.addObserver(self, selector:#selector(self.onFlickrDataCompleteHandler(aNotification:)), name: NSNotification.Name(rawValue:FlickrModel.FLICKR_DATA_COMPLETE), object: nil)

        mFlickrModel.loadFlickrData(aPageIndex:1)

        for _index:UInt in 0..<10 {
            let _photoView  :PhotoView = PhotoView()
            let _boardWidth :CGFloat = 5.0
            let _dWidth     :CGFloat = (self.view.bounds.width - _boardWidth * 5.0)  / 4.0
            let _dHeight    :CGFloat = (self.view.bounds.height - _boardWidth * 6.0) / 5.0
            let _dX         :CGFloat = _boardWidth + CGFloat(_index % 4) * (_dWidth + _boardWidth)
            let _dY         :CGFloat = 50.0 + CGFloat(_index / 4) * (_dHeight + _boardWidth)
            _photoView.frame = CGRect(x:_dX, y:_dY , width:_dWidth, height:_dHeight)

            self.view.addSubview(_photoView)
            mPhotoViews.append(_photoView)
            //_photoView.addEventListener(PhotoView.TOUCH_UP_INSIDE, onPhotoViewTouchHandler)
        }
        self.view.addEventListener(PhotoView.TOUCH_UP_INSIDE, onPhotoViewTouchHandler)
    }
```

```swift
    deinit {
        NotificationCenter.default.removeObserver(self)

//        for _view:PhotoView in mPhotoViews {
//            _view.removeEventListener(PhotoView.TOUCH_UP_INSIDE)
//        }
        self.view.removeEventListener(PhotoView.TOUCH_UP_INSIDE)
    }
```

我們可以只要對 `MainViewController` 的 `View` 的顯示容器偵聽他裡面包含的全部的顯示物件是否有廣播`PhotoView.TOUCH_UP_INSIDE`事件。

實際上操作看看，這一次每次點擊後， Console 所列印出來的 `Event.target`以及 `Event.currentTarget` 就都不同了。

* Event.currentTarget：被偵聽的實體
* Event.target：廣播該事件的實體

完成到這一步的Demo：

* 查看原始碼
* [下載ZIP](https://github.com/wildenchen/swift-bethel-of-the-road/tree/eed3c8ff6c1141681b3d3b2c69fac406cd11c24c/DesignPatterns/workspaces/FlickrPhotos-Events.zip)

