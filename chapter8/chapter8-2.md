# 上下轉換

使用 is 和 as 判斷類型時，會發現一個物件可以看成屬於自身類別的資料類型，也可以看成屬於自己所有父類別的類型。

在程式碼編寫中，如果把一個物件當成它的父類別物件來使用，就稱為向上轉換\(upcasting\)。

在實際程式開發中，經常見到一個接受傳入父類別物件的方法或者函數，可以接受子類別物件，似乎編譯器「忘掉」了類型檢查一樣。

這種將子類別物件當成父類別物件使用的轉換機制是安全的。因為只要是父類別的對外可見的方法，都會被子類別繼承。

一個父類別可以調用的方法，必然也可以在其子類別物件上調用。來分析一下，父類別被子類別繼承的方法無非有被覆寫和不被覆寫兩種而已。至於覆寫\(override\)機制要求所有被覆寫的方法其存取控制、參數類型、返回類型都要一致，本身也確保了父類別被覆寫的方法在使用方式上和子類別一致，不被覆寫的方法，則是自動預設繼承父類別的，會和父類別一樣。

## 簡述里氏代換原則

使用父類別物件的地方，一定可以適用於其子類別物件，而不會感到使用方式上有什麼區別。這就是里氏代換原則\(Liskov Substituion Principle,LSP\)的主要意義。

向上轉換是里氏代換原則的必備前提，里氏代換原則是繼承複合的基石，只有子類別物件才可以真正替換掉父類別物件，程式功能不受影響，使父類別達到真正的複用。利用子類別不斷地在父類別基礎上增加新的行為。

里氏代換原則準確描述：在一個程式中，將所有類型為 A 的物件，都換成類型為 B 的物件，而程式的行為沒有變化，那麼類型 B 是類型 A 的子類型。注意，這裡的類型不僅僅指類別\(Class\)，也包括協定。

但里氏代換原則反過來不能成立，即使用子類別物件的地方，不一定能替換成父類別物件。

## 向上轉換\(Upcasting\)的程式碼實例

有三個自定義的圖形繪製類別。

一個是父類別 UIView，其餘圖形類別 Circle 和矩形類別 Rectangle 都是 UIView 的子類別。

在 MainViewController 中有一個實體方法 randomDisplayView\(\)，用來將 UIView 類型物件在畫面上隨機擺放位置。

注意 — 接受類型是 UIView 類型。

結果，我們在 MainViewController 的 viewDidLoad 函數中，透過執行時亂數，隨機建立 Circle 類別和 Rectangle 類別的物件，並傳給 randomDisplayView。我們會發現，randomDisplayView 明明要求 UIView 類型物件，卻完全接受 Circle 類別物件和 Rectangle 物件，程式列不受影響。

這就是向上轉型的常見使用之一，使用寬鬆的父類別介面來接受執行產生的不同的子類別物件。

執行完畢後，在螢幕上會建立一百個隨機擺細圓形和矩形

```text
class Circle: UIView {
    private var mColor:UIColor = UIColor.red

    override func layoutSubviews() {
        self.backgroundColor = mColor
    }

    override func drawRect(rect: CGRect) {
        self.layer.cornerRadius = rect.width / 2.0
        self.layer.masksToBounds = true
        self.layer.borderColor = UIColor.black.cgColor
        self.layer.borderWidth = 1.0
    }
}

class Rectangle: UIView {
    private var mColor:UIColor = UIColor.green

    override func layoutSubviews() {
        self.backgroundColor = mColor
    }

    override func drawRect(rect: CGRect) {
        self.layer.borderColor = UIColor.black.cgColor
        self.layer.borderWidth = 1.0
    }
}
```

```swift
    override func viewDidLoad() {
        super.viewDidLoad()
        let _totals:Int = 100
        for _index in 0..<_totals {
            if(arc4random_uniform(2) == 0){
                var _circle:Circle = Circle()
                randomDisplayView(aView:_circle)
                self.view.addSubview(_circle)
            }else{
                var _rectangle:Rectangle = Rectangle()
                randomDisplayView(aView:_rectangle)
                self.view.addSubview(_rectangle)
            }
        }
    }

    func randomDisplayView(aView:UIView){
        let _showRect:CGRect = self.view.frame
        let _x:CGFloat = CGFloat(arc4random_uniform(UInt32(_showRect.width)))
        let _y:CGFloat = CGFloat(arc4random_uniform(UInt32(_showRect.height)))
        let _width:CGFloat = CGFloat(arc4random_uniform(100))
        let _height:CGFloat = (aView is Circle) ? _width :CGFloat(arc4random_uniform(100))
        aView.frame = CGRect(x: _x, y: _y, width: _width, height: _height)
    }
```

## 向下轉換\(Downcasting\)

向下轉換，英文為 「Downcasting」，一看就明白和向上轉換是相反的意思。

向上轉換，是將子類別的物件當成父類別的物件來使用。那向下轉換是將父類別的物件當成子類別的物件來用嗎？

當然不是。向下轉換的意思是，當一個子類別物件以資料類型使用時，可以將它再還原成子類別物件。

注意，向上轉換是安全的，向下轉換是不安全的。如果一個物件只是父類別的實體，而不是子類別的實體，那麼將它向下轉換成子類別物件是不能成功的，只會獲得空值 nil 或是因為 nil 報錯。

## 向下轉換的方法

使用剛剛介紹過的 as 關鍵字，如下所示。

```swift
    func randomDisplayView(aView:UIView){
        let _showRect:CGRect = self.view.frame
        let _x:CGFloat = CGFloat(arc4random_uniform(UInt32(_showRect.width)))
        let _y:CGFloat = CGFloat(arc4random_uniform(UInt32(_showRect.height)))
        let _width:CGFloat = CGFloat(arc4random_uniform(100))
        let _height:CGFloat = (aView is Circle) ? _width :CGFloat(arc4random_uniform(100))
        aView.frame = CGRectMake(_x, _y, _width, _height)


        var _circle:Circle? = aView as? Circle
        if _circle == nil {
            print("aView is Rectangle")
        }
    }
```

