# 方法重載

## 函數重載的概念

函數的重載指的是多個函數享有相同的名字都是有不同的參數或返回值類型不同，它們互相成為重載關係，

> > Swift函數的參數類型包含了參數列表類型和返回值類型，例如\(Double,Double\)-&gt;Double 是由兩個 Double 類型參數列表和 Double 類型的返回值類型構成，也就是說 Swift 中函數名稱相同，參數列表不同或者返回值類型不同的函數都可以構成重載。
> >
> > 而在 C++ 或者 JAVA 中，函數的重載只是與參數列表有關係，與返回值沒有關係。
> >
> > 但是在 Swift 1.2 之後的更新，如果使用到 UIKit 或是繼承自 Objective-C 的類別時，重載的參數列表就不能只靠參數類型獲釋返回值不同來撰寫，會導致編譯錯誤。

```swift
class Phone{
    var phoneNumber:String
    init(aPhoneNumber:String){
        phoneNumber = aPhoneNumber
    }

    func setSomething(){

    }

    func doSomething(aAction:Int){ 

    }

    func doSomething(aAction:String){

    }

    func doSomething(aAction:String)->Bool{
        return true
    }
}
```

### 建構式重載，覆寫，與便利建構式

```swift
class Phone{
    var phoneNumber:String
    init(aPhoneNumber:String){
        phoneNumber = aPhoneNumber
    }
}

class AppleDevice: Phone {
    override init(aPhoneNumber: String) {
        super.init(aPhoneNumber: aPhoneNumber)
    }

    init(aNumber:Int){
        super.init(aPhoneNumber: "\(aNumber)")
    }

    convenience init(){
        self.init(aPhoneNumber: "")
    }
}
```

建構式雖然有重載的功能，但是每個重載的建構式都必須要執行父類別的建構式，即 super.init\(\)。

如果已經在原本的類別中寫好相對應的建構方法，想透過重載來簡化更簡單的建構方式，或是想增加額外功能，需要執行原本子類別的其他建構式時，則透過 convenience 關鍵字即可執行 self.init\(\)。

