# 陣列與迴圈\(待補\)

* 陣列

  ```swift
    var _array:[String] = [String]()//宣告一個字串空陣列
    var _array2:[String] = [String](repeating: "5", count: 10)//宣告一個數量10 ，內容都為字串5的陣列
    _array.append("one")//新增"one"字串
    _array.removeAll()//移除陣列內所有字串
    _array.remove(at: 0)//移除第0筆字串
    _array.insert("5", at: 0)//新增指定字串到指定位置，不能超過陣列數量範圍
  ```

* 迴圈

```swift
 for _index in 0..<10{
   print("_index \(_index)")
   //run 10次，輸出0~9
 }
```

宣告一個字串陣列mArray，然後利用for-in迴圈來遍歷陣列裡的字串。

```swift
private let mArray:[String] = ["One","Two","Three"]

for _index in 0..<mArray.count{
  print("str is \(mArray[_index]), \(_index)")
}
   // str is One, 0
   // str is Two, 1
   // str is three, 2
or
mArray.forEach { (aStr:String) in
    print("str is \(aStr)")
   }
   // str is One
   // str is Two
   // str is three
```

