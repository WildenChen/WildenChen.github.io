# 如何使用委派模式

我們先新建一個檔案`PhotoViewDelegate.swift`， 裡面內容如下：

```swift
import UIKit
protocol PhotoViewDelegate {
    func onTouchUpInside(aTouchendPoint:CGPoint)
}
```

然後，在 `PhotoView` 這個類別裡面，宣告一個變數，存取權限為 internal。

```swift
var delegate:PhotoViewDelegate?
```

再添加以下內容：

```swift
override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        let _touch:UITouch = touches.first!
        let _touchendPoint:CGPoint = _touch.location(in: self)
        if _touchendPoint.x > 0 && _touchendPoint.x < self.bounds.width && _touchendPoint.y > 0 && _touchendPoint.y < self.bounds.height {
            self.delegate?.onTouchUpInside(aTouchendPoint: _touchendPoint)
        }
    }
```

我們在 `MainViewController` 上試驗看看我們剛剛所完成的程式：

```swift
class MainViewController: UIViewController,PhotoViewDelegate {

    func onTouchUpInside(aTouchendPoint: CGPoint) {
        print("onTouchUpInside:\(aTouchendPoint)")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.white

        let _photoView:PhotoView = PhotoView()
        _photoView.frame = CGRect(x:10.0, y:10.0, width:100.0,height: 100.0)
        self.view.addSubview(_photoView)
        _photoView.delegate = self
    }
    //以下略
```

委派，是透過協定來定義好會用到的函數與變數以後，再用一個公開存取的變數`delegate`讓其他的類別可以做這個實體的商業邏輯的操作。

委派在網路上有許多不同的解釋與說明：

* 委派是可以安全封裝方法的類型。
* 類似於 C 和 C++ 中的函式指標。
* 委派的類型由委派的名稱所定義。
* 委派是一種類型，代表具有特定參數清單和傳回類型的方法參考。
* 一個 class 讓別的 class 呼叫。
* 在撰寫類別的時候，就能夠呼叫非實體的函式。
* 「委派」想像是事件與事件處理函式中間的一個「跳板」。
* 在設計類別時，不想將這部份的處理寫死在類別裡，將這個部分事先提供一個函式讓其他類別呼叫（callback\)。

以上這些說明，都是豪洨的說明而已，如果認真去思考上述的解釋，你就輸了！

委派只是一種設計模式，設計模式只是一種被規範好的程式撰寫的寫法而已。用最簡單的方式去說明：

> 委派只是一個 Object 物件而已。

再更進一步說明：

> 委派只是一個有協定或是介面的物件，而且這物件的變數名稱命名叫做 delegate。

委派，就只是上述這樣而已。

明白委派只是一個物件之後，再去思考委派可以做什麼？

delegate 中文叫做委託/委任/委派，通常會用在 class 內部把一些事件處理「委派」給別人去完成。 委派兩字講的好聽是拜託別人做事，講白一點就是自己不想做或不會做，所以外包出去叫別人做。

但是，就算是要叫別人做也不能隨便找一個路人就可以，舉個例子，我想要把「撰寫 Lua 程式」這件事委派給別人，要有能力處理這份工作的人至少得知道 Lua 程式怎麼寫。

那要判斷對方是否有「能力」來接受我的委派，就是問這個被委派的人是否有符合 \(Conform\) 我訂的條件 \(Protocol\) ，然後這個條件就跟面試新人一樣，某些技能是必須的 \(Required\) ，但其它條件是非必須的 \(Optional\) 。

> 讓其他類別實體可以透過這個委派物件做事情。

完成到這一步的Demo：

* 查看原始碼
* [下載ZIP](https://github.com/wildenchen/swift-bethel-of-the-road/tree/eed3c8ff6c1141681b3d3b2c69fac406cd11c24c/DesignPatterns/workspaces/FlickrPhotos-Delegate.zip)

