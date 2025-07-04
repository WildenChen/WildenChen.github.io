# 如何使用 MVP 模式

MVP 模式中，最重要的是 Model，由於 MVP 中，會廣泛的用到觀察者模式來完成彼此間的溝通，為了簡化程式碼，我們透過 LionEvents 中的 EventDispatcher 來實踐。

> 不管是透過 `Notification` 或是 `KVO` 或是 `LionEvents`都可以。

打開 `FlickrModel` ，我們再讓他繼承 `EventDispatcher` 。

```swift
import LionEvents
class FlickrModel:EventDispatcher {
//...略
}
```

下一步，我們來好好思考我們需要這App有怎樣的互動：

1. 資料載入完成以後顯示圖片
2. 點選現在的照片以後可以看到大張圖片
3. 可以切換是否高亮的顏色佈景主題
4. 可以翻頁，翻頁後要換圖片

所以我們會需要 `FlickrModel` 能夠廣播/通知上述這四種不同的時機。

```swift
    static let FLICKR_DATA_COMPLETE :String = "flickrDataComplete"
    static let PHOTO_SELECT_CHANGE  :String = "photoSelectChange"
    static let THEME_STYLE_CHANGE   :String = "themeStyleChange"
    static let PAGE_INDEX_CHANGE    :String = "pageIndexChange"
```

我們先前在 `FlickrModel` 設計好的變數在這邊就會派上用場了， 在 OOP 的主要思想下，封裝與權限控制是基本，所以 FlickrModel 裡面我們原本設定了不少變數，但是都是私有的，只有在有必要時才會開啟。

所以我們在去想其他類別會去讀取的變數與資料有什麼？再分別依序開啟：

```swift
    var perPage:Int {
        return mPerPage
    }

    var currentPageIndex:Int {
        set(value) {
            mCurrentPageIndex = value
            let _event:Event = Event(aType: FlickrModel.PAGE_INDEX_CHANGE)
            dispatchEvent(_event)
            self.loadFlickrData(aPageIndex:mCurrentPageIndex)
        }
        get{
            return mCurrentPageIndex
        }
    }

    var isNight:Bool {
      set(value){
            mIsNight = value
            let _event:Event = Event(aType: FlickrModel.THEME_STYLE_CHANGE)
            dispatchEvent(_event)
      }
      get{
            return mIsNight
      }
   }
```

我們會透過 FlickrModel 來記錄儲存現在這隻 App 所要呈現的狀態，包含了

1. 每一頁要顯示幾張圖
2. 是否要換成夜晚的佈景主題
3. 目前顯示的是第幾頁

而在切換佈景主題以及被更改目前是第幾頁的時候，會再廣播相對應的事件`FlickrModel.PAGE_INDEX_CHANGE`、`FlickrModel.THEME_STYLE_CHANGE`。

而 FlickrModel 裡原本的 `FLICKR_DATA_COMPLETE` 通知，除了保留原有功能以外，我們再追加事件的廣播。

```swift
    private func postFlickrDataCompleteNotification(aPageIndex:Int) {
        let _userObject:[NSObject:AnyObject] = ["pageIndex" as NSObject:aPageIndex as AnyObject]
        NotificationCenter.default.post(name: NSNotification.Name(rawValue:FlickrModel.FLICKR_DATA_COMPLETE), object: self, userInfo: _userObject)

        let _event:Event = Event(aType: FlickrModel.FLICKR_DATA_COMPLETE)
        _event.information = aPageIndex
        self.dispatchEvent(_event)
    }
```

然後，我們再建立一個`Presenter`的分組，放一個 `Presenter`類別，MVP 模式下的 P ，指的是`Presenter`，他主要功能是用做視覺互動：

先建立一個 Presenter 的類別，而且不繼承任何類別，在宣告一個 weak 弱引用的 FlickrModel，在建構式時，就連同 view 的屬性一起設好，因為沒有 view，也沒有 `Presenter` 存在的必要了。

然後再對 model 設定 set 與 get，只要 model 被設定有值之後，就立刻註冊偵聽需要用到的四個事件，並且先寫好空的事件函數。

```swift
import Foundation
import UIKit
import LionEvents

class Presenter {
    private weak var mModel:FlickrModel?
    var model:FlickrModel? {
        set(value){
            mModel = value
            mModel?.addEventListener(FlickrModel.FLICKR_DATA_COMPLETE, onFlickrDataCompleteHandler)
            mModel?.addEventListener(FlickrModel.PHOTO_SELECT_CHANGE, onPhotoSelectChangeHandler)
            mModel?.addEventListener(FlickrModel.THEME_STYLE_CHANGE, onThemeStyleChangeHandler)
            mModel?.addEventListener(FlickrModel.PAGE_INDEX_CHANGE, onPageIndexChangeHandler)
        }
        get{
            return mModel
        }
    }

    var view:UIView

    init(aView:UIView) {
        self.view = aView
    }

    deinit{
        mModel?.removeEventListener(FlickrModel.FLICKR_DATA_COMPLETE)
        mModel?.removeEventListener(FlickrModel.PHOTO_SELECT_CHANGE)
        mModel?.removeEventListener(FlickrModel.THEME_STYLE_CHANGE)
        mModel?.removeEventListener(FlickrModel.PAGE_INDEX_CHANGE)
    }

    func onFlickrDataCompleteHandler(aEvent:Event){

    }

    func onPageIndexChangeHandler(aEvent:Event){

    }

    func onThemeStyleChangeHandler(aEvent:Event){

    }

    func onPhotoSelectChangeHandler (aEvent: Event) {

    }
}
```

