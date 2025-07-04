# 通知 - Notification

不要把這裡的通知和推送通知或者本地通知搞混了，這裡的通知是基於訂閱-發佈模型的，即一個物件 \(發佈者\) 向其他物件 \(訂閱者\) 發送消息。

> 發佈者永遠不需要知道訂閱者的任何數據。

Apple 對於通知的使用很頻繁，比如當鍵盤彈出或者收起的時候，系統會分別發送 `UIKeyboardWillShowNotification/UIKeyboardWillHideNotification` 的通知。當你的應用切到後台的時候，又會發送 `UIApplicationDidEnterBackgroundNotification` 的通知。

注意：打開 `UIApplication.swift` 檔案，在檔案結尾你會看到二十多種系統發送的通知。

## 如何使用通知

打開 `FlickrModel.swift` 然後先在類別宣告的下一行先加入一個靜態常數字串：

```swift
static let FLICKR_DATA_COMPLETE:String = "flickrDataComplete"
```

為了避免「通知事件名稱」的誤寫，所以預先定義一個靜態常數字串。

然後我們追加一個專門發送系統通知的程式：

```swift
    private func postFlickrDataCompleteNotification(aPageIndex:Int) {
        let _userObject:[NSObject:AnyObject] = ["pageIndex"as NSObject:aPageIndex as AnyObject]
        NotificationCenter.default.post(name: NSNotification.Name(rawValue: FlickrModel.FLICKR_DATA_COMPLETE), object: self, userInfo: _userObject)
    }
```

只要執行 `postFlickrDataCompleteNotification(aPageIndex:Int)` ，就會發送一個名稱為 `FlickrModel.FLICKR_DATA_COMPLETE` 的通知。

然後我們在每一次的 Flickr 資料載入完成後，就執行一次這支程式來透過 `NotificationCenter.default` 發送通知，也就是 `onLoadFlickrDataCompleteHandler` 裡面的最後一行。

```swift
    private func onLoadFlickrDataCompleteHandler(aDataResponse:DataResponse<Any>) {
        var _vos:[PhotoVO] = [PhotoVO]()
        var _pageIndex:Int = 0
        if aResult.error == nil {
            // 中間略
            print("LoadFlickrDataComplete!count:\(_vos.count)")
        }else{
            print("loadFlickrData Error:\(aResult.error)")
        }
        self.postFlickrDataCompleteNotification(aPageIndex:_pageIndex)
    }
```

而我們載入 Flickr 的圖片庫資料時，他給我們的每一頁照片資訊我們已經放到字典裡面，儲存在記憶體中，沒有必要每一次都要再更新資料，所以我們可以再把 `loadFlickrData(aPageIndex:Int)` 這支程式再做一下修改，判斷如果字典裡已經有資料的話，就不用再下載了，然後發送通知，如果沒有下載過，就下載資料。

```swift
    func loadFlickrData(aPageIndex:Int) {
        if let _:[PhotoVO] = mPhotoVOs[mPerPage] {
            postFlickrDataCompleteNotification(aPageIndex: aPageIndex)
        }else{
            Alamofire.request("\(FlickrAPI.flickrAPIUrl())", method: HTTPMethod.get, parameters: nil, encoding: JSONEncoding.default, headers: nil)
                .responseJSON(completionHandler: onLoadFlickrDataCompleteHandler)
        }
    }
```

然後再打開 `MainViewController.swift` ， 把之前註解的 `mPhotoViews` 反註解，並鍵入如下程式碼：

```swift
    private var mPhotoViews:[PhotoView] = [PhotoView]()
    private func createDemoLayoutSecond() {
        mFlickrModel.loadFlickrData(aPageIndex:1)

        for _index:UInt in 0..<10 {
            let _photoView  :PhotoView = PhotoView()
            let _boardWidth :CGFloat = 5.0
            let _dWidth     :CGFloat = (self.view.bounds.width - _boardWidth * 5.0)  / 4.0
            let _dHeight    :CGFloat = (self.view.bounds.height - _boardWidth * 6.0) / 5.0
            let _dX         :CGFloat = _boardWidth + CGFloat(_index % 4) * (_dWidth + _boardWidth)
            let _dY         :CGFloat = 50.0 + CGFloat(_index / 4) * (_dHeight + _boardWidth)
            _photoView.frame = CGRect(x:_dX,y:_dY ,width: _dWidth, height:_dHeight)

            self.view.addSubview(_photoView)
            mPhotoViews.append(_photoView)
        }
    }
```

之前我們是等 Console 顯示 `LoadFlickrDataComplete!count:50` 之後，確定載入完成，再「手動按下按鈕」，讓 PhotoView 去做圖片載入的動作，這一次我們透過觀察者模式來完成這些事情。

