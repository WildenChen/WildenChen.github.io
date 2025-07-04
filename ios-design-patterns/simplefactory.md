# 簡易工廠模式 - Simple Factory

從設計模式的類型來說，簡單工廠模式是屬於創建性模式，又叫做靜態工廠方法模式，但不屬於 GOF 設計模式之一，簡單的工廠模式是由一個工廠類別決定建立出哪一種產品類別的實體，簡單工廠模式是工廠模式家族中最簡單實用的模式，可以理解為是不同工廠模式的一個特殊實現。

那麼到底什麼是簡單工廠模式？

我們早上上班想要喝咖啡提神，Lion 咖啡滿足了我們的需求，這裡的 Lion 咖啡就是一個簡單的工廠，在現實生活中工廠是負責生產產品的，，同樣在設計模式中，簡單工廠模式我們也可以理解為負責生產對象的一個類別，我們平常開發中，當建構一個實體時，此時該類別就依賴與這個實體，也就是她們之間的耦合度高，當需求變化時，我們就不得不去修改此類別的原始碼，此時我們可以運用 OOP 很重要的原則去解決這一問題，該原則就是封裝改變，自然也就要找到改變的原始碼，然後把改變的原始碼用類別來封裝，這樣的一種思路也就是我們簡單工廠模式的實現方式了。

```swift
import Foundation

class LionCoffee {
    static func createAmeraCoffee() -> LionCoffee {
        return LionCoffee(aType: "美式咖啡")
    }

    static func createNateaCoffee() -> LionCoffee {
        return LionCoffee(aType: "拿鐵咖啡")
    }

    static func createMoTeaCoffee() -> LionCoffee {
        return LionCoffee(aType: "抹茶咖啡")
    }

    private var mType:String
    init(aType:String){
        mType = aType
    }
}
```

