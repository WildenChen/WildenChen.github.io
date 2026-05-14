---
title: "類別與物件"
---

# 類別與物件

過程導向程式設計方法，是將程式看成一個個步驟，而物件導向程式設計\(OOP\)方法，是將程式看成一個個具有不同功能的部件在協同工作。類別就是描述這些部件的資料結構和行為方式。而物件就是這些實際的元件，Class 好比電路圖，Object 就是按這這電路圖做出來的電路板。

怎麼理解 Class 是「用來描述部件的資料結構和行為方式」呢？

比如，有個 Class 是描述長方形的，那他就會包含以下這些內容：首先，每個長方形都有寬度與高度，長方形會需要兩個變數來記錄寬度與高度，這兩個變數就是長方形的屬性。其次，如果希望這些長方形都能計算面積，那麼可以將長方形設計成長方形 Class 所擁有的一個方法，這個方法就是將兩個屬性，寬度與高度相乘，返回乘積作為面積。

物件，泛指一切有實際狀態和行為的資料集合。遵從某個 Class 描述的物件，又稱為這個 Class 的實體或是實例。物件和實體，這兩個術語基本意義上沒有什麼區別，若真要詳細區別，實體指的是某個 Class 的物件，物件則是泛指各種類別的實體。我們可以稱呼這個長方形是一個物件，也可以說這是長方形類別產生的一個實體。

自定義的長方形類別：

```swift
// 長方形類別
class Rectangle {
    private var mArea   :Int = 0    // 面積
    private var mWidth  :Int = 0    // 寬
    private var mHeight :Int = 0    // 高

    init(aWidth:Int,aHeight:Int){
        mWidth = aWidth
        mHeight = aHeight
    }

    // 取得面積
    func getArea() -> Int{
        return mArea
    }

    // 計算面積
    func calculateArea(){
        mArea = mWidth * mHeight
    }
}
```

> 物件和實體在實際應用中沒有清楚界線，物件，實體，實例，對象這幾個意義都相同。
>
> 函數，函式，方程式，func，function，也沒有明確界線，而方法通常指的是類別裡的函數。

建立自定義長方形的實體：

```swift
    override func viewDidLoad() {
        super.viewDidLoad()

        var _rectangle:Rectangle = Rectangle(aWidth: 10, aHeight: 5)
        var _rectangleArea:Int = _rectangle.getArea()
        print("\(_rectangleArea)")     // 輸出 0
        _rectangle.calculateArea()
        _rectangleArea = _rectangle.getArea()
        print("\(_rectangleArea)")     // 輸出 50

    }
```

## Class 和 Object 的權威定義

物件的定義：一個物件有自己的狀態，行為和為一個標誌，所有相同類型的物件所具有得架構與行為在它們共同的類別中被定義。

* 物件的狀態\(state\)，包括這個物件已有的屬性（通常是類別裡面已經定義好的），再加上物件所具有的屬性值（這些屬性往往是動態的）。
* 行為\(behavior\)是指一個物件如何影響外界以及被外界影響，表現物件自身狀態的改變和資訊的傳遞。
* 標誌\(identity\)是指一個物件所具有的區別於所有其他物件的屬性。
  * 標誌屬性往往被誤解為物件的變數名稱，甚至許多書籍以及網路教學也誤導，實際上，應當理解為在記憶體中所建立的物件位址，表現為該物件的引用。

結合上述程式碼理解，`_rectangle` 是一個 `Rectangle` 類別的物件，其架構包含了寬，高與面積，\_rectangle 的行為是計算面積 calculateArea\(\)，還有取得面積 getArea\(\)，這些都在 Rectangle 類別中被定義。\_rectangle 透過 calculateArea\(\) 與 getArea\(\) 與外部進行互動。

首先，外部透過調用 calculateArea\(\) 改變了 \_rectangle 的 mArea 成員的屬性從而改變了 \_rectangle 的狀態，然後再透過 getArea\(\) 得到了回饋的資訊 - \_rectangle 的面積值，而這個物件的標誌就是變數名稱 \_ractangle 的引用。

> 類別的成員包含了屬性與方法。

一個 Class 類別，就是一群物件所共有的架構與行為。而一個物件對外部公開的屬性與方法被稱為對外部的介面\(Interface\)。

> 補充：這是裝飾者模式重要的基本概念。

## Class 和 Object 的區別

除了上面所介紹的定義之外，筆者覺得還是有必要再一次強調 Class 與 Object 區別。

Class（類別）相當於語言中的名詞，指代一類事物。 而 Object \(物件\)相當於現實生活中的實體。 Class 描述了實體的特徵和方法。Object 實現了 Class 所定義的特徵和方法，並且含有自己實際的狀態。這就是 Class 和 Object 的區別。

拿「貓」這個名詞來說，它指的就是貓一類的動物，而不是實際上的哪隻貓，這一類有一些共同特徵，但實際狀態不知道，比如貓都有毛髮，但顏色沒有統一的，貓都會叫，但是叫聲也不同。可是當我們說起這是鄰居家的「Ketty」時，那個指的就是實際的貓了。「Ketty」的毛是黑白相間，叫聲低沉。「Ketty」就是「貓」這個名詞在現實中的一個實體。它的毛色和叫聲是這個實體所持有的狀態。

