---
title: "如何使用外觀模式"
---

# 如何使用外觀模式

我們可以新建一個檔案 `FlickrModel.swift` ，先不繼承任何類別，但是需要先載入以下的 Framework。

```swift
import Foundation
import Alamofire
import SwiftyJSON

class FlickrModel {

}
```

`Alamofire` 是一個用做網路溝通協定的一個第三方 Library，而 `SwiftyJSON` 則是用來解析 JSON 格式的一個 Library。

現在我們用 `FlickrModel` 來管理照片數據與處理 Flickr 圖床的網絡請求， `FlickrAPI` 有 FLickr 的 API 請求資訊，專案中的其他類別不應該也不需要知道這些邏輯。他們只需要知道 `FlickrModel` 這個「外觀」就可以了。

為了實現外觀模式，應該只讓 `FlickrModel` 持有 `PhotoVO` 的陣列實體資料，以及其他會需要紀錄與儲存的變數，然後 `FlickrModel` 暴露最少只需要給其他類別來使用的方法，這樣外部的訪問類別不需要知道內部的商業邏輯具體是怎樣的，也不用知道你是通過 `Alamofire` 還是 `FlickrAPI` 獲取到數據的。

`FlickrModel` 會暴露給其他類別訪問，但是其他全部的會用到的屬性則是不對外開放的。

打開 `FlickrModel.swift` 然後添加如下程式碼：

```swift
    private var mPhotoVOs           :[Int:[PhotoVO]]   = [Int:[PhotoVO]]()
    private var mCurrentPageIndex   :Int               = 1
    private let mPerPage            :Int               = 99
    private var mIsNight            :Bool              = false
```

`mPhotoVOs:[Int:[PhotoVO]]` 只是用來儲存這隻 App 裡面會用到的每一頁的 Flickr 圖片資料，`mCurrentPageIndex:Int` 則是用來紀錄 Flickr 的目前顯示與載入的資料是哪一頁， `mPerPage:Int` 則是表示目前一頁會有幾張照片的常數。

我們再多寫一個方法，用來儲存 PhotoVO 的字典資料。

```swift
    func addPhoto(aPageIndex:Int,aPhotoVOs: [PhotoVO]) {
        mPhotoVOs.updateValue(aPhotoVOs, forKey: aPageIndex)
    }
```

當然，也要開放權限讓其他類別可以讀取，所以我們再添加兩個讓外部讀取 VO 的方法。

```swift
    func getPhotos(aPageIndex:Int) -> [PhotoVO] {
        return mPhotoVOs[aPageIndex]!
    }

    func getCurrentPhotos() -> [PhotoVO] {
        return mPhotoVOs[mCurrentPageIndex]!
    }
```

我們需要在 `FlickrModel` 裡面將 `FlickrAPI` 的下載的資料轉換為我們需要的數據格式 `PhotoVO` 。

```swift
   func loadFlickrData(aPageIndex:Int) {
        Alamofire.request("\(FlickrAPI.flickrAPIUrl())", method: HTTPMethod.get, parameters: nil, encoding: JSONEncoding.default, headers: nil)
           .responseJSON(completionHandler: onLoadFlickrDataCompleteHandler)
    }

    private func onLoadFlickrDataCompleteHandler(aDataResponse:DataResponse<Any>) {
        var _vos:[PhotoVO] = [PhotoVO]()
        var _pageIndex:Int = 0
        if aDataResponse.result.value != nil {
            let _json:JSON = JSON(aDataResponse.result.value!)
            if let _items = _json["photos"]["photo"].array {
                for _item:JSON in _items {
                    let _vo:PhotoVO = PhotoVO(
                        aID: _item["id"].stringValue,
                        aFram: _item["farm"].stringValue,
                        aServer: _item["server"].stringValue,
                        aSecret: _item["secret"].stringValue)
                    _vos.append(_vo)
                }
                _pageIndex = _json["photos"]["page"].intValue
                self.addPhoto(aPageIndex: _pageIndex, aPhotoVOs: _vos)
            }
            print("LoadFlickrDataComplete!count:\(_vos.count)")
        }else{
            print("loadFlickrData Error:\(aDataResponse.result.error)")
        }
    }
```

看一下 `loadFlickrData(aPageIndex:Int)` 這個方法，先透過 `FlickrAPI` 撈取到 JSON 格式的圖庫資料，然後再取出裡面的 \["photos"\]\["photo"\] 標籤裡面的陣列。

在歷遍這個圖片資訊的陣列，逐筆建立我們所會用到的 `PhotoVO` 格式，再儲存到我們做好的 `FlickrModel` 裡面。

這便是外觀模式的強大之處：如果外部類別想要做 Flickr 圖床的資料操作，它不會也不用去瞭解 `FlickrModel` 內部的實現邏輯是怎麼樣的，只需要知道 `FlickrModel` 儲存照片資料，照片資料格式為 `PhotoVO` 。

可以再從 `FlickrModel` 的角色再深入去思考，對於其他的類別，也不需要知道目前有哪些照片來源，如何得到的，只要知道 `FlickrModel` 整合好圖片資訊即可。

> 注意：當你設計外觀的時候，請務必牢記：使用者隨時可能直接訪問你的隱藏類別。永遠不要假設使用者會遵循你當初的設計做事。

我們再打開 `PhotoView.swift` ，幫 PhotoView 多一個下載圖片的功能，而且為了日後可以重複利用，降低耦合的前提下，我們要給它的功能是，給 PhotoView 圖片網址就可以下載圖片，而不是給 PhotoVO 這個圖片描述的 Variable Object。

/_我們先設定一個全域變數_ `mImageRequest` _，這樣圖片的下載階段我們才可以控制下載的取消與重新下載。_/

```swift
import Alamofire
```

然後再完成 `downloadImage:` 。

```swift
     func downloadImage(aImageURL:String?,aCacheFileName:String?) {
        mImageView.image = nil
        if aImageURL != nil {
            mLoadingView.startAnimating()
            Alamofire.request("\(aImageURL!)\(aCacheFileName!)").response(completionHandler: { (aDefaultDataResponse:DefaultDataResponse) in
                if aDefaultDataResponse.error == nil {
                    if let _image:UIImage = UIImage(data:aDefaultDataResponse.data!) {
                        self.mImageView.image = _image

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

除此以外，讓 `PhotoView` 除了網址以外，也可以直接呈現 `UIImage` 的功能，所以我們再追加一個程式。

```swift
    func setImage(aImage:UIImage){
        mImageView.image = aImage
    }
```

這樣，我們的 `PhotoView` 也是一個對於這支應用程式而言，一個低耦合，甚至可以直接給其他專案使用的類別，而且他可以自己處理 `UIImage` 的呈現，也可以直接給圖片網址自行下載的功能。

`FlickrModel` 以及 `PhotoView` 這兩個類別，就是外觀模式的應用。

完成到這一步的Demo：

* 查看原始碼
* [下載ZIP](https://github.com/wildenchen/swift-bethel-of-the-road/tree/eed3c8ff6c1141681b3d3b2c69fac406cd11c24c/DesignPatterns/workspaces/FlickrPhotos-Facade.zip)

