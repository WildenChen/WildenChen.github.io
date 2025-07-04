# 如何實現繼承

繼承，意味著新類別看起來和原有的類別相似。新類別擁有與原有類別相同的對外介面，或許還新增了一些介面。

使用原有類別物件的地方，都可以被替換成新類別物件。符合這兩個條件的，才可以稱為正確的繼承。

被繼承的類別，稱為基本類別\(BaseClass\)或者超類別 \(Superclass\)，通俗稱為父類別。

用繼承建立的新類別，稱為基本類別的延伸類別，多數人稱為子類別\(Subclass\)。

> > 在 Swift 中，繼承只有類別\(class\)才有的功能，結構與列舉都沒有。

```swift
class DisplayObject: UIView {
    var mHandlers       :[ (String,() -> Void) ]                        = [ (String,() -> Void) ]()
    var mEventHandlers  :[ (String,(target:DisplayObject) -> Void )]    = [ (String,(target:DisplayObject) -> Void )]()
    var Name            :String                                         = ""
    var Id              :Int                                            = 0
    private var mDropshadowLayer:CAGradientLayer?
    override init() {
        super.init(frame: CGRectMake(0.0, 0.0, 100.0, 100.0))
    }
}
```

「:」就是 Swift 用來宣吿繼承的關鍵字。宣吿繼承的語法有兩個要點

* class 宣吿之前要導入被繼承的父類別。
* 後面要寫上父類別的類別名稱。

Swift 和 Objective-C、Java、C\# 一樣，是單一繼承的語言。

## 繼承的表現和一個實際實例

繼承父類別後，子類別具有父類別的所有非 private 的實體屬性和方法。而且在任何使用父類別物件的地方，都可以使用其子類別物件來代替。

```swift
class BaseSystem{
    private var mSystemName:String = ""
    var systemName:String{
        return mSystemName
    }

    func showSystemName(){
        print("System Name is \(self.systemName)")
    }
}

class OSX: BaseSystem {
    override var systemName:String{
        return "OS X"
    }
}
```

```swift
//      let _system:BaseSystem = BaseSystem()
//      _system.showSystemName()
        let _system:OSX = OSX()
        _system.showSystemName()
```

## 繼承與存取控制

父類別中非 private 的實體成員 - 包括實體屬性和實體方法都會被子類別繼承。 換句話説，在子類別中可以存取到父類別所有的非 private 的實體成員。

public 和 internal 的類別成員都會被子類別繼承，同時控制權限也會與父類別相同。

### 什麼時候用 public 類別成員？

當然是這個類別成員需要對 module 外部可見，且需要作為類別和外部的介面時，才可以使用 public。

### 什麼時候用 internal 類別成員?

首先，這個類別成員不需要對 module 外可見，即不要 module 外存取，在多數的 App專案製作上，因為開發的 target 是 iOS App，我們不會使用 public，頂多只是使用 internal。本著存取許可權越低越好的原則，能用 private 絕不用 internal，能用 internal 絕不用 public， 除非是必須公開的對外介面，不能僅僅因為圖存取方便，而將類別成員設為 public，這是很不好的做法。

### 什麼時候用 private 類別成員？

當這個類別成員只是父類別的內部實現機制，子類別和其他類別都不應該知道，這時就使用 private。根據 OOP 慣例，使用 private 應該是最優先的考慮。

如果還是無法判斷使用時機，最簡單的方式就是所有實體成員一律都用 private，只有在需要時再考慮改為 internal。

### 繼承與覆寫 \(override\)

在子類別中，經常要改變繼承自父類別中的某個屬性或方法中的內容，但不改變名稱，從而達到子類別同名方法實現不同功能的多態效果，這種方式叫做覆寫。

被關鍵字 final 定義過的實體方法不能被覆寫，父類別的 private 成員不能被覆寫。 要成功覆寫實例方法必須滿足以下幾個條件:

1. 必須用 override 關鍵字在行首標明這是覆寫。
2. 子類別中被覆寫的方法要和父類別的方法有同樣的存取控制、同樣的參數名稱、參數數目和參數類型、同樣的返回值類型。

不滿足以上條件，編譯時將出現錯誤。

### 繼承與私有方法：易錯的誤區

子類別不繼承父類別私有方法，所以談不上覆寫。 //在子類別中定義與父類別同名的私有屬性和私有方法也會出現錯誤。只會看成這個新子類別的屬性和方法，不需要 override 關鍵字修飾。

還有一個 OOP 新手易錯的誤區：

如果在子類別中定義和父類別的同名私有實體方法 doSomethingA\( \) ，而且父類別中 doSomethingB\( \) 調用了 doSomethingA\( \) ， 那麼在子類別中如果調用 doSomethingB\( \) ， doSomethingB\( \)的實際調用的仍然是父類別的私有實體方法 doSomethingA\( \) ，而不是子類別新定義的 doSomethingA\( \)。

這是因為父類別的 private 私有方法，子類別是獨立的。

### 繼承與 super 關鍵字

子類別常常需要明確地調用父類別中的方法。比如，子類別的構造函數與父類別不同，需要在構造函數中調用父類別的構造函數。

還有，在覆寫一個方法時，往往只希望在原有方法的基礎上添加一些內容，也需要明確地再調用原有方法，而沒必要重複寫入原有方法的程式碼。此時就要用到 super 關鍵字。 可以將 super 看成一個實體變數，直接持有對父類別的引用，而 super\(\) 就是父類別的構造函數。

既然 super 是表示著當成父類別的實體，super 不能用在`靜態方法`中。

```swift
    override func viewDidLoad() {
        super.viewDidLoad()
    }
```

## 靜態成員的繼承

類別成員包括實體成員和靜態成員。實體成員包括實體屬性和實體方法。靜態成員包括靜態屬性和靜態方法。

不是 private 的實體成員都可以被子類別繼承。類別的靜態成員不被子類別繼承，而「類別函式」可被繼承。

靜態成員雖然不被子類別繼承，但是在子類別中仍然可以存取父類別靜態成員：父類別的靜態成員存在的範圍鏈 \(scope chain\)包括父類別和其所有子類別。 一般子類別中可以存取父類別的靜態屬性已經可以滿足需要。 這時如果要存取父類別的靜態成員，只能使用父類別的類別名稱加上靜態成員名稱。比如 Base.hello\( \)。

在某些情況，一定要使用子類別加上靜態函式名稱來存取。這時「類別函式」就派上用場了。

```swift
class BaseClass {
    static let CHANGE:String = "change"
    //class let CHANGE:String = "change" // 類別關鍵字不能用在儲存屬性

    static func createFactoryByStatic() -> BaseClass{
        return BaseClass()
    }

    class func createFactorybyClass() -> BaseClass{
        return BaseClass()
    }
}

class SubClass: BaseClass {
    //override static let CHANGE:String = "change" // 不能覆寫靜態屬性

    //override static func createFactoryByStatic() -> BaseClass{
    //    return BaseClass()
    //}
    // 不能覆寫靜態方法

    // 可以覆寫類別方法
    override class func createFactorybyClass() -> BaseClass{
        return BaseClass.createFactoryByStatic() // 可以呼叫附類別的靜態方法
    }

}
```

