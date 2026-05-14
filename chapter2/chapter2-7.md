---
title: "變數的命名"
---

# 變數的命名

平時看到不少人的變數命名很糟糕，而且還對變數的命名重要性一無所知，這讓人很遺憾。其實，很多公司招聘程式師都非常看重個人變數命名習慣。個人命名習慣的好壞直接影響到團隊合作的效率。因此，筆者覺得有必要花費些許筆墨好好強調一下。

命名規則不僅僅是為了讓編寫的程式碼符合語法，更重要的是增強自己程式碼的可讀性。要做到自己看得清楚，別人也能看得明白。任何一個有經驗的程式師都會叮矚新手，對命名要認真 對待。因為在團隊開發中，規範命名關乎整體的工作交流和效 率。因此，標準清晰的命名是優秀程式碼的必備條件！

那麼要做到那幾點，才可以算是標準的變數命名呢？

### 盡量使用有含義的英文單字作為變數名稱

使用英文單字命名變數，已經是業界通用的做法。而且使用的英文單字的意義應説明變數的用途。比如：一個變數的名為 address，這個變數儲存的應該就是位址。 這並不是語法的要求，而是實際交流的需要，工作上的標準。 如果諸位寫程式碼只是自己玩，不需要與別人合作，那麼似乎可以不管這一條，使用中文亦可。

但筆者仍然認為，不管什麼情況儘量使用英文單字命名。 因為，常用的命名也不過兩三百個英文單字。就算完全沒有英文基礎，查查英文字典，咬咬牙就能堅持過來。

### 變數名採用駱駝式命名法:

駱駝式命名法，是指混合使用大小寫字母來構成變數和函數的名字。首字母小寫，第二個詞首字母大寫。比如，highLevelFlag 變數，就把 high、level、flag，3 個詞連在一塊，首單字首字母小寫，其餘單字首字母大寫。

變數的名字應當使用「名詞」或者「形容詞+名詞」構成。比如， width 、height 、 maxHeight 、 oldWidth。

### 變數命名符合「min-length && max-information」原則

所謂「min-length && max-information」原則，是指變數名稱的長度應當越短 越好，對變數代表的含義描述得越清晰越好。舉例，有一個變 數，用來表示所能容忍的程式中最大元件的寬度。那麼 maxuiwidth 肯定比 maximumWidthOfUIComponent 要好記得多。

這也意味著，儘量使用大家能認可的單字縮寫。比如 max 與 maximum，id 與 identification， err 與 error 等。

### 儘量避免變數名稱中出現數字編號

非邏輯上的確需要編號,否則儘量避免名字中出現數字編號。比 如，id1 、 id2、flag1 等。用數字編號最省事，大部分時候程式師為了偷懶時才會這樣做。

這樣不肯為命名動腦筋，就會導致產生無意義的名字。這些變數加數字所代表的含義很容易在日後被遺忘，也不會被別人所理解。

## 命名規則

推薦使用跟 Apple API 一樣的英文。

### 名稱

推薦:

```text
var color:String = "red"
```

不推薦:

```text
var cc:String = "red"
```

### 括弧

定義方法或是判斷式時的左大括號（ if / else / switch / while 等）應在該行結尾處，右括號需要另起一行。

推薦:

```text
if user.isHappy {
  //Do something
} else {
  //Do something else
}
```

不推薦:

```text
if user.isHappy
{
    //Do something
}
else {
    //Do something else
}
```

### 註解

只有在有必要時才對程式碼寫註解來解釋該程式為什麼需要這樣做。註解在最後完成程式碼時，需要刪除的就刪除。

盡量避免使用多行註解，最好能用簡單言語清楚表達，並且讓程式碼或是方法與變數命名本身去解釋自己的功能。

### 命名

使用敘述性的駝峰式命名法來為類別名稱、函數、方法、變數等命名。

* 類別名稱：
  1. 類別名稱、協議名稱、結構、列舉等類型的命名規範為，第一個大寫英文字母，各單字首字母也大寫
  2. Extension 類別，檔案名稱命名為 原始類別名稱+擴充識別名稱：如 “UIColor+FlatColors”
  3. 如有多數同類型類別需整理，使用 struct\(結構\)來充當命名空間

```swift
class AppLocalization: NSObject {
    private struct SingtonStatic{
        static var mSharedLocalSystem:AppLocalization?
    }
}
```

* 變數名稱
  1. 類別成員變數\(私有變數\) 名稱前加小寫 m，第二字母單字第一個字母大寫
  2. func 內區域變數，名稱前加 \_
  3. func 參數，名稱前加 a
  4. internal 以上權限的變數，直接小寫變數取名
  5. 簡單型別的公開常數名稱一律大寫，可由多個單字組成，單字中間使用 \_ 隔開，若為複雜型別常數，則命名前綴最加上 share  main  getInstance。
  6. 除了forin 迴圈，一般命名需要加入型別
  7. 常數一定使用 let 關鍵字來定義，而變數使用 var 關鍵字來定義，而 swift 多數情況，let 的宣告會比 var 還要多。

```swift
private var mBundle:NSBundle = NSBundle.mainBundle()

var languageName:String = “”

let CALENDAR_ITEM_WIDTH:CGFloat = 70.0

private let _CALENDAR_ITEM_WIDTH:CGFloat = 69.0

public var calendarItemVO:NSObject = NSObject()

private var mCalendarItemVO:NSObject = NSObject()

let shareInstance:SingletonModel = SingletonModel()
```

* 方法名稱
  1. 方法名稱通常為多個單字組成，第一個單字通常為動詞，以小寫字母作為開始，駱駝式命名，其餘單字字首大寫。如 balanceAccount 和 isButtonPressed。
  2. 除了建構式（init）以及 override 的原生 API 以外，應該為每個參數命名，而參數的前綴使用小寫 a 或是 p。
  3. 如果能讓 function 可讀性更强，最好提供每個參數的外部參數名稱。
  4. 對於類別中的方法，可遵循 Apple API 慣例，將方法名稱作為第一個參數的外部名稱

```swift
func dataFromString(aDateString:NSString) -> NSDate

func converPointAt(aColum:Int, aRow:Int)-> CGPoint

func addTimedAction(aDelay:NSTimeInterval, perform aAction:SKAction)

// would be called like this:
let _date:NSDate = dataFromString("2014-03-14")

var _point:CGPoint = converPointAt(aColumn:42,aRow:13)

addTimedAction(delay:1.0,perform:someOtherAction)

doSomeThing(100, andSecond: 200)
```

### 分號

在一段程式碼後面加上「;」，代表前一段程式碼結束了，系統就會知道結束的地方，然後繼續下一段程式碼。

```swift
let _label:UILabel = UILabel()
_label.text = "Test";_label.textColor = UIColor.red
```

傳統的 for-condition-increment 迴圈，在 Swift 3 已正式被拿掉，添加了新的forEach。目前還是建議使用for-in迴圈。

```swift
for _ in 0...5 {
  println("Hello five times")
}

for person in attendeeList {
  // do something
}

mArray.forEach { (aStr:String) in
    print("str is \(aStr)")
   }
```

for-condition-increment 迴圈

```swift
for var i = 0; i < 5; i++ {
  println("Hello five times")
}

for var i = 0; i < attendeeList.count; i++ {
  let person = attendeeList[i]
  // do something
}
```

