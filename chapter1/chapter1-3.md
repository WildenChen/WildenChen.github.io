# 本章小節\(待補\)

透過簡單的輸出指令，就可以輸出你所輸入的東西。

但，並不是所有東西輸出都是看得懂的，有些輸出的會是記憶體位置。

* print class

```swift
class Father{
    var index:Int = 4
    fileprivate var mStr:String = ""

    private func set(aIndex:Int){
        index = aIndex
    }
}

print("Class is \(Father())")
// Class is SwiftThree.Father
```

* print struct

```swift
struct text {
    var text:String = ""
}

print("Struct is \(text())")
// Struct is text(text: "")
```

* print Optional

```swift
class Person {
    var residence: Int?
}
let _person:Person = Person()
print("Option is \(_person.residence)")
//Option is nil
```