上述四個事件函數，為了要讓其他繼承的類別可以複寫，所以權限記得至少要開到 internal 。

這樣，我們就可以針對於 PhotoView 專門寫一個 PhotoPresenter ，繼承 `Presenter` 類別，讓他完成功能事件內的事情：

```swift
import Foundation
import LionEvents

class PhotoPresenter: Presenter {

    override func onThemeStyleChangeHandler(aEvent: Event) {
        if let _photoView:PhotoView = self.view as? PhotoView{
            _photoView.setHighlight(aIsHighlight:self.model!.isNight)
        }
    }
}
```

然後我們再修改一下 `MainViewController.swift` 的 `viewDidLoad` 的部分，並建立一個新的函數以方便整理：

```swift
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.white

        //createDemoLayout()
        createDemoLayoutSecond()
        createMVPDemo()
    }

    private func createMVPDemo(){

        for _photoView:PhotoView in mPhotoViews {
            let _photoPresenter:PhotoPresenter = PhotoPresenter(aView:_photoView)
            _photoPresenter.model = mFlickrModel
        }
    }
```

追加一個 `createMVPDemo` 的函數，然後把 `PhotoPresenter` 都建立起來，不要忘記給 `PhotoPresenter` 設定指定的 model。

再修改一下原本的 `onPhotoViewTouchHandler` ：

```swift
    private func onPhotoViewTouchHandler(aEvent:Event) {
        print("\(aEvent.type),target:\(aEvent.target),currentTarget:\(aEvent.currentTarget)")
        if let _:PhotoView = aEvent.target as? PhotoView {
            //_photoView.setHighlight(true)
            mFlickrModel.isNight = !mFlickrModel.isNight
        }
    }
```

現在每次點擊，我們並不是直接去更改 PhotoView 是否要高光顯示，而是透過 `FlickrModel` 裡的 `isNight` 屬性的更改，讓 `PhotoPresenter` 知道所屬的 `PhotoView` 的需要被改變。

大家應該有發現到，原本的 `MainViewController.swift` 似乎變得十分雜亂。

其實 `cocoa` 的 MVC 模式，`UIViewController` 不只是單純的 `MVC` 下的 `Controller` 而已，還包含了 `Dynamic Layout` 的功能，尤其我們的畫面全部都是使用 `Hard Coding` 產生的時候，我們並沒有特別把 `MainViewController` 裡面會用到的 `View` 另外寫成一個類別，所以現在的 `MainViewController` 不只是只有單純的 Controller 功能，還包含了視覺排版 `Dynamic Layout` ，我們都寫進了這個的類別裡面了。

為了讓 MVP 這個功能獨立化，我們再建立一個專屬於這個應用程式所用的 `Controller`，我們新建一個 `Controller.swift` ，不過這個 `Controller` 我們要的是完全乾淨的只有 `Controller` 功能的，所以也不需要去繼承任何類別。

```swift
import Foundation
import LionEvents
import UIKit
class Controller {
    weak var model:FlickrModel?

    init(aModel:FlickrModel){
        model = aModel
    }
}
```

然後我們再幫 Controller 建立他的新功能：讓只要是繼承自 `UIView` 的類別，都可以當該功能的控制器：

```swift
    func addStyleChangeController(aView:UIView) {
        let _swipeGesture:UISwipeGestureRecognizer = UISwipeGestureRecognizer(target: self, action: #selector(self.onStyleSwipeHndler(aSender:)))
        _swipeGesture.direction = [ UISwipeGestureRecognizerDirection.left, UISwipeGestureRecognizerDirection.right]
        aView.addGestureRecognizer(_swipeGesture)
    }

    @objc private func onStyleSwipeHndler(aSender:UISwipeGestureRecognizer) {
        self.model!.isNight = !self.model!.isNight
    }
```

再回到 `MainViewController` 裡面，先再幫 Controller 設定一個全域變數：

```swift
private var mController:Controller?
```

再找到`createMVPDemo`並且追加下面程式：

```swift
    private func createMVPDemo() {

        for _photoView:PhotoView in mPhotoViews {
            let _photoPresenter:PhotoPresenter = PhotoPresenter(aView:_photoView)
            _photoPresenter.model = mFlickrModel
        }

        mController = Controller(aModel: mFlickrModel)
        mController!.addStyleChangeController(aView:self.view)
    }
```

在模擬器上執行測試，你們會發現左右滑動，也可以直接更改整個畫面的佈景風格了！

花盡了心思，把這個功能寫好了，目前只會覺得一個簡單的功能把它拆得很多類別，這樣到底有什麼好處呢？

下一個步驟，就是他最大的好處要展現了！！

完成到這一步的Demo：

* 查看原始碼
* [下載ZIP](https://github.com/wildenchen/swift-bethel-of-the-road/tree/eed3c8ff6c1141681b3d3b2c69fac406cd11c24c/DesignPatterns/workspaces/FlickrPhotos-MVP.zip)

