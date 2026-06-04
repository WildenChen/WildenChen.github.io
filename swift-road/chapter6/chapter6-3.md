---
title: "套件與命名空間"
---

# 套件與命名空間

Objective-C一個一直以來令人詬病的地方就是沒有命名空間，在應用開發時，所有的代碼和引用的靜態庫最終都會被編譯到同一個域和二進制中。這樣的後果是一旦我們有重複的類名的話，就會導致編譯時的衝突和失敗。為了避免這種事情的發生，Objective-C的類型一般都會加上兩到三個字母的前綴，比如Apple保留的NS和UI前綴，各個系統框架的前綴SK \(StoreKit\)，CG \(CoreGraphic\)等。

在 Swift 中，由於可以使用命名空間了，即使是名字相同的類型，只要是來自不同的命名空間的話，都是可以和平共處的。

和 C\# 這樣的顯式在文件中指定命名空間的做法不同，Swift 的命名空間是基於 module 而不是在程式中直接指明，每個 module 代表了 Swift 中的一個命名空間。也就是說，同一個 model/target 裡的類型名稱還是不能相同的。

在我們進行 app 開發時，預設添加到 app 的主 target 的內容都是處於同一個命名空間中的，因為 Xcdoe 的 target 會把我們 app 開發的專案來當作一個 module，也就是一個 framework。

> > module 的意思指的是一個模組，但是在基於 Xcode IDE 下使用 Swift 開發應用程式時，module 同時表示一個 App，而 App 的名稱即為命名空間\(namespace\)的名稱。而package這個概念是在其他 OOP 語言中才有的，但是意義上其實是一樣的。
>
> 我們說一個套件 \(package\) 或是命名空間 \(namespace\) 或是一個模組 \(module\) 或是一個 target 時，指的都是同一種意義。

```swift
// LionPortal-Bridging-Header.h

#import <AFNetworking/AFNetworking.h>
#import "AESHelper.h"
#import <CommonCrypto/CommonCryptor.h>
#import "MBProgressHUD.h"
#import "PasscodeCoordinator.h"
#import "PasscodeViewController.h"
#import "RMUniversalAlert.h"
#import "Flurry.h"
```

## 實現其他語言中的 namespace 方法

```swift
struct MyClassContainer1 {
    class MyClass {
        class func doSomething() {
            print("from MyClassContainer1")
        }
    }
}

struct MyClassContainer2 {
    class MyClass {
        class func doSomething() {
            print("from MyClassContainer2")
        }
    }
}
MyClassContainer1.MyClass.doSomething()
MyClassContainer2.MyClass.doSomething()
```

