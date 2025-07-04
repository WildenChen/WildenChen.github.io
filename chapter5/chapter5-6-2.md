# 下標\(進階\)\(待補\)

“\[ \]” 什麼時候用“\[ \]”存取屬性和方法呢？如果希望在執行時再決定使用哪個屬性或方法，就可以使用 "\[ \]" 下標運算子。 陣列就可以使用下標，來取得你指定位置的值，也可以修改值

```swift
var _array:[String] = ["a","b","c","d","e"]
_array[3]
// d
_array[3] = "8"
//8
```

進階用法 subscript 就是下標的意思。

```swift
struct TimesTable {
    let _multiplier: Int
    subscript(index: Int) -> Int {
        return _multiplier * index
    }
}

let _threeTimesTable = TimesTable(multiplier: 3)
print("six times three is \(_threeTimesTable[6])  threeTimesTable \(_threeTimesTable[1])")
//six times three is 18  threeTimesTable 3
```

未完

