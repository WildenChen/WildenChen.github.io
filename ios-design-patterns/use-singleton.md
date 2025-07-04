# 如何使用單例模式

可以看下這個圖：

![](../.gitbook/assets/singleton1.png)

這是一個日誌類，有一個屬性 \(是一個單例對象\) 和兩個方法 \(`sharedInstance()` 和 `init()`\)。

第一次調用 `sharedInstance()` 的時候， `instance` 屬性還沒有初始化。所以我們要創建一個新實例並且返回。

下一次你再調用 `sharedInstance()` 的時候，`instance` 已經初始化完成，直接返回即可。這個邏輯確保了這個類別只存在一個實體對象。

依據這個邏輯，我們也可以寫一個單例模式，通過這個類別來管理圖片數據資料。

我們可以新建一個檔案 `ImageCache.swift` ，並添加下面這些程式碼。

```swift
class ImageCache {
    private static var mInstance:ImageCache?
    static func sharedInstance() -> ImageCache {
        if mInstance == nil {
            mInstance = ImageCache() 
        }
        return mInstance!
    }
}
```

先建立一個名為 `ImageCache` 的類別，再宣告一個名稱為 `mInstance` 的靜態變數，並且型別為 `ImageCache` 自己本身，為可選值，而且雖然是靜態變數，可是存取權限要設定為 `private` 私有的，除了自己以外，其他類別成員都不能夠去操作存取這個靜態變數。

單例設計模式的奧妙，就在於下一步要做的，我們再宣告一個靜態方法 `sharedInstance()` ，回傳值型別也是 `ImageCache` ，並且我們要在裡面加入單例設計模式的主要邏輯。

如果其他類別成員要透過 `sharedInstance()` 這個方法取得`ImageCache`的實體時，就會開始判斷 `mInstance` 是否為空值：

* 如果不是空值，就直接回傳 `mInstance` 。
* 如果是空值，就初始化一個實體。

單一設計模式下，封裝了兩個邏輯，一個是私有的靜態變數，一個是公開的靜態方法。

私有的靜態變數 `mInstance` ，通過 `static` 定義意味著這個屬性只存在一個。公開的靜態方法 `sharedInstance` ，直到需要的時候才會被初始化。

同時再注意一下，因為它是一個唯讀的常數，所以一旦建立之後，不會也不能夠再建立第二次，也不能夠被別的值所取代。

這些就是單例模式的核心所在：一旦初始化完成，當前類別存在一個實例物件，初始化方法就不會再被調用。

最後，我們再複寫掉初始化方法，把建構式私有化，讓他不能被其他類別成員用除了靜態方法 `sharedInstance` 以外的方式實體化，以確保單例模式的唯一性。

我們現在可以將這個單例作為圖片資料快取儲存，接下來我們繼續完成他全部的功能。

```swift
import Foundation
import UIKit

class ImageCache {
    private static var mInstance:ImageCache?
    static func sharedInstance() -> ImageCache {
        if mInstance == nil {
            mInstance = ImageCache()

        }
        return mInstance!
    }
    private init() {

    }

    private var mImages:[String:UIImage] = [String:UIImage]()

    func saveImage(aImage:UIImage,aFilename: String) {
        mImages.updateValue(aImage, forKey: aFilename)
        saveLocalImage(aImage:aImage,aFilename: aFilename)
    }

    func getImage(aFilename: String) -> UIImage? {
        var _result:UIImage?
        if let _dicImage:UIImage = mImages[aFilename] {
            _result = _dicImage
        }else if let _docImage:UIImage = getLocalImage(aFilename:aFilename){
            _result = _docImage
        }
        return _result
    }

    private func saveLocalImage(aImage: UIImage, aFilename: String) {
        let _path = NSHomeDirectory().appending("/Documents/\(aFilename)")
        let _data:Data? = UIImagePNGRepresentation(aImage)
         do {
            try _data?.write(to: URL(string:_path)!, options: .atomic)
        } catch {
            print(error)
        }
    }

    private func getLocalImage(aFilename: String) -> UIImage? {
        let _path = NSHomeDirectory().appending("/Documents/\(aFilename)")
        do {
            let _data = try NSData(contentsOfFile: _path, options: .uncachedRead)
            return UIImage(data: _data as Data)
        } catch _ {
            return nil
        }
    }
}
```

在這裡我們定義了一個私有屬性，用來存儲照片資料。這是一個字典變數，所以值為字串，在單例模式下，ImageCache 類別只會存在一份實體，同樣的在這類別裡面的`mImages:[String:UIImage]` 字典裡面，也只會存在一個實體。

