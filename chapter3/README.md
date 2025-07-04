# 第三章 Swift 流程控制

當符合某條件的時候，就會做相對應的事情。

簡單來說，流程控制就像演唱會入場一樣，工作人員會幫你檢查票券，持 VIP 券的走 VIP 道、持 A、B 區券的走 A 道、持 C、D、E 券的走 B 道以此類推。

在 Swift 中有 for-in 、 while 、條件語句...等

## for-in 迴圈

遍歷一個範圍、陣列或字串符裡的內容

```swift
for _index in 0..<9{
  print("_index \(_index)")
}
//也可寫做
(0..<9).forEach { (aIndex:Int) in
     print("aIndex \(aIndex)")
}
let _array:[String] = ["a","b"]

for (_index,_str) in _array.enumerated() {
   print("_index \(_index), _str \(_str)")
}
```

## while 迴圈

swift 提供兩個 while 迴圈

* while 會先判斷條件，再開始做事。

```swift
  var _count:Int = 0
  while _count < 5 {
    _count = _count + 1
  }
  print("_count \(_count)")
```

* repeat-while 也就是do-while 會先做事，再判斷條件。

```swift
 repeat{
    _count = _count + 1
     print(" --- \(_count)")
    }while _count < 5
     print("_count \(_count)")
    //--- 1
    //--- 2
    //--- 3
    //--- 4
    //--- 5
    // _count 5
```

## 條件語句

* if-else:

  ```swift
  let _one:Int = 1
  if _one > 0{
    // Do SomeThing
  }else{
    // Do SomeThing
  }
  ```

* switch:

```swift
let _name:String = "Sheila"

switch _name{
  case "Sheila":
    print("Sheila")
  case "Amy":
    print("Amy")
  default:
    print("error Name")
 }
```

