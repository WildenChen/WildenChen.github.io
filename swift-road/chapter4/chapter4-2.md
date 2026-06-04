---
title: "參數\(待補\)"
---

# 參數\(待補\)

```swift
func setName(aName:String){
  print("name is \(aName)")
}

setName(aName:"Sheila")
//name is Sheila
```

上面的函數括弧裡的 aName，就是這個函數的參數，而函數可以利用該參數做相對應的事情。 參數不一定只能傳基本型別，也可以傳入一個複雜型別或函式

```swift
func setName(aFunc:()->void){
}

func onTouchUp(){

}

setName(aFunc: onTouchUp)
```

當你傳入的是一個複雜型別時，如自定義的 class ，對這個 class 所做的更改都會直接影響到原本的 class 。

自定義一個 class ， 裡面有個初始值為 test 字串的 String。

```swift
class Base{
    var test:String = "test"
}

private func setTest(aBase:Base){
   aBase.test = "Swfit"
}

private let mBase:Base = Base()

print("mBase.test is \(mBase.test)")
// mBase.test is test
setTest(aBase:mBase)
print("mBase.test is \(mBase.test)")
// mBase.test is Swift
```