我們會把圖片儲存到手機本機端，這樣可以避免一次又一次下載相同的照片。

程式內容很簡單直接，下載的照片會儲存在 Documents 目錄下，如果沒有檢查到暫存檔案， getImage\(\) 方法則會返回 nil 。

我們開始運用看看： 打開`PhotoView.swift`這個類別，

```swift
    func downloadImage(aImageURL:String?,aCacheFileName:String?) {
        mImageView.image = nil
        if aImageURL != nil {
            mLoadingView.startAnimating()
            Alamofire.request("\(aImageURL!)\(aCacheFileName!)").response(completionHandler: { (aDefaultDataResponse:DefaultDataResponse) in
                if aDefaultDataResponse.error == nil {
                    if let _image:UIImage = UIImage(data:aDefaultDataResponse.data!) {
                        self.mImageView.image = _image
                        ImageCache.sharedInstance().saveImage(aImage: _image, aFilename: aCacheFileName!)

                    }else{
                        print("no image")
                    }
                }else{
                    print("error:\(aDefaultDataResponse.error)")
                }
            })
        }
    }
```

下載完圖片以後，直接儲存到圖片快取裡面。

我們使用外觀模式隱藏了下載圖片的複雜程度。通知的發送者並不在乎圖片是如何從網上下載到本地的。

我們先開始做最開始的版型排版：

先打開 `MainViewController.swift` ，開始編輯裡面的 `viewDidLoad` ，並且加ㄧ個變數用來儲存會顯示的全部的 `PhotoView` ，在宣告一個變數用來建立 FlickrModel 的實體。

```swift
    private var mPhotoViews :[PhotoView] = [PhotoView]()
    private let mFlickrModel:FlickrModel = FlickrModel()
```

然後，我們在寫上測試到目前功能的程式碼：

```swift
    private func createDemoLayout() {
        mFlickrModel.loadFlickrData(aPageIndex: 1)

        for _index:UInt in 0..<10 {
            let _photoView  :PhotoView = PhotoView()
            let _boardWidth :CGFloat = 5.0
            let _dWidth     :CGFloat = (self.view.bounds.width - _boardWidth * 5.0)  / 4.0
            let _dHeight    :CGFloat = (self.view.bounds.height - _boardWidth * 6.0) / 5.0
            let _dX         :CGFloat = _boardWidth + CGFloat(_index % 4) * (_dWidth + _boardWidth)
            let _dY         :CGFloat = 50.0 + CGFloat(_index / 4) * (_dHeight + _boardWidth)
            _photoView.frame = CGRect(x: _dX, y: _dY, width: _dWidth, height: _dHeight)

            self.view.addSubview(_photoView)
            mPhotoViews.append(_photoView)
        }

        let _button:UIButton = UIButton()
        _button.frame = CGRect(x: 10.0, y: self.view.bounds.height - 30.0, width: self.view.bounds.width - 20.0, height: 25.0)
        _button.backgroundColor = UIColor.red
        self.view.addSubview(_button)

        _button.addTarget(self, action: #selector(self.onTestLoadImageHandler), for: UIControlEvents.touchUpInside)
    }

    func onTestLoadImageHandler(){
        for _photoView:PhotoView in mPhotoViews {
            let _index:Int = mPhotoViews.index(of: _photoView)!
            let _vo:PhotoVO = mFlickrModel.getPhotos(aPageIndex: 1)[_index]
            _photoView.downloadImage(aImageURL: _vo.url, aCacheFileName: ".jpg")
        }
    }
```

然後，我們在 viewDidload 執行我們剛剛所寫的程式碼：

```swift
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.white

        createDemoLayout()
    }
```

而原本測試的 `PhotoDelegate`就先刪除吧，避免程式碼的雜亂。

在模擬器中執行，會發現一開始會出現 10 個整齊排列的藍色框框，這些都是我們寫的 PhotoView ，如果網路正常的情況下，會在 Xcode 裡的 Console 視窗出現 `LoadFlickrDataComplete!count:99` ，表示 Flickr 的資料載入完成，然後我們再按下最下面的紅色按鈕，載入圖片。

![](../.gitbook/assets/singleton2.png)

完成到這一步的Demo：

* 查看原始碼
* [下載ZIP](https://github.com/wildenchen/swift-bethel-of-the-road/tree/eed3c8ff6c1141681b3d3b2c69fac406cd11c24c/DesignPatterns/workspaces/FlickrPhotos-Singleton.zip)