現在的 `PhotoModel` 已經會透過 `NotificationCenter.default` 發送 `FlickrModel.FLICKR_DATA_COMPLETE` 通知了，所以讓 `MainViewController` 當觀察者去觀察 `NotificationCenter.default` 這個單一設計模式的實體何時會 發送這樣的通知。

```swift
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.white

        //createDemoLayout()
        createDemoLayoutSecond()
    }

    private func createDemoLayoutSecond() {

       NotificationCenter.default.addObserver(self, selector: #selector(self.onFlickrDataCompleteHandler(aNotification:)), name: NSNotification.Name(rawValue:FlickrModel.FLICKR_DATA_COMPLETE), object: nil)

        mFlickrModel.loadFlickrData(aPageIndex:1)

        for _index:UInt in 0..<10 {
            let _photoView  :PhotoView = PhotoView()
            let _boardWidth :CGFloat = 5.0
            let _dWidth     :CGFloat = (self.view.bounds.width - _boardWidth * 5.0)  / 4.0
            let _dHeight    :CGFloat = (self.view.bounds.height - _boardWidth * 6.0) / 5.0
            let _dX         :CGFloat = _boardWidth + CGFloat(_index % 4) * (_dWidth + _boardWidth)
            let _dY         :CGFloat = 50.0 + CGFloat(_index / 4) * (_dHeight + _boardWidth)
            _photoView.frame = CGRect(x:_dX, y:_dY , width:_dWidth,height: _dHeight)

            self.view.addSubview(_photoView)
            mPhotoViews.append(_photoView)
        }
    }
```

每當 `FlickrModel` 發出一個 `FlickrModel.FLICKR_DATA_COMPLETE` 通知的時候，由於 `MainViewController` 已經註冊了成為觀察者，所以系統會調用 `onFlickrDataCompleteHandler` 方法。

但是，在實現 `onFlickrDataCompleteHandler` 之前，我們必須先在 `deinit` 取消監聽。如果沒有取消監聽消息，消息會發送給一個已經銷毀的物件，導致應用程式閃退。

在 `MainViewController.swift` 加上取消訂閱的程式碼：

```swift
deinit {
    NotificationCenter.default.removeObserver(self)
}
```

當物件銷毀的時候，把它從所有消息的訂閱列表裡去除。

然後再完成 `onFlickrDataCompleteHandler` ：

```swift
@objc private func onFlickrDataCompleteHandler(aNotification: NSNotification) {
        if let _pageIndex:Int = aNotification.userInfo!["pageIndex"] as? Int {
            let _vos:[PhotoVO] = mFlickrModel.getPhotos(aPageIndex: _pageIndex)
            for _index in 0..<mPhotoViews.count {
                mPhotoViews[_index].downloadImage(aImageURL: _vos[_index].url,aCacheFileName:".jpg")
            }
        }
    }
```

只要收到 `FlickrModel.FLICKR_DATA_COMPLETE` ，就會執行 `onFlickrDataCompleteHandler(aNotification: NSNotification)` ，把通知裡面包含的 `userInfo` 字典裡面的 `pageIndex` 取出，再從 `FlickrModel` 的實體撈取資料，再把圖片資料的網址分別給予畫面上的 `PhotoView` 。

我們來回顧一下目前所做的流程：

* `FlickrModel` 負責處理最開始要載入的全部圖片資料，包含圖片網址等。
* `FlickrModel` 裡面完成 Flickr 資料載入，但是我們不要別的類別再去操作。
* 資料載入完以後，再發送通知說 `FlickrModel.FLICKR_DATA_COMPLETE`
* `MainViewController` 當觀察者，負責觀察 `NotificationCenter`的實體 有沒有發送 `FlickrModel.FLICKR_DATA_COMPLETE` 這個通知。
* `MainViewController` 知道 `NotificationCenter` 發送了 `FlickrModel.FLICKR_DATA_COMPLETE` 這個通知後，開始載入圖片。

再回顧一下，我們使用外觀模式隱藏了下載圖片資料的複雜程度。通知的發送者 `NotificationCenter` 並不在乎圖片是如何從網上下載的。

現在運行一下專案，可以看到基本縮圖已經顯示出來了：

![](../.gitbook/assets/notifications1.png)

不過出了問題：這個用來提示加載網絡請求的小菊花怎麼一直在顯示！

我們在`PhotoView`建立實體後，然後開始載入圖片時，開啓了這個白色小菊花，但是在圖片下載完畢的時候我們並沒有停掉它。我們可以在每次下載成功的時候關閉它，但是我們不這樣做，這次我們來用用另一個觀察者模式： `KVO` 。

完成到這一步的Demo：

* 查看原始碼
* [下載ZIP](https://github.com/wildenchen/swift-bethel-of-the-road/tree/eed3c8ff6c1141681b3d3b2c69fac406cd11c24c/DesignPatterns/workspaces/FlickrPhotos-Notification.zip)

