# get 與 set\(待補\)

get 和 set 方法是成員屬性存取方法，通常透過它們更改私有類別成員。

其他書籍中往往將 get 和 set 作為類別定義的語法來講述。筆者以個人各種程式語言撰寫的經歷認為 get 和 set 其實是封裝的一種表現形式。而且使用 get 和 set 方法具有一些優勢，如能夠讓你建立可以像存取屬性一樣的具有完善功能的成員。它們還允許你建立唯讀屬性。從這個意義上説，也具備了獨特的存取控制能力。

get 和 set 在本質上是實體方法，只不過在類別外部將 get 和 set 方法作為屬性來存取。類別的外部屬性可以與類別的內部屬性具有不同的名稱。

## get 和 set 的實例

```swift
    private var mID:String = ""
    var ID:String{
        set(value){
            mID = value
        }
        get{
            return mID
        }
    }
```

## 標準的 get 和 set 方法的要點

* get 方法，必須要有一個返回值。
* set 方法，一定要有參數。

```swift
    var introSkip:Bool{
        set(value){
          introSkip = value
        }
        get{
            return false
        }
    }
```

## set 與 get 的另一種解釋

set 與 get 對於初學者來說，常常分不清什麼是 set 什麼是 get，筆者建議，可以用之前已經熟悉學會的實體方法 來理解，也更能夠幫助上述所提的要點的記憶。

可以把 set 與 get 來當作兩種不同的特殊的實體方法。

```swift
    private var mBrain  :Brain  = Brain()
    var brain:Brain{
        set(value){
            mBrain = value
        }
        get{
            return mBrain
        }
    }

    // 這個就是 set 方法，一定要有參數。
    func setBrain(value:Brain){
        mBrain = value
    }

    // 這個就是 get 方法，必須要有一個返回值。
    func getBrain()->Brain{
        return mBrain
    }
```

## 何時使用 get 和 set 方法

對於初學者而言，一般不太理解為什麼會有 get 和 set 方法的出現。簡單解釋，這主要是封裝思想的實現。有些 OOP 流派認為，將屬性直接暴露給外部是很不好的做法，主張全部透過 get 和 set 方法來存取屬性。OOP 慣例也不提倡直接存取類別內的屬性。

使用 get 和 set 方法的優點如下。

* 隱藏了類別的實現細節。
* 在 get 和 set 方法中可以插入額外的程式碼邏輯，比較靈活， 易於日後修改和擴展。

但是應注意，不要過度使用 get 和 set 方法，其中一個原因是在特定情況下不利於程式碼維護。而且 get 和 set 方法畢竟也是間接提供了對內部成員的存取。

如果發現一個類別中有過多的 get 和 set 方法，則説明該類別有過多細節暴露，要反思自己的類別設計是否恰當。

```swift
  var index:Int = 99
    set(value){
      index = value
    }
    get{
      return index
    }
```

## willSet  didSet  willGet  didGet 方法

它可以幫助實體屬性在存取之前或是存取後的時機點去架構相關邏輯，可是因為他有兩個必要條件，反而在實際專案上用到的機會不多。 1. 使用時 will 與 did 必須同時存在，而使用 will 與 did 來控制實體屬性時，set 與 get 不能同時使用。 2. 使用的 will 與 did 實體屬性必須賦值或是可選空值。

暫略，現階段幾乎不會用到

```swift
    var index:Int = 999{
        willSet(value){
            print("model.index willSet:\(value)")
        }
        didSet(value){
            print("model.index didSet:\(value)")
        }
    }
```

