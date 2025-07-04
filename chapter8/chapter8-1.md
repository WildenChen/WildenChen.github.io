# 類型檢查和轉換

要理解多型，首先要理解資料類型和強制轉換\(Cast\)。

Swift 是一門標準且純粹的物件導向程式設計語言。Swift ㄧ切都是物件，而物件皆有其類型。

首先，每個物件都是其所屬類別的實例，從而可以説這個類別是它這也是狹義上的資料類型。

￼每個物件所屬類別都有其父類，而這些父類別也可以説 成是這個物件的資料型態。

實現了同一個協定\(Protocol\)類別的實例，也可以被看成屬於同種資料類型。至於協定，將在下一章詳細講述。

如何來判斷某個物件是否符合特定的資料類型呢？可以使用關鍵字 is 和 as 。

關鍵字 is 來判斷是否符合某種資料類型。如果符合，則返回 true，不符合，則返回 false。

下面範例中，用 is 能否正確判斷出各變數是否屬於 CGFloat 類型、String 類型、UIView 類型。

```swift
func checkDmeo(){
        var _first:CGFloat = 100.0
        var _second:String = "AAA"
        var _third:UIView = UIView()


        var _all = [_first,_second,_third] as [Any]

        for _item in _all {
            var _isCGFloat:Bool = _item is CGFloat
            var _isString:Bool = _item is String
            var _isUIView:Bool = _item is UIView
            print("\(_isCGFloat),\(_isString),\(_isUIView)")
        }
    }
```

## 基本型別轉型

```swift
    func castDemo(){
        var _spacing:CGFloat = 3.0
        var _buttonLineNum:Int = 5

        var _buttonWidth1:CGFloat = ( self.view.frame.width - 3 * 5 ) / 5
        var _buttonWidth2:CGFloat = ( self.view.frame.width - 3.0 * 5 ) / 5
        var _buttonWidth3:CGFloat = ( self.view.frame.width - _spacing * CGFloat(_buttonLineNum) ) / CGFloat(_buttonLineNum)
        var _buttonWidth4:CGFloat = ( self.view.frame.width - _spacing * _buttonLineNum ) / _buttonLineNum
    }
```

上述四種取得按鈕寬度的方式，我們所操作的型別都是 CGFloat，但是第一個按鈕寬度的取得，雖然運算內容填寫的是整數值，但是他會幫我們做轉型。

第二個，是整數和小數混編，他也會自動幫我們把3.0和5都轉型為CGFlot。

第三種，則是保持運算過程中，一律都是CGFloat的運算，並把Int 轉型為 CGFloat。

第四個，雖然也是整數和 CGFloat 的浮點數混編，可是因為我們給予了型別，整數Int就不會自動幫我們轉型，所以會出錯。

