# 最後的潤色

使用 MVP 最大的好處，不只是單純的各類別耦合性降低，耦合性降低有其他設計魔獸都可以應用，最大的好處是在於易於維護與修改，以及擴充功能。

而筆者尤其推薦 MVP 設計模式，是 MVP 設計模式甚至可以幫助我們在開發階段時的構思。

我們在之前的練習中，已經寫了不少功能，而且都用各類不同的設計模式封裝好了，而在封裝的基礎上，也應該發現目前的 MainViewController 是有點雜亂的。

所以我們把動態排版的邏輯，再用一個`PhotosView`類別封裝起來。

```swift
import UIKit

class PhotosView: UIScrollView {

    private var mPhotoViews :[PhotoView]    = [PhotoView]()
    private var mTotals     :Int            = 0
    private let mBoardWidth :CGFloat        = 5.0
    private var mNumX       :Int            = 4

    var photoViews:[PhotoView] {
        return mPhotoViews
    }

    init(aNumX:UInt,aTotals:UInt) {
        mTotals = aTotals
        mNumX = aNumX
        for _ in 0..<mTotals {
            let _photoView:PhotoView = PhotoView()
            mPhotoViews.append(_photoView)
        }
        super.init(frame: CGRect.zero)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func draw(_ rect: CGRect) {
        // Drawing code
        self.contentSize.width = rect.width
        createLayout()
        self.contentSize.height = mPhotoViews.last!.frame.origin.y + mPhotoViews.last!.frame.height + mBoardWidth
    }

    private func getPhotoViewWidthAndHeight() -> CGSize{
        let _dWidth:CGFloat = (self.contentSize.width - mBoardWidth * CGFloat(mNumX + 1))  / CGFloat(mNumX)
        let _dHeight:CGFloat = _dWidth * 3.0 / 4.0
        return CGSize(width: _dWidth, height: _dHeight)
    }

    private func createLayout() {
        let _photoSize:CGSize = self.getPhotoViewWidthAndHeight()
        for _index:UInt in 0..<mTotals {
            let _photoView:PhotoView = mPhotoViews[Int(_index)]
            let _dX:CGFloat = mBoardWidth + CGFloat(_index % mNumX) * (_photoSize.width + mBoardWidth)
            let _dY:CGFloat = mBoardWidth + CGFloat(_index / mNumX) * (_photoSize.height + mBoardWidth)
            _photoView.frame = CGRect(x: _dX,y: _dY , width: _photoSize.width, height: _photoSize.height)
            self.addSubview(_photoView)
        }
    }
}
```

然後，我們再建立一個新的 `UIViewController`，取名為 `FlickrBroswerViewController.swift` ，並把 `AppleDelegate.swift` 裡的 `mWindow.rootViewController` 改為`FlickrBroswerViewController` 。

```swift
    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {

        mWindow.rootViewController = FlickrBroswerViewController()
        mWindow.makeKeyAndVisible()

        return true
    }
```

然後，再回到 `FlickrViewController` 我們開始建立由 MVP 模式下建構的程式。

```swift
import UIKit

class FlickrBroswerViewController: UIViewController {

    private var mFlickrModel        :FlickrModel
    private var mController         :Controller
    private var mPhotoViewsContainer:PhotosView?
    private var mInfoView           :InfoBarView?

    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        mFlickrModel    = FlickrModel()
        mController     = Controller(aModel: mFlickrModel)

        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)

        mPhotoViewsContainer    = PhotosView(aNumX: 3, aTotals: mFlickrModel.perPage)
        mInfoView               = InfoBarView()
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.white

        let _infoBarHeight:CGFloat = 40.0
        mPhotoViewsContainer!.frame = CGRect(x:0.0, y:0.0,width: self.view.bounds.width, height:self.view.bounds.height - _infoBarHeight)
        self.view.addSubview(mPhotoViewsContainer!)
        mPhotoViewsContainer!.backgroundColor = UIColor.red

        mInfoView!.frame = CGRect(x:0.0, y:self.view.bounds.height - 40.0, width:self.view.bounds.width, height:40.0)
        self.view.addSubview(mInfoView!)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
```

現在的專案的視覺架構已經跟之前不同了，我們也不能直接把 `PhotoPresenter` 直接用在現在的 `PhotosView` 中，而且我們還想要同時處理 `InfoBarView` 的文字顯示，那該怎麼做呢？

我們在建立一個新的檔案 `PhotosPresenter` ，但是別忘記繼承 `Presenter` ，然後我們在 Presenter 這裡面，只要好好撰寫互動的呈現部分即可：

