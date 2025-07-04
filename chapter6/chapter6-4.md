# 類別成員的存取控制

在 Swift 中，存取控制字元共有5個，即 open、public、internal、fileprivate、private。

而 open 和 fileprivate 是 Swift 3 新加入的。

[http://www.jianshu.com/p/604305a61e57](http://www.jianshu.com/p/604305a61e57)

存取控制字元要放在每一個類別成員的前面。因此有時又被某些流派認為屬於成員屬性。類別成員包括了成員屬性 \(properties\) 和方法 \(methods\)。每個存取控制字元只控制自己後面的類別成員，不可以同時控制多個。存取控制字元不只控制實體屬性和方法，對靜態屬性和方法也有同樣的作用。

下面來看看最常用的存取控制，先從預設的存取控制字先 internal 開始：

## internal - 套件內存取

如果一個類別成員前面沒有加任何存取控制字元，將被預設為 internal。 internal 為 “ 內部的 ”。在什麼內部? 在套件的內部。它表示只要是和目前類別在同一個 modul 中的其他類別都可以存取這個類別成員。但是，不屬於這個 modul 的成員是不能存取這個類別成員的。

```swift
class myClass{
  var name:String = ""

  func setName(aName:String){
    name = aName
  }
}

class AClass:myClass{
}

let _aClass:AClass = AClass()
print("AClass \(_aClass.name)")
```

## fileprivate - 文件內類別可存取

在類別成員前加上 fileprivate 存取控制元件，不是該類別的就不能存取。

```swift
class User {
    fileprivate var name = "fileprivate"
    // 如果是private 的話，會報錯，因為private 是完全不公開，只在該區域內可使用。
}

extension User{
    var accessPrivate: String {
        return name
    }
}
```

## private - 僅目前類別可存取

Swift 中的 private 存取控制最嚴格。private 修飾的類別成員，稱為私有成員\(private member\)，除了目前類別中的成員，所有其他類別的方法都不可以存取到該成員，即使是同一個套件中的類別或擴展，以及目前類別的子類別也不可以。

但是，有一點要説明，對於複雜資料類型的屬性來説，private 的封裝只是説不透過目前類別的實例來存取，並不意味著這個屬性持有的引用所指向的物件不能被存取。這是重要的區別，也往往是別人在教學或是書籍上所忽略的。所謂複雜資料類型的屬性就是指該屬性的類型是複雜資料類型，也就是引用類型。

透過下面例子來説明 private 的封裝作用，以及 private 不能阻擋存取私有屬性所指向的物件。

```swift
class TextView{
  private let mName:String = "private"
    var name:String{
      return mName
    }
}

  let _view:TextView = TextView()
  print("name is \(_view.name)")
```

## public - 公開

在類別成員前使用 public 存取控制字元，則是宣吿在任何地方、任何物件都可以存取這個類別成員。

在此要提醒的是 public 的類別成員應當看成是這個類別對外部做出的承諾、協議，一旦決定，日後不能輕易改變。 不能僅僅為了其他類別可以存取某個成員，而輕率的將該成員設 為 public。這是 OOP 新手極容易犯的錯誤。 一旦發現某個類別成員需要頻繁被外部存取，就要先考慮這個類別成員的設計是否不當，可否獨立出來，再考慮可否歸入那些需要頻繁存取的套件中，使用 interna 級別來實現，最後再考慮使用 public 的存取控制。

總之，儘量將類別成員的存取許可權控制到最低限度，這才能給日後的修改、維護程式碼帶來最大的自由。

## open - 完全公開

在類別成員前使用 open 存取控制字元，與 public 相比，在同一個套件裡，是一樣的意思，但是在套件外， open 的類別成員所宣告的變數和函數是可以被覆寫\(override\) 的。 public 只是把類別成員公開出去但是不能覆寫 \(override\)

