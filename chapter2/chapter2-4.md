---
title: "基本資料型別"
---

# 基本資料型別

Swift 中預定義的基本資料型別一共有：Int、Float、Double、Bool、String等，以下為大家介紹常用的資料型別。

## Int:可使用於整數運算

```swift
  let _one:Int = 1
  let _two:Int = 2
  let _three:Int = _one + _two
  //3
```

## Float、Double:帶有小數點的數目，可以處理較大的數字運算

* Double:儲存高精準度的浮點數，約15位數字

  在實作上，常用實際算面積。

* Float:儲存經度不高的浮點數，約6位數字。

## Bool:布林值，判斷真假

```swift
  let _isWork:Bool = true
  if _isWork {
    print("isWork")
  }
```

## String:文字，又稱字串，可以輸入想要的文字

```swift
  let _myName:String = "Sheila"
  print("MyName is \(_myName)")
  //MyName is Sheila
```