```swift
import Foundation
import LionEvents

class PhotosPresenter: Presenter {
    init(aContainer: PhotosView) {
        super.init(aView: aContainer)
    }

    override func onFlickrDataCompleteHandler(aEvent: Event) {
        let _dataPageIndex:UInt = aEvent.information as! UInt

        if _dataPageIndex == self.model?.currentPageIndex {
            let _photoVOs:[PhotoVO] = self.model!.getCurrentPhotos()

            if let _photosView:PhotosView = self.view as? PhotosView {
                for _photoView:PhotoView in _photosView.photoViews {
                    let _index:Int = _photosView.photoViews.index(of:_photoView)!
                    if _index < _photoVOs.count {
                        if let _image:UIImage = ImageCache.sharedInstance().getImage(aFilename:_photoVOs[_index].id! + ".jpg"){
                            _photoView.setImage(aImage:_image)
                        }else{
                            let _imageURL:String = _photoVOs[_index].url
                            _photoView.downloadImage(aImageURL:_imageURL,aCacheFileName: ".jpg")
                        }
                    }else{
                        _photoView.downloadImage(aImageURL:nil,aCacheFileName: nil)
                    }
                }
            }
        }
    }

    override func onThemeStyleChangeHandler(aEvent: Event) {
        if let _photosView:PhotosView = self.view as? PhotosView{
            for _photoView:PhotoView in _photosView.photoViews {
                _photoView.setHighlight(aIsHighlight:self.model!.isNight)
            }
        }
        /*if self.model!.isNight {
            self.view.backgroundColor = UIColor.black
        }else{
            self.view.backgroundColor = UIColor.white
        }*/
    }
}
```

先修改了 init 的建構式，要特別讓其他類別都無法塞進來，因為我們在 `override func onFlickrDataCompleteHandler` 這裡面所寫的動態排版邏輯，只適用於 PhotosView 而已。

其他會用到的事件，就是onThemeStyleChangeHandler而已。

下一步，`InforBarView` 也要依據事件也改變內容該怎麼處理呢？ 跟 `PhotosPresenter` 一樣的方式處理。

```swift
import Foundation
import LionEvents

class InfoBarPresenter: Presenter {

    override func onThemeStyleChangeHandler(aEvent: Event) {
        if let _infoBar:InfoBarView = self.view as? InfoBarView{
            _infoBar.setHighlight(aIsHighlight:self.model!.isNight)
        }
    }

    override func onPageIndexChangeHandler(aEvent: Event) {
        if let _infoBar:InfoBarView = self.view as? InfoBarView{
            _infoBar.setText(aText:"Page Index:\(self.model!.currentPageIndex)")
        }
    }

    override func onPhotoSelectChangeHandler(aEvent: Event) {

    }
}
```

我們再回到 FlickrBroswerViewController，再把剛剛建立好的 `PhotosPresenter` 和 `InfoBarPresenter` 加進去，除此以外再加上 `Controller` ，讓 `PhotosView` 也能當控制器。

```swift
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.white

        let _infoBarHeight:CGFloat = 40.0
        mPhotoViewsContainer!.frame = CGRect(x:0.0, y:0.0, width:self.view.bounds.width, height:self.view.bounds.height - _infoBarHeight)
        self.view.addSubview(mPhotoViewsContainer!)
        mPhotoViewsContainer!.backgroundColor = UIColor.red

        mInfoView!.frame = CGRect(x:0.0, y:self.view.bounds.height - 40.0, width:self.view.bounds.width, height:40.0)
        self.view.addSubview(mInfoView!)

        let _photoPresenter:PhotosPresenter = PhotosPresenter(aContainer: mPhotoViewsContainer!)
        _photoPresenter.model = mFlickrModel

        let _infoPresenter:InfoBarPresenter = InfoBarPresenter(aView: mInfoView!)
        _infoPresenter.model = mFlickrModel

        mController.addStyleChangeController(aView:mPhotoViewsContainer!)

        mFlickrModel.loadFlickrData(aPageIndex:1)
        mFlickrModel.isNight = false

    }
```

執行看看，現在已經有佈景主題切換的功能了！

下一步，我們要翻頁的功能！而且是在`infoBarView`上滑動就可以翻頁，我們該在哪邊追加功能呢？

照 MVP 的邏輯來看，翻頁的動作是`Controller`負責，`Controller`才會改變`Model`的數據資料。

