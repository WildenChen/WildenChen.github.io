---
title: "類別的存取控制"
---

# 類別的存取控制

在 Swift 中，除了類別成員有存取控制外，類別本身也有存取控制。換句話説，類別也有存取許可權。

不過類別的存取許可權比類別成員要簡單很多，雖然一樣有五個存取權限控制，套件內存取的存取控制字元依然是 internal，也是預設的存取控制字元。

公開的存取控制字元依然是 public 和 open。但是只會有該類別是否只給予該類別或是該檔案存取而已。甚至在單一專案開發之中，也幾乎不會用到類別的存取控制，真正會用到的，可能只有少數需要照設計模式下實現的幾種方法而已。

## Singleton 實現

```swift
class LPMainModel{
    private struct SingtonStatic{
        static var Instance:LPMainModel?
    }
    class func getInstance()->LPMainModel{
        if(SingtonStatic.Instance == nil){
            SingtonStatic.Instance = LPMainModel()
        }
        return SingtonStatic._instance!
    }
    private init(){ }
}
```

