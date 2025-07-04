# 什麼是委派

delegate 中文叫做委託/委任/委派，通常會用在 class 內部把一些事件處理「委派」給別人去完成。 委派兩字講的好聽是拜託別人做事，講白一點就是自己不想做或不會做，所以外包出去叫別人做。

但是，就算是要叫別人做也不能隨便找一個路人就可以，舉個例子，我想要把「撰寫 Lua 程式」這件事委派給別人，要有能力處理這份工作的人至少得知道 Lua 程式怎麼寫。

那要判斷對方是否有「能力」來接受我的委派，就是問這個被委派的人是否有符合\( Conform \)我訂的條件\( Protocol \)，然後這個條件就跟面試新人一樣，某些技能是必須的\(Required\)，但其它條件是非必須的\( Optional \)。

以上是網路上有人提的較淺顯易懂的例子，筆者借來引用。

然而，無論是書本定義得更抽象的意義，或是上述叫淺顯的說明，還是容易讓人覺得有理解上的門檻。

筆者建議初學者只要這樣理解即可，委派其實只是一種設計模式，只是一種程式的寫法，只是 OOP 的一種應用而已，各位不需要想得太過於複雜。其實，Delegate 只是一個名字叫做 delegate 的一個物件而已，而這個物件需要遵守協定。

```swift
protocol HumanActionProtocol{
    func acting()
    func readBooking(aBook:Book)
    func enjoyWithSonging(aSong:Song)
    func telling()
}
```

```swift
// 複合類別：Human，複合了嘴眼耳腦四個類別物件
class Human {
    private var mName   :String
    var name:String{
        return mName
    }
    private var mMouth  :Mouth  = Mouth()
    private var mEye    :Eye    = Eye()
    private var mEar    :Ear    = Ear()
    private var mBrain  :Brain  = Brain()
    var brain:Brain{
            return mBrain
    }

    var delegate:HumanActionProtocol?

    init(aName:String){
        mName = aName
    }

    func readBook(aBook:Book){
        mEye.read(aBook)
        mBrain.remember(mEye.info)
        delegate?.readBooking(aBook)
    }


    func enjoyWithSong(aSong:Song){
        mEar.hear(aSong)
        mBrain.remember(aSong.content)
        delegate?.enjoyWithSonging(aSong)
    }

    func tell(){
        mMouth.speak("\(mName) : \(mBrain.memory)")
        delegate?.telling()
    }

}
```

委派就只是有一個實體物件，而且這個實體物件要去實踐該協定：

```swift
class ViewController:UIViewController {
    private var _man:Human = Human(aName: "Wilden")
    override func viewDidLoad() {
        _man.delegate = HumanDelegate()
    }
}


class HumanDelegate: HumanActionProtocol {
    func acting(){
        println("HumanDelegate.action")
    }

    func readBooking(aBook:Book){
        println("HumanDelegate.readBooking")
    }

    func enjoyWithSonging(aSong:Song){
        println("HumanDelegate.enjoyWithSonging")
    }

    func telling(){
        println("HumanDelegate.telling")
    }
}
```

然而，既然協定本身只是一個規則，當然任何類別都可以當委派對象，只要有去遵從該協定即可，當然連自己或是外部類別的任何實體都可以當委派對象。

```swift
import Foundation
import UIKit

class ViewController:UIViewController,HumanActionProtocol {
    private var _man:Human = Human(aName: "Wilden")
    override func viewDidLoad() {
        _man.delegate = self
    }

    func acting(){
        println("viewController.action")
    }

    func readBooking(aBook:Book){
        println("viewController.readBooking")
    }

    func enjoyWithSonging(aSong:Song){
        println("viewController.enjoyWithSonging")
    }

    func telling(){
        println("viewController.telling")
    }
}
```

## 怎麼使用委派

上述只是帶大家理解何謂委派而已，而實際上 iOS 開發中，我們會常常用到委派，但是卻很少自己定義委派。若無法徹底理解不需要過於擔憂，只要會用即可。

```swift
在 UITableView 時會再操作一次。
```

