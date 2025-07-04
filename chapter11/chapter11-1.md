# Swift 命名規則

多熟悉 Apple 的 cocoaTouch Framrwork 提供的 API 的命名方式。 原則上仿照 Apple Swift 官方推薦的方式來撰寫。

## 名稱

使用有意義的單字，盡量不使用編號或是直接類別名稱取名。

推薦:

```text
var color:String = "red"
```

不推薦:

```text
var cc:String = "red"
```

## 括弧

定義方法或是判斷式時的左大括號（ if / else / switch / while / try 等）應在該行結尾處，右括號需要另起一行。

推薦:

```swift
if user.isHappy {
  //Do something
} else {
  //Do something else
}
```

不推薦:

```swift
if user.isHappy
{
    //Do something
}
else 
{
    //Do something else
}
```

## 註解

只有在`有必要時`才對程式碼寫註解來解釋該程式為什麼需要這樣做。

有時我們會透過註解來做程式碼測試或是邏輯的暫存，但是在最後完成程式碼時，需要刪除的就刪除。

若需要對目前寫的程式碼做註解說明時，盡量避免使用多行註解，最好能用簡單言語清楚表達，理想上應該是讓程式碼的方法參數與變數命名本身去解釋自己的功能。

## 命名

使用敘述性的駱駝式命名法來為類別名稱、函數、方法、變數等命名。

* 類別名稱：
  1. 類別名稱、協議名稱、結構、列舉等類型的命名規範為，第一個大寫英文字母，各單字首字母也大寫
  2. Extension 類別，檔案名稱命名為 欲擴充的類別名稱+擴充識別名稱：如 “UIColor+FlatColors”
  3. 如有多數同類型類別需整理，可以使用 struct\(結構\)來充當命名空間

```swift
class AppLocalization: NSObject {
    private struct SingtonStatic{
        static var mSharedLocalSystem:AppLocalization?
    }
}
```

* 變數名稱
  1. 類別成員變數\(私有變數\) 名稱前加小寫 `m`，第二字母單字第一個字母大寫。如`let mLabel:UILabel = UILabel()`
  2. func 內區域變數，名稱前加 `_`。如`let _dx:Float = 0.5`
  3. func 參數，名稱前加 `a`。如

     ```text
     func doSomeThing(aMessage:String){}
     ```

  4. internal 以上權限的變數，直接小寫變數取名。
  5. 簡單型別的公開常數名稱一律大寫，常見的為事件名稱，可由多個單字組成，單字中間使用 `_` 隔開。如

     ```text
     static let LOAD_COMPLETE:String = '載入完成'
     ```

  6. 複雜型別的常數盡量避免使用，使用靜態方法取代之，並在該靜態方法命名前綴最加上 share  main  getInstance。

     ```swift
     static func getInstance() -> Singleton { 
      return mInstance! 
     }
     ```

  7. 除了 for-in 回圈，一般命名需要加入型別
  8. 常數一定使用 let 關鍵字來定義，而變數使用 var 關鍵字來定義，而 swift 多數情況，let 的宣告會比 var 還要多。

     ```swift
     private var mBundle:NSBundle = NSBundle.mainBundle()
     var languageName:String = “”
     let CALENDAR_ITEM_WIDTH:CGFloat = 70.0
     private let _CALENDAR_ITEM_WIDTH:CGFloat = 69.0
     public var calendarItemVO:NSObject = NSObject()
     private var mCalendarItemVO:NSObject = NSObject()
     let shareInstance:SingletonModel = SingletonModel()
     ```

  9. 宣告陣列，使用英文複數名詞，或使用 `Array / List` 做後綴，例如 `tickets 、 ticketArray 、 ticketList`
  10. 布林值：以`is`前綴,例如`isOpen`
* 方法名稱
  1. 方法名稱通常為多個單字組成，第一個單字通常為動詞，以小寫字母作為開始，駝峰式命名，其餘單字字首大寫。如 balanceAccount 和 isButtonPressed。
  2. 除了建構式（init）以及 override 的原生 API 以外，應該為每個參數命名，而參數的前綴使用小寫 a。
  3. 如果能讓 function 可讀性更强，最好提供每個參數的外部參數名稱。
  4. 對於類別中的方法，可遵循 cocoaTouch API 慣例，將方法名稱作為第一個參數的外部名稱
  5. func 的參數在 func 內預設都是 let 常數，禁止透過 var 關鍵字改為變數。//swift 3 不能用的樣子，待測

     ```swift
     func dataFromString(aDateString:NSString) -> NSDate
     func converPointAt(#aColum:Int, #aRow:Int)-> CGPoint
     func addTimedAction(#aDelay:NSTimeInterval, perform aAction:SKAction)
     func doSomeThing(aFirst:Int,var andSecond aSecond:Int)
     // would be called like this:
     let _date:NSDate = dataFromString("2014-03-14")
     var _point:CGPoint = converPointAt(aColumn:42,aRow:13)
     addTimedAction(delay:1.0,perform:someOtherAction)
     doSomeThing(100, andSecond: 200)
     ```

## 迴圈

傳統的 for-condition-increment 迴圈，在 Swift 3 已正式取消，且添加了 forEach 迴圈。

```swift
for _ in 0..<5 {
  println("Hello five times")
}

for person in attendeeList {
  // do something
}

mArray.forEach { (aStr:String) in
    print("str is \(aStr)")
   }
```

