# 運算子，運算式及應用

## 運算式是由運算子和運算元所組合起來的。

a + b = c 就是一個典型的運算式，而 a、b、c 是運算元，+、= 是運算子。

運算子，有分為算術運算子\(+ 、 - 、 \* 、 / \)、邏輯運算子\(\|\| 、 && 、 !\)、餘數運算子\(%\)、指定運算子\(=\)、比較運算子\(&gt;、&lt;、==、!=、&gt;=、&lt;=\)

## 指定運算子:又稱賦值運算子，將某個變數或常數指定你要的內容

```swift
  let _one:Int = 0
  var _name:String = "Name"
```

## 算術運算子:也就是四則運算

```swift
  1 + 2 // 3
  1 - 2 // -1
  1 * 2 // 2 
  1 / 2 // 0
```

## 比較運算子:用來比較運算元，成立 true ，不成立 false。

```swift
  1 > 2  // false
  1 >= 2 // false
  1 < 2  // true
  1 <= 2 // true
  1 == 2 // false
  1 != 2 // true
```

## 邏輯運算子:可與比較運算子結合使用，成立 true ，不成立 false。

```swift
  if 2 > 1 && 2 >= 1 {
    print("2 > 1")
  }else{
    print("2 <= 1")
  }
```

## 餘數運算子: 取得餘數

```swift
  3 % 2 
  // 1，3 / 2 = 1...1
```

## 三元運算子

是簡化 if 得判對敘述。推薦使用。

```swift
判斷 ? A1 : A2
```

判斷成立執行 A1 反之執行 A2。

### 應用

當然不只可以做算術運算，也可以對物件做比較。什麼是物件，在第五章就會提到。

宣告一個圓形 \(Circle\) 和長方形 \(Rectangle\) 的物件，接著各產生一個實體。

```swift
class Circle: UIView {
    private var mColor:UIColor = UIColor.red

    override func layoutSubviews() {
        self.backgroundColor = mColor
    }

    override func draw(_ rect: CGRect) {
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

    override func draw(_ rect: CGRect) {
        self.layer.borderColor = UIColor.black.cgColor
        self.layer.borderWidth = 1.0
    }
}

let _circle:Circle = Circle()
let _rectangle:Rectangle = Rectangle()

if _circle == _rectangle {
    print("_circle == _rectangle")

  } else {
    print("_circle != _rectangle")
}
```

