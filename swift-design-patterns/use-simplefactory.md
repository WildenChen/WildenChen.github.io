---
title: "如何使用簡易工廠模式"
---

# 如何使用簡易工廠模式

以下是Flickr API的描述類別：

```swift
// FlickrAPI.swift
import Foundation

class FlickrAPI{
    static func flickrAPIUrl() ->String {
        return "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=b619f4b07eda330a9c89ee26d22c59d5&per_page=1&format=json&nojsoncallback=1&extras=url_q,url_z&page=99"
    }

    /*static func flickrInterestingness(aPageIndex:UInt = 1,aPerPage:UInt = 99) -> Dictionary<String,String> {
        let _paramters:Dictionary<String,String> = [
            "method"         : "flickr.interestingness.getList",
            "api_key"        : "your_flickr_api_key",
            "per_page"       : "\(aPerPage)",
            "format"         : "json",
            "nojsoncallback" : "1",
            "extras"         : "url_q,url_z",
            "page"           : "\(aPageIndex)"
        ]
        return _paramters
    }*/
}
```

原則上，簡易工廠模式下，都是 static 的 func ，而且都會回傳一個「類別實體」，像上面的 `flickrAPIUrl` 嚴格來說，也不能算是簡易工廠模式，因為 `String` 屬於基本型別，而且也不是自定義的類別，而且 `FlickrAPI` 本身並沒有實體化的需求。

筆者只是透過 `FlickrAPI` 這類別對大家做一下基本架構的展現而已。

像之前的 `LionCoffee` 才是典型的簡易工廠設計模式，另外 Apple 提供的 API 下，最典型的簡易工廠模式則是 `UIColor`。

Flickr API 申請網址： [https://www.flickr.com/services/api/](https://www.flickr.com/services/api/)

完成到這一步的Demo：

* 查看原始碼
* [下載ZIP](https://github.com/wildenchen/swift-bethel-of-the-road/tree/eed3c8ff6c1141681b3d3b2c69fac406cd11c24c/DesignPatterns/workspaces/FlickrPhotos-SimpleFactory.zip)

