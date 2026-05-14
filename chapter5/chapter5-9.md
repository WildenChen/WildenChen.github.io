---
title: "實體引用和值複製\(待補\)"
---

# 實體引用和值複製\(待補\)

```swift
class ModelClass {
    var index:Int = 0
}

struct ModelStruct {
    var index:Int = 0
}
```

```swift
   var _modelClass:ModelClass = ModelClass()
     _modelClass.index = 999
     var _modelClass2:ModelClass = _modelClass
     print("_modelClass2.index = \(_modelClass2.index)")
     // 999
     _modelClass2.index = 111
     print("_modelClass.index = \(_modelClass.index)")
     // 111

   var _modelStruct:ModelStruct = ModelStruct()
     _modelStruct.index = 999
     var _modelStruct2:ModelStruct = _modelStruct
     print("_modelStruct2.index = \(_modelStruct2.index)")
     // 999
     _modelStruct2.index = 111
     print("_modelStruct.index = \(_modelStruct.index)")
     // 999
```

從上列程式碼，可以看出如果物件是 class 的話，雖然是不同實體，但是改到的卻是同一個，所以 class 是實體引用。

反之如果物件是 struct 的話， 可以發現就算改了\_modelStruct 的 index ，輸出的值還是剛才 \_modelStruct 的 index ，所以\_modelStruct2 只是複製\_modelStruct 的值而已，所以struct 是值複製。