```swift
// Controller.swift
    func addPageIndexChangeController(aView:UIView) {
        let _swipeLeftGesture:UISwipeGestureRecognizer = UISwipeGestureRecognizer(target: self, action: #selector(self.onPageSwipeHndler(aSender:)))
        _swipeLeftGesture.direction = UISwipeGestureRecognizerDirection.left
        aView.addGestureRecognizer(_swipeLeftGesture)

        let _swipeRightGesture:UISwipeGestureRecognizer = UISwipeGestureRecognizer(target: self, action: #selector(self.onPageSwipeHndler(aSender:)))
        _swipeRightGesture.direction = UISwipeGestureRecognizerDirection.right
        aView.addGestureRecognizer(_swipeRightGesture)
    }

    @objc private func onPageSwipeHndler(aSender:UISwipeGestureRecognizer) {
        if aSender.direction == UISwipeGestureRecognizerDirection.left {

            if let _:FlickrModel = self.model {
                self.model!.currentPageIndex = self.model!.currentPageIndex - 1
            }
        }else{
            if let _:FlickrModel = self.model {
                self.model!.currentPageIndex = self.model!.currentPageIndex + 1
            }
        }
        if let _:FlickrModel = self.model {
            if self.model!.currentPageIndex < 1 {
                self.model!.currentPageIndex = 1
            }
        }

        if let _:FlickrModel = self.model {
            if self.model!.currentPageIndex > 5 {
                self.model!.currentPageIndex = 5
            }
        }
        print("page index:\(self.model?.currentPageIndex)")
    }
```

然後再到`FlickrBroswerViewController`找到`mController.addStyleChangeController`再追加下面程式：

```swift
mController.addPageIndexChangeController(aView:mInfoView!)
```

在編譯到模擬器或實體機器看看效果。

到這階段，可以在玩看看如果 Controller 的這兩行，丟入的 UIView 的實體不同，會有怎樣的效果？

受歡迎的 500 張照片瀏覽已經完成了，我們想要再追加功能時要怎麼做呢？

我們再追加一個大圖顯示的功能吧！

在新建一個類別，不過這類別我們不是繼承 UIView ，而是直接繼承 PhotoView 即可，因為大圖顯示的功能，原本的 PhotoView 就已經有了。

所以我們先修改`PhotoView`這類別，追加一個屬性：

```swift
    var imageView:UIImageView{
        return mImageView
    }
```

然後我們再完成`LargePhotoView`這個類別。

```swift
class LargePhotoView: PhotoView {
    static let CLOSE:String = "close"

    private var mInfoBarView    :InfoBarView    = InfoBarView()
    private var mCloseButton    :UIButton       = UIButton()
    private var mDownLoadButton :UIButton       = UIButton()
    private var mBackgroundView :UIView         = UIView()

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.backgroundColor = UIColor.clear
        mBackgroundView.backgroundColor = UIColor.black
        mBackgroundView.alpha = 0.7

        mInfoBarView.infoLabel.numberOfLines = 2

        self.addSubview(mBackgroundView)
        self.addSubview(self.imageView)
        self.addSubview(mInfoBarView)
        self.addSubview(mCloseButton)
        self.addSubview(mDownLoadButton)

        mDownLoadButton.setTitle("Download", for: UIControlState.normal)
        mCloseButton.setTitle("Close", for: UIControlState.normal)

        mDownLoadButton.layer.cornerRadius = 3.0
        mCloseButton.layer.cornerRadius = 3.0

        mDownLoadButton.backgroundColor = UIColor.goldColor()
        mCloseButton.backgroundColor = UIColor.goldColor()

        mDownLoadButton.addTarget(self, action: #selector(self.onDownLoadHandler(aSender:)), for: UIControlEvents.touchUpInside)
        mCloseButton.addTarget(self, action: #selector(self.onCloshHandler(aSender:)), for: UIControlEvents.touchUpInside)
    }

    @objc private func onCloshHandler(aSender:UIButton){
        //self.removeFromSuperview()
        let _event:Event = Event(aType: LargePhotoView.CLOSE)
        self.dispatchEvent(_event)        
    }

    @objc private func onDownLoadHandler(aSender:UIButton){
        if let _image:UIImage = self.imgeView.image {
            UIImageWriteToSavedPhotosAlbum(_image, self, #selector(self.onSaveImageCompleteHandler(aImage:_:_:)), nil)
        }else{
            print("no image can save!")
        }
    }

    func onSaveImageCompleteHandler(aImage: UIImage, _ aError: NSError?,_ aContextInfo:UnsafeRawPointer) {
        if aError == nil {
            print("儲存內容到相簿成功！")
        } else {
            print("儲存內容到相簿失敗！")
        }
    }

    deinit{
        mDownLoadButton.removeTarget(self, action: #selector(self.onDownLoadHandler(aSender:)), for: UIControlEvents.touchUpInside)
        mCloseButton.removeTarget(self, action: #selector(self.onCloshHandler(aSender:)), for: UIControlEvents.touchUpInside)
    }

    func setPhotoVO(aVO:PhotoVO){
        mInfoBarView.setText(aText:"Title:\(aVO.title) Owner:\(aVO.owner)")
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        let _touch:UITouch = touches.first!
        let _touchendPoint:CGPoint = _touch.location(in: self)
        if _touchendPoint.x > 0 && _touchendPoint.x < self.bounds.width && _touchendPoint.y > 0 && _touchendPoint.y < self.bounds.height {
            let _event:Event = Event(aType:PhotoView.TOUCH_UP_INSIDE, aBubbles: true)
            _event.information = _touchendPoint
            dispatchEvent(_event)
        }
    }

    override func draw(_ rect: CGRect) {
        // Drawing code
        super.draw(rect)
        mBackgroundView.frame = rect
        mInfoBarView.frame = CGRect(x:0.0, y:rect.height - 90.0,width: rect.width, height:90.0)
        mDownLoadButton.frame = CGRect(x:rect.width / 2.0 + 3.0, y:rect.height - 113.0, width:rect.width / 2.0 - 3.0, height:20.0)
        mCloseButton.frame = CGRect(x:0.0, y:rect.height - 113.0, width:rect.width / 2.0 - 3.0, height:20.0)
    }
}
```

