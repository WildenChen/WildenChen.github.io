# if-else

條件判斷的一種，可以與運算子還混合使用。

```swift
let _sex:Int = 0 // 0女 1男
let _firstId:String = "F"

if _sex == 0 && _firstId == "F"{
  print("女")
}else{
  print("男")
}
```

不推薦下列用法，如果真的有許多條件要判斷，筆者建議可以使用 switch。

```swift
let _age:Int = 18

if _age == 18 {
  print("18 years")
}else if _age == 30{
  print("30 years")
}else if _age == 50 {
  print("50 years")
}else if _age == 70 {
  print("50 years")
}else{
  print("\(_age) years")
}
```

```swift
  switch _age {
   case 18 :
       print("18 years")
   case 30 :
       print("30 years")
   case 50 :
       print("50 years")
   case 70 :
       print("70 years")
   default:
       print("\(_age) years")
 }
```

