# 函數進階使用技巧\(待補\)

## 内嵌函數

可以在一個函數裡面在加入另一個函數，而加入進去的函數外面無法調用，有點類似私有函數。目前實務上不常使用。

```swift
func chooseStepFunction(backwards: Bool) -> (Int) -> Int {
    func stepForward(input: Int) -> Int { 
    return input + 1
    }
    func stepBackward(input: Int) -> Int {
    return input - 1 
    }
    return backwards ? stepBackward : stepForward
}
var currentValue = -4
let moveNearerToZero = chooseStepFunction(backwards:currentValue > 0)
while currentValue != 0 {
    print("\(currentValue)... ")
    currentValue = moveNearerToZero(currentValue)
}
print("zero!")
//--- -4... 
//--- -3... 
//--- -2... 
//--- -1... 
//zero!
```