版型的設計我這邊就不多加詳述，說明一下這個類別的功能

* 有 PhotoView 的功能，可以下載圖片也可以直接把 UIImage 丟進來。
* 追加了兩個文字功能，分別顯示照片標題與擁有者名稱。
* 追加了 CLOSE 的事件。
* 追加了照片儲存到相簿的功能按鈕。

現在，我們要實踐 `PhotoView` 點選後，然後跳出 `LargePhotoView` 要怎麼做呢？各功能的程式碼應該要寫在什麼地方？

好好思考一下！

第一步， LargePhotoView 要呈現大圖、擁有者、照片標題等較多的詳細資訊，甚至日後可能會再追加或是修改要呈現的資料，所以一定要能夠知道目前被點選的 `PhotoVO` 為何。

所以我們先在`FlickrModel`追加一個屬性

```swift
    private var mCurrentPhotoVO     :PhotoVO?
    var currentPhotoVO:PhotoVO? {
        set(value) {
            mCurrentPhotoVO = value
            let _event:Event = Event(aType: FlickrModel.PHOTO_SELECT_CHANGE)
            self.dispatchEvent(_event)
        }
        get {
            return mCurrentPhotoVO
        }
    }
```

只要`currentPhotoVO`值被改變，就廣播`FlickrModel.PHOTO_SELECT_CHANGE`事件。

我們再完成 Controller 的部分：

```swift
    func addPhotoViewSelectController(aPhotosContainer:PhotosView){
        aPhotosContainer.addEventListener(PhotoView.TOUCH_UP_INSIDE, onPhotoViewTouchHandler)
    }

    private func onPhotoViewTouchHandler(aEvent: Event){
        let _photosView:PhotosView = aEvent.currentTarget as! PhotosView
        if let _photoView:PhotoView = aEvent.target as? PhotoView {
            let _index:Int = _photosView.photoViews.index(of:_photoView)!
            let _vo:PhotoVO = self.model!.getCurrentPhotos()[_index]
            self.model!.currentPhotoVO = _vo
        }
    }
```

只要`PhotosView`一接受到`PhotoView.TOUCH_UP_INSIDE`的事件，就找到對應的`PhotoVO`並且寫進`FlickrModel`。

當然，我們可以再追加`LargePhotoView`被關閉的互動控制：

```swift
    func addLargePhotoViewController(aLargePhotoView:LargePhotoView){
        aLargePhotoView.addEventListener(LargePhotoView.CLOSE,onLargePhotoCloseHandler)
    }

    private func onLargePhotoCloseHandler(aEvent: Event) -> Void {
        //self.model?.currentPhotoVO = nil
    }
```

只要 `LargePhotoView` 廣播 `LargePhotoView.CLOSE` 事件，就把 `self.model?.currentPhotoVO` 清空

這樣就只剩下 `LargePhotoView` 的呈現動作，也就是 `LargePhotoPresenter` 。

