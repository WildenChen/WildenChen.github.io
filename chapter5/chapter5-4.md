# Class 和 Object 的建立與使用

先定義 Class \(類別\)，再建立該 Class 的實體。實體建立以後，才可以存取到實體屬性和實體方法。 Swift 中除了基本資料類型以外，其餘資料類型都是引用類型的。所有用戶自定義的 Class 也不例外，都屬於引用類型，透過引用來操作。

下面，詳細説明建立類別的步驟：

## 建立 Class

建立類別\(Class\)的順序如下：

1. 選定專案目錄下的專案名稱目錄，建立一個 \*.swift 文件，檔案名稱雖然和 Class 的名字無直接關聯，但通常會取名和 Class 名稱相同。例如 SampleClass.swift。
2. 在預設的檔案註解之下，寫入需要 import 的 framework 或是類別套件名稱。通常會使用 Foundation 與 UIKit。
3. 在 import 之下，寫入 class 關鍵字和類別的名字。如 class SampleClass{ }。如果需要使用其他的類別，則在 class 的括弧結束後，再添寫其他的 class。
4. 在 class 關鍵字後的括弧內寫入類別的定義。

```swift
//
//  MyObject.swift
//  OOP-First1
//
//  Created by Wilden on 2015/2/27.
//  Copyright (c) 2015年 Wilden. All rights reserved.
//

import Foundation

class MyObject {
    private var mName:String = "myObject"

    init(){

    }

    func doSomething(){
        print("\(mName).doSomething!!")
    }
}

// 長方形類別
class Rectangle {
    private var mArea   :Int = 0    // 面積
    private var mWidth  :Int = 0    // 寬
    private var mHeight :Int = 0    // 高

    init(aWidth:Int,aHeight:Int){
        mWidth = aWidth
        mHeight = aHeight
    }

    // 取得面積
    func getArea() -> Int{
        return mArea
    }

    // 計算面積
    func calculateArea(){
        mArea = mWidth * mHeight
    }
}
```

## 建立類別的實體

建立的方法如下。

1. 使用 import 關鍵字導入所需的套件。用法是在 import 後加上套件名稱。

   如：

   ```swift
   import UIKit
   ```

2. 類別名稱直接當成方法來執行該類別的構造函數，透過構造函數來實體化該類別。

   ```swift
   var _sampleObject1 = SampleCalss()
   var _sampleObject2:SampleCalss = SampleCalss()
   // 建議使用第二行較為嚴謹
   ```

上面實例中，\_sampleObject1 和 \_sampleObject2 都是 SampleCalss 的實體。但是，\_sampleObject1 在宣吿時沒有用「:」\(type運算子\) 宣吿物件的類型。一旦發生錯誤，編譯時不一定會出現錯誤。

\_sampleObject2 使用了「:」加 SampleClass 的類別名稱，宣吿自己是 SampleClass 類型。這種做法是大力推薦的，有助於編譯時查錯和 IDE 的提示。所以，不要偷懶，能加類型時，一定要加。

> 注意，許多人以為實體化一個類別就是類別名稱再加上\( \)，這是誤解。 其實是透過類別名稱去執行該類別的建構式而已。而建構式只是一種特殊的方法，即 init 的方法名稱。而且我們也可以透過建構式來做到某種特殊的設計模式 - 單例設計模式，之後再說明。

