---
title: "靜態屬性和靜態方法"
---

# 靜態屬性和靜態方法

靜態屬性和靜態方法不依賴實例而獨立存在。簡單地説，即使不建立一個類别的實例，我們也可以存取到該類別的靜態屬性和靜態方法。這一點就和實體屬性、實體方法完全不同。那麼靜態屬性和靜態方法是怎麼實現的呢?

靜態屬性\( static properties \)儲存所有物件共同的狀態，和任何實體都沒有關聯。每個物件的實體屬性值可以各不相同，但所有同類別物件的靜態屬性值都是一致的。改變一個物件的實體屬性值不會影響另 一個物件的實例屬性值，但改變一個類別的靜態屬性值則會影響該類別所有物件。

靜態方法\( static methods \)也是獨立於所有實例的。靜態方法只和每個類別綁定，不和類別的任何實際實例綁定。

靜態方法和靜態屬性只為每個類別建立一次，在這個類別被調用時建立。與類別實體是否建立，建立多少次沒有關係。

無論是類別\(class\)或是結構\(struct\)中，我們統一使用 static 來描述"靜態"。static 適用的場景有這些：

```swift
struct  Point  {
    let x:Double 
    let y:Double

    // 靜態存儲屬性
    static let zero = Point(x:0 , y:0)

    // 靜態計算屬性
    static var ones: [Point] {
         return [Point (x:1, y:1),
                 Point (x:-1, y:1),
                 Point (x:1, y:-1),
                 Point (x:-1, y:-1)]
    }

    // 靜態類型方法
    static func add(aPoint1:Point, aPoint2:Point ) -> Point {
        return Point(x:aPoint1.x + aPoint2.x, y:aPoint1.y + aPoint2.y)
    }
}
```

enum 的情況與這個十分類似，但是值類型使用 struct 即可處理全部需求，就不再列舉了。

```swift
class LNCalendarModel {
    private static var mInstance:LNCalendarModel?
    static func getInstance() -> LNCalendarModel {
        if mInstance == nil {
            mInstance = LNCalendarModel()
        }
        return mInstance!
    }
    private init(){

    }
}
```

那麼，設計出這樣一個靜態屬性和靜態方法有什麼好處呢？用意何在？何時應用？請看下面的解釋。

## 靜態屬性和靜態方法的使用場合

靜態屬性和靜態方法在平常的 OOP 程式設計中與進階的 OOP 設計中都有重要的地位。 先説説在日常 OOP 程式設計中，靜態屬性的運用。有時我們只是想用類別來儲 存一些資料，並不想建立任何類別的實例。一方面，為了減少麻煩，不想建立實例。另一方面希望資料集中管理，不想因為不小心建立了多個實體而導致資料儲存的分散。

這時使用靜態屬性就很方便，只需要在類別名稱後加上靜態屬性就可以存取到所需要的資料，而且只此一份。

靜態方法何時運用呢？

有時我們只希望某個類別提供一些服務，不需要建立實際 實體時，就可以用靜態方法了。 靜態方法一般都用來提供工具性的方法。比如 Math 就是一個典型的工具類別。

除了以上兩點外，靜態屬性和靜態方法在進階 OOP 程式設計的設計模式\(Design Patterns\)中經常用到。比如應用廣泛的工廠模式、單一設計模式、MVP 設計模式等。

## 宣告靜態屬性和靜態方法

在類別體中，按如下格式寫入靜態屬性的宣吿，或者在宣吿時直接賦值。存取控制，應當加在 static 關鍵字之前。如果不加存取控制，預設為 internal。

例：

```swift
class Model {
    static let MODEL_CHANGE:String = "modelChange"

    private static func doAnyThing(){

    }

    static func doAnyThingFinal(){

    }
}
```

在類別中，可以直接使用靜態屬性名存取靜態屬性，或者使用靜態方法名來存取靜態方法。在類別外要存取的話，使用類別名稱加「.」號加屬性名或方法名來存取：

例：

```swift
Model.doAnyThingFinal()
let _modelEventName:String = Model.MODEL_CHANGE
```