```swift
import UIKit
import LionEvents

class LargePhotoPresenter: Presenter {
    private let mLargePhotoView:LargePhotoView
    init(aContainerView:UIView, aLargePhotoView: LargePhotoView){
        mLargePhotoView = aLargePhotoView
        super.init(aView: aContainerView)
    }

    override func onPhotoSelectChangeHandler(aEvent: Event) {
        if let _vo:PhotoVO = self.model?.currentPhotoVO {
            mLargePhotoView.setPhotoVO(aVO: _vo)
            mLargePhotoView.alpha = 0.0

            if let _image:UIImage = ImageCache.sharedInstance().getImage(aFilename: _vo.id! + ".jpg"){
                mLargePhotoView.setImage(aImage: _image)
            }else{
                let _imageURL:String = _vo.url
                mLargePhotoView.downloadImage(aImageURL: _imageURL,aCacheFileName: ".jpg")
            }

            self.view.addSubview(mLargePhotoView)
            UIView.animate(withDuration: 0.3, animations: { () -> Void in
                self.mLargePhotoView.alpha = 1.0
            })

        }else{
            UIView.animate(withDuration: 0.3, animations: { () -> Void in
                self.mLargePhotoView.alpha = 0.0
                }, completion: { (aFinished:Bool) -> Void in
                    self.mLargePhotoView.removeFromSuperview()
            })
        }
    }
}
```

我們再回到 FlickrBroswerViewController 呼叫我們剛剛寫的 MVP 吧！

```swift
class FlickrBroswerViewController: UIViewController {

    private var mFlickrModel        :FlickrModel
    private var mController         :Controller
    private var mPhotoViewsContainer:PhotosView?
    private var mInfoView           :InfoBarView?
    private var mLargePhotoView     :LargePhotoView?

    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: NSBundle?) {
        mFlickrModel    = FlickrModel()
        mController     = Controller(aModel: mFlickrModel)

        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)

        mPhotoViewsContainer    = PhotosView(aNumX: 3, aTotals: mFlickrModel.perPage)
        mInfoView               = InfoBarView()
        mLargePhotoView         = LargePhotoView(frame: UIScreen.main.bounds)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.white

        let _infoBarHeight:CGFloat = 40.0
        mPhotoViewsContainer!.frame = CGRect(x:0.0, y:0.0, width:self.view.bounds.width, height:self.view.bounds.height - _infoBarHeight)
        self.view.addSubview(mPhotoViewsContainer!)
        mPhotoViewsContainer!.backgroundColor = UIColor.red

        mInfoView!.frame = CGRect(x:0.0, y:self.view.bounds.height - 40.0, width:self.view.bounds.width, height:40.0)
        self.view.addSubview(mInfoView!)

        let _photoPresenter:PhotosPresenter = PhotosPresenter(aContainer: mPhotoViewsContainer!)
        _photoPresenter.model = mFlickrModel

        let _infoPresenter:InfoBarPresenter = InfoBarPresenter(aView: mInfoView!)
        _infoPresenter.model = mFlickrModel

        let _largePhotoPresenter:LargePhotoPresenter = LargePhotoPresenter(aContainerView: self.view, aLargePhotoView: mLargePhotoView!)
        _largePhotoPresenter.model = mFlickrModel

        mController.addStyleChangeController(aView:mInfoView!)
        mController.addPageIndexChangeController(aView:mPhotoViewsContainer!)     
        mController.addPhotoViewSelectController(aView:mPhotoViewsContainer!)
        mController.addLargePhotoViewController(aLargePhotoView:mLargePhotoView!)

        mFlickrModel.loadFlickrData(aPageIndex:1)
        mFlickrModel.isNight = false
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
```

在 MVP 模式之下，任何功能都可以被拆解成 Model 、 View 、 Presenter 、Controller ，而且如果有需要任何修改，就是一直追加功能，而舊有的功能可以移除，也可以放著不管。

在回顧一下我們完成這功能的時候，其實在實踐 MVP 模式時，新功能的追加甚至沒有想清楚功能整體的邏輯，只是考慮到會用到什麼功能就放在哪裡而已。

越複雜的互動邏輯，越適合 MVP 來幫助思考。

最後我們看一下最終成果吧：

完成到這一步的Demo：

* 查看原始碼
* [下載ZIP](https://github.com/wildenchen/swift-bethel-of-the-road/tree/eed3c8ff6c1141681b3d3b2c69fac406cd11c24c/DesignPatterns/workspaces/FlickrPhotos-Final.zip)

