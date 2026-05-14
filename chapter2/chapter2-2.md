---
title: "變數的宣告和可選值"
---

# 變數的宣告和可選值

初學者往往誤以為變數就是資料，實際上並非如此。

變數好比是一個遙控器，指向我們要操縱的資料。對變數進行操作，變數指向的資料就會發生相對應的變化。

變數必須先宣吿再使用，不然編譯器會顯示錯誤。那麼，為什麼要先宣吿變數呢？ 道理很簡單,我們必須要先吿訴 iPhone 建立一個遙控器，才可能給這個遙控器取名字，並使用這個遙控器。不然，你覺得 iPhone 能怎麼做呢？遙控器連名字都沒有，iPhone 怎麼找到並操作它呢？

### 宣告變數的語法

```swift
var 變數名稱:資料型別 = 值
let 常數名稱:資料型別 = 值
```

var 是一個關鍵字，用來宣吿變數。變數的資料型別寫在冒號後。其次，如果要賦值，那麼值的資料型別必須和變數的資料型別一致。如果不賦值，可需要確認是否在類別的建構式內賦值。

> 通常為了避免空值這種錯誤，在 Swift 開發中，通常會給予宣告的變數一個初始值。
>
> 和其他語言不同的地方是，Swift 若不給初始值，是不會有任何預設值的，而且在該類別被建構時，如果有沒給預設值的變數存在，甚至不能夠編譯通過。

## 變數的本質\(?\)

變數所賦予的值是可以做更改的，而常量無法事後做更改。

## 實值型別和引用型別的區別

* 實質型別:複製給別人，但所做的更動，仍然是同一個。

```swift
class ModelClass {
    var index:Int = 0
}

 var _modelClass:ModelClass = ModelClass()
 _modelClass.index = 999
 var _modelClass2:ModelClass = _modelClass
 print("_modelClass2.index = \(_modelClass2.index)")
 // _modelClass2.index = 999
 _modelClass2.index = 111
 print("_modelClass.index = \(_modelClass.index)")
 // _modelClass.index = 111
```

* 引用型別:重新生成一個全新的給別人，兩邊所做的更動是互不相干的。

```swift
struct ModelStruct {
    var index:Int = 0
}

var _modelStruct:ModelStruct = ModelStruct()
_modelStruct.index = 999
var _modelStruct2:ModelStruct = _modelStruct
print("_modelStruct2.index = \(_modelStruct2.index)")
// _modelStruct2.index = 999
_modelStruct2.index = 111
print("_modelStruct.index = \(_modelStruct.index)")
// _modelStruct.index = 999
```

## 可選值

你可以讓你所宣告的物件或基本元素的初始值是空值 \( nil \)，只要在型態後面加上 " ? " ，它就是可選型態。

```swift
  private var mStr:String?
  print("mStr is \(mStr)")
  // mStr nil 
  mStr = "Swift"
  print("mStr is \(mStr)")
  //mStr Optional("Swift")
```

在還沒給 mStr 初始值的時候，會輸出 nil ，接著初始值設為 “ Swift ” ，輸出結果為 Optional\("Swift"\) ， 這時候你可能會想，我都已經給值了，我不想要出現 Optional ，這時候該怎麼辦？

這時候，我們就在物件或元素後面加上 " ! "， 我們稱為強制取值。強制將物件或元素裡的值取出來。

```swift
print("mStr is \(mStr!)")
//mStr is Swift
```

但是這有個風險，在實務上，你不能保證你每一個宣告的可選值都 " 一定 " 有值。如果沒有值\(也就是 nil \)的時候，你強制取值就會導致 App 的閃退。

```swift
let _swift:String?

print("swift is \(_swift!)")
// App 閃退
```

為了避免以上情況，我們會使用 if-let 可選鍊，是 Swift 提供判斷可選值的方法。

```swift
if let _str:String = mStr{
  print("_str \(_str)")
}
```

當然以下寫法也可以判斷物件或元素是否有值，但在實務上，我們都使用 if-let 撰寫。

```swift
if mStr != nil {
  print("mStr \(mStr!)")
}
```

