---
title: "self 關鍵字"
---

# self 關鍵字

self 關鍵字持有對目前物件的引用，在類別中使用 self 關鍵字的次數不會很多。但要明白，我們之所以能夠在類別中的方法隨心所欲地存取所有實例屬性和實例方法，其背後實際上是隱藏著 self 關鍵字的支援。在一個方法中存取實例屬性看似很正常，可是讓我們站在編譯器的角度想一想，如果 Foo 類別有兩個實例 A、B，並且都有擁有 hello\(\) 的方法，hello\(\) 會將它們的 name 屬性 print 出來，那麼怎麼保證調用 A.hello\(\) 時不會 print 出 B 的 name呢？ 原來，編譯器偷偷地做了一件事，編譯時它將 self 關鍵字悄悄寫 在了類別中每一個調用實例屬性和實例方法的地方。

```swift
class Foo {
    var name:String
    init(aName:String){
        name = aName
        sayHello()
    }

    func sayHello(){
        print("Hello,\(name)")
    }
}
```

編譯器偷偷加上 self 後的情況

```swift
class Foo{
    var name:String
    init(aName:String){
        self.name = aName
        self.sayHello()
    }

    func sayHello(){
        print("Hello,\(self.name)")
    }
}
```

就這樣，self 關鍵字將各個實例屬性和方法綁定在了目前物件中。所以，物件的狀態才能在物件的內部邏輯中得以共用。 強調一點， self 關鍵字只限於實體屬性和實體方法。因為 self 關鍵字必須要一個實際的實體，而類別方法是不和任何實體相關聯的。因此self 關鍵字不能用在類別方法中，也不能用來存取靜態屬性。

## 什麼時候在類別中使用 self 關鍵字

self 在類別中較少用到，如下幾種情況會使用到 1. 與 return 結合，用來提交自身的引用 2. 和區域變數、方法參數、靜態屬性同名時，加上 self 關鍵字明確指定使用實體屬性。如果不加上 self 關鍵字指定 ，那麼將按照區域變數-&gt;方法參數-&gt;實例屬性的順序選擇一個。提醒程式設計初學者，像這種同名情況應當儘量避免在程是設計中發生。 3. 使用匿名函數時，出現閉包時。

