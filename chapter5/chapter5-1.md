# 一個簡單的 Class

```swift
class MyObject {
    private var mName:String = "myObject"

    init(){

    }

    func doSomething(){
        print("\(mName).doSomething!!")
    }
}
```

上例中，只是一個基本的類別架構，class 定義類別名稱，private 控制類別成員的存取許可權，表示該成員不可被調用或存取。

類別的宣告要用 class 關鍵字，後面跟隨的 MyObject 就是類別的名稱， class （類別）實際上包含哪些內容，則寫在 class 後面的括弧中。在同一個 swift 的檔案裡，可以放置多個類別。

class 後面括弧中的內容有三個，一個 mName 的字串變數，一個 init 的函式與 doSomething 的函式。像 mName 這種在 class 裡面宣告的變數，稱之為屬性\(property\);像 doSomething 這種在 class 裡宣告的函數，稱之為方法\(method\)。而 init 則是一種特殊的函數，稱之為建構式或是構造函數\(constructor\)。 每個類別都有構造函數，而且都叫做 init。

我們可以用以下圖形來描述這個類的結構。

| **MyObject** |
| :--- |
| - mName : String |
| + init\( \) + doSomething\( \) \# didSomething\( \) |

* 第一個方格粗體字表示類別名稱。
* 第二個方格表示屬性，`-` 表示`private`
* 第三個方格表示方法，`#` 表示`internal`、`+` 表示`public`

這種簡易的方格圖，實際上就是業界通用的 UML 語言中的類別圖。

