---
title: "什麼是協定"
---

# 什麼是協定

協定\(Protocol\)，是一種很常被使用的程式技巧，它可以將指定類別的方法分享給其他的類別使用，或是規範限制住指定類別所要實踐的方法與屬性，甚至在單一繼承的 Swift 世界裡面，還可以透過協定還定義不同屬的共同規範，這就是協定\(Protocol\)的基本概念。

我們從協定的實際意義，語法表現，還有實際運用這三方面來了解它。

協定的實際意義是，協定僅包含一組方法的宣告，沒有任何具體的程式碼實現。實現協定的類別必須按照協定的定義實現這些方法，當然有實現這些協定的類別都具有這個協定的特徵。協定描述了實現協定的類別對外部的承諾，而其他的物件可以根據這個協定來和實踐這個協定的物件作溝通與交流。

協定在語法上的表現是，只定義數據類型的 internal 以上的方法名稱，參數和回傳類別，不給任何方法與屬性的實現，其餘一律不管。其實，只要知道了一個物件的實體公開\( internal 權限以上\)方法和公開的屬性，就足以對外面使用該物件了。協定方法的定義，為方法的使用提供了足夠多的訊息。

協定在運用的表現為，如果有一些類別，彼此間沒有任何關聯，但是具有一個或多個相同的公開方法，那麼定義一個協定 A 來定義這些方法，然後將這些類別改為實現 A 協定，這樣就能把這些原本沒有任何關係的類別看成同一種資料類型來使用，還可以享受到上下轉換的優勢。使用協定能夠作為除了父類別和自身類別以外的其他數據類型。能夠以其他的數據類型做為向上轉型，是協定的主要核心之一。

因為 Swift 不支援多重繼承，所以協定的出現彌補了這樣的遺憾，一個類別可以同時實踐很多的不同的協定，也就是說一個類別可以透過協定當成很多種不同的數據類型來使用。

## 如何建立協定

定義協定的語法非常簡單，和定義類別相似。

協定也必須放在一個文件中，檔案名稱和協定名稱必須一致。

￼介面的定義結構如下所，展示了4種類型的方法在協定中的定義格式

```swift
protocol 協定名稱{
    func 方法名稱(參數:參數型別)->返回值
    static func 靜態方法名稱(參數:參數型別)->返回值
    var 實體屬性:型別{ set get }
    var 唯讀實體屬性:型別{ get }
    static var 靜態屬性:型別{ set get }
}
```

注意，協定也有存取控制屬性。預設為 internal，套件內可見。

與定義類別不同的是:

* 定義協定要使用關鍵字 protocol。
* 協定中可定義方法和屬性。定義的方法包括實體方法、靜態方法，定義屬性則一律都是用關鍵字 var，並需要在後方定義 set 與 get 。
* 所有定義的方法不可以加存取控制字元。協定中定義的方法都和 protocol 相同。
* 定義的方法沒有任何實現。
* 根據程式設計慣例，一般將協定名稱以 Protocol 結尾，或是依據性質在名稱後方取名 Delegate。

協定定義可以包含一個或多個方法，也可以不包含任何方法，僅作為一種資料類型的標籤。

## 如何實踐協定

一個類別在定義時如果實現一個協定，其實是在做一個宣吿：它將擁有這個介面定義的所有方法，可以把它當成這種協定的資料類型來使用。

實現協定的語法和繼承的語法相似，而且一個類別可以實現多種協定，多種協定之間用「,」號隔開。

```swift
class ViewController: UIViewController,UITableViewDelegate,UITableViewDataSource {}
```

導入多個協定時，要注意各個協定中定義的方法不能同名，否則將衝突。

在類別中實現協定定義的方法時要注意：

* 對介面中的定義的方法只能用 internal 以上存取控制。
* 名稱必須和協定中的定義的方法名稱相同。參數的數目、類型及方法的返回類型必須和協定中方法的定義相同。

## 協定與上下轉換 多重繼承

Swift 並不支援多繼承。Swift 是標準的單繼承語言，每個類別只能有一個父類別。

但是，在程式設計中有時會需要將一個物件當成幾種不同的資料類型來使用，一個物件可以當成自身類別或所有父類別的資料類型，但是僅這樣還不夠，有時需要將它們當成自身類別和父類別以外的類別，這時繼承就不足以滿足要求。

一旦可以作為介面資料類型使用，就可以充分體會多型帶來的好處。簡單地說，就是可以使用向上轉換和向下轉換了。

```swift
class Human {
    private var mName:String
    var name:String{
        return mName
    }

    init(aName:String){
        mName = aName
    }

    func run(){
        println("\(mName) is run")
    }

    func walk(){
        println("\(mName) is walk")
    }
}
```

之前的範例我們實作的一個Human的類別，並且再加上了 run 以及 walk 兩個實體方法。

我們再建立一個性質完全不同的類別 Robot。

```swift
class Robot {
    private var mID:String = "Robot"
    var id:String{
        set(value){
            mID = value
        }
        get{
            return mID
        }
    }

    func run() {
        println("\(mID) is run!")
    }

    func walk() {
        println("\(mID) is walk!")
    }
}
```

我們預設機器人和人類一樣可以走路和跑步，可是 Robot 並非繼承自 Human。 此時，我們一樣可以建立許多不同的機器人實體以及不同的人類實體。

```swift
        var mHumen:[Human] = [Human(aName: "Wilden"),Human(aName: "Kevin"),Human(aName: "Nick")]
        var mRobots:[Robot] = [Robot(),Robot(),Robot()]
        for (_index,_robot) in enumerate(mRobots){
            _robot.id = "Robot\(_index)"
        }


        for _human in mHumen {
            _human.walk()
            _human.run()
        }

        for _robot in mRobots{
            _robot.walk()
            _robot.run()
        }
```

可是，我們只想要同時執行 walk 和 run 這兩個實體方法，然而 Human 和 Robot 這兩個類別其實並沒有父子關係。 這時候就可以把這兩個類別同時定義一個協定\(protocol\)：

```swift
protocol AnimalProtocol{
    func run()
    func walk()
}
```

並且讓 Human 和 Robot 同時遵守這個協定：

```swift
class Robot:AnimalProtocol {...}
class Human:AnimalProtocol {...}
```

然後我們可以把原本的程式改為如下：

```swift
        var mHumen:[Human] = [Human(aName: "Wilden"),Human(aName: "Kevin"),Human(aName: "Nick")]
        var mRobots:[Robot] = [Robot(),Robot(),Robot()]
        for (_index,_robot) in enumerate(mRobots){
            _robot.id = "Robot\(_index)"
        }


        var mAnimals:[AnimalProtocol] = [mHumen[0],mHumen[1],mHumen[2],mRobots[0],mRobots[1],mRobots[2]]
        for _animal in mAnimals {
            _animal.walk()
            _animal.run()
        }
```

因為Human和Robot 都遵守AnimalProtocol協定，就算不是父子類別，仍然有run\(\)和walk\(\)。

