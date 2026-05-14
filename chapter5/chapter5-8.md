---
title: "構造函數"
---

# 構造函數

物件的建立和刪除是所有 OOP 語言關注的重要課題。在 Swift 中，與 Objective-C 不同，建立物件時自動調用構造函數，删除則是由垃圾回收機按照自己計畫自動執行。

## 什麼是構造函數 \(構造方法，建構式\) ?

我們在使用一個物件前，往往需要初始化這個新生的物件狀態。這個初始化動作怎麼執行？放在哪裡？難道需要用戶在建立每一個物都要要手動調用嗎？這種依靠是很不保險的，所以之前的 Objective-C 會常常出現記憶體洩漏或引用計數不當等問題。所以，現在成熟的 OOP 語言中都採用了構造函數。一個類別中只要含有構造函數，那麼 編譯器會負責吿知這個物件在建立每一個物件用這個函數，完成我們指定的初始化動作。簡單地説，當我們使用 "類別名稱\(\)"時，構造函數 init\(\) 就會執行。

如果在類別中沒有定義構造函數，那麼編譯器在編譯時會自動建立一個預設的空的構造函數。

構造函數可以有參數，透過給構造函數傳入參數來初始化成員是很常見的做法。

而 Swift 構造函數支援重載，然而在繼承了 Objective-C 寫的 class 時，重載有些不同，使用時需要注意。

## 建構式實例

下面的範例中將建立兩個物件，一個是 Foo 類別的實體 foo，一個是 Bar 類別的 實體 bar。Foo 沒有定義構造函數，Bar 類別定義了構造函數，並在其中寫了一系列的初始化語句，初始化了其屬性 isOK，還調用了 init\(\) 方法。SampleConstructor 是文件類別，可以看出我們的一系列測試語句恰恰也是寫在文件類別的構造函數中的，這樣就會確保在編譯 App 時執行到 SampleConstructor\(\) 中的語句。

```swift
import Foundation
class SampleConstructor {
    init(){
        var _foo:Foo = Foo()
        print("\(_foo)")
        var _bar:Bar = Bar(aHS: "Swift")
        print("\(_bar)")
        print("\(_bar.isOK)")
        print("\(_bar.hello)")
    }
}

class Foo {

}

class Bar {
    var isOK:Bool
    var hello:String
    init(aHS:String){
        print("Bar constructor!")
        isOK = true
        hello = aHS
        create()
    }

    func create(){
        print("create executed!")
    }
}
```

Xcode 給 Foo 類別建立的預設構造函數，就如同 Foo 類別中定義了一個空構造函數。

```swift
class Foo {
    init(){ 
    }
}
```

## 便利建構器 convenience

///待

```swift
class Foo{
    init(){

    }

    convenience init(){
      super.init()
    }


}
```

