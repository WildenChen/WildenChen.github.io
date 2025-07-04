# 如何使用擴展

整個 App 往往在視覺設計上，會有類似於 CIS \(企業識別系統\) 的風格設計，往往會有幾種 App 專屬的標準色。

像 `UIColor` 裡面，就已經提供了最常用的數種顏色，如 `UIColor.white` 或是 `UIColor.black` 等。

> `UIColor.white` 或 `UIColor.black` 是簡單工廠模式 \(Simple Factory\)的實踐， `cocoa` 有不少 API 都有提供這類方法來讓開發者達成快速建構的便利性。

至於顏色的建立，原本 iOS 所提供的方法為：

```swift
let _goldColor:UIColor = UIColor(red: 159.0/255.0, green: 143.0/255.0, blue: 117.0/255.0, alpha: 1.0)
```

這其實跟台灣設計的習慣有不少的出入，並不是十分方便， 所以我們在專案裡面有再追加了兩個擴展，一個是 UIColor 的 HEX 功能，另一個是 Flat 風格的顏色。

但是這隻 App 如果有屬於自己常用的顏色，我們又不想去繼承原本的 UIColor，或是去修改更動已經整理好的功能，我們可以再額外增加一個專屬於這隻 App 的顏色功能，不需要去繼承 UIColor ，而是使用擴展再額外增加 UIColor 這之類別本身的功能。

新建一個 Swift 檔案：`UIColor+OtherColor.swift`

```swift
//  UIColor+OtherColor.swift
import Foundation
import UIKit
extension UIColor{
    public static func goldColor()->UIColor{
        return UIColor.fromHex(0x9F8F75)
    }

    public static func midnightBlueColor() -> UIColor {
        return UIColor.fromHex(0x2c3e50)
    }

    public static func peterRiverColor() -> UIColor {
        return UIColor.fromHex(0x3498db)
    }

    public static func whiteGoldColor() -> UIColor {
        return UIColor.fromHex(0xFFF9E7)
    }

    public static func sunFlowerColor() -> UIColor {
        return UIColor.fromHex(0xf1c40f)
    } 
}
```

下面使用的方式：

```swift
class MainViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.goldColor()

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
}
```

這樣有利於和類別的原有方法進行區分，避免使用的時候產生衝突。現在很多還在維護中的第三庫都使用這種設計模式。

注意：類別是可以重寫父類別方法的，但是擴展不可以。擴展裡面的方法和屬性不能和原始類別裡的方法和屬性衝突。

思考一下這個設計模式的強大之處：

* 我們可以直接在擴展里使用 `UIColor` 的屬性與方法。
* 我們給 `UIColor` 類添加了內容但是並沒有繼承它，事實上，使用繼承來擴展商業邏輯也可以實現一樣的功能。
* 這個簡單的擴展讓我們可以更好地把 `UIColor` 的功能變得更符合在我們的應用程式中，而且不用修改原始碼。

完成到這一步的Demo：

* 查看原始碼
* [下載ZIP](https://github.com/wildenchen/swift-bethel-of-the-road/tree/eed3c8ff6c1141681b3d3b2c69fac406cd11c24c/DesignPatterns/workspaces/FlickrPhotos-Extension.zip)

