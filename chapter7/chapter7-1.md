# 如何實現複合

複合的原理是在新建立的類別中有一個或多個物件的引用，而這些物件就是現有類別的實體。注意，現有類別一般不是基本資料類型，是複雜資料類型。

在實際程式設計中，使用複合的頻率要遠遠超過繼承。對於 OOP 新手而言，要慎用繼承，勤用複合。有些極端 OOP 人士推崇複合，憎恨繼承，聲稱繼承是「邪惡的」，一切都是複合。

雖然是極端之言，但在實際使用中，複合確實比繼承靈活，而且更加易於管理。因此建議如果還是不明白何時用複合，何時該用繼承，`那麼優先考慮複合`。

## 複合實作

有一個複合類別 `Human` 類別\(人\)。Human 類別中組合了 `Ear` 類別物件\(耳\)、`Eye` 類別物件\(眼\)、`Brain` 類別物件\(腦\)和 `Mouth` 類別物件\(嘴\)。就像我們人有耳朵、眼睛、大腦、嘴巴一樣。

還有兩個獨立的類別：一個是書 -- `Book` 類別，另一個是歌 -- `Song` 類別。

眼睛可以看書，耳朵可以聽歌，嘴巴可以説話。但是，這書和歌這兩種物件是不能直接被 Mouth\(嘴\)物件理解的，只有書和歌的內容轉成字串形式的資訊，才能被 Mouth 物件理解，所以單個的 Mouth 類別物件是無法説出書或歌的內容的。

但是 Human 類別物件就可以了。Human 類別組合了 Eye 類別物件，Eye 類別物件可以看書。組合了 Ear 類別物件，Ear 類別物件可以聽歌。由 Brain 類別\(大腦類別\)物件記住眼睛和耳朵返回的資訊,然後嘴就可以説出來了。一加一遠遠大於二，透過組合的物件互相協作，從而完成單個物件所不能完成的事情,正是複合的巨大優點之一。

下面的程式碼雖稍長挺非常易讀，無非三大塊。

* 文件類別 SampleComposition：初始化 Human 類別物件，並讓 Human類別物件做些事情。
* 複合類別 Human：組合了眼、耳、腦、嘴四個類別的物件，並新建了三個對外介面，即讀書、聽歌、説話。
* 四個被複合的類別：眼、耳、腦、嘴。
* 兩個獨立的類別：書和歌，用來建立書和歌的物件。

從複合開始，物件導向思想的巨大威力慢慢顯示出來。請體會各個類別之間的分工，以及這些類別在複合類別 Human 中的協作。

也請大家注意被複合類別的封裝設計：

* 被複合類別的對外類別成員存取控制往往設為 private 級別，只對類別內可見。
* 複合類別對外介面往往是 internal 的。這也是模組思想的一個體現。

```swift
// 嘴：擁有對外介面 speak()
class Mouth{
    func speak(aMsg:String){
        print("Mouth speak:\(aMsg)")
    }
}

// 眼：擁有對外介面 read(),可以接受 Book 類別的物件，並理解成 info
class Eye {
    var info:String = ""
    func read(aBook:Book){
        info = aBook.content
    }
}

// 耳：擁有對外介面 hear(),可以接受 Song 類別的物件，並理解成 info
class Ear {
    var info:String = ""
    func hear(aSong:Song){
        info = aSong.content
    }
}

// 腦：擁有對外介面 remember(),儲存字串資訊
class Brain {
    var memory:String = ""
    func remember(aMsg:String){
        memory = aMsg
    }
}

// 書
class Book {
    var content:String = "The content of a book!"
}

// 歌
class Song{
   var content:String = "The content of a vodeo!"
}

// 複合類別：Human，複合了嘴眼耳腦四個類別物件
class Human {
    private var mName:String
    private var mMouth:Mouth = Mouth()
    private var mEye:Eye = Eye()
    private var mEar:Ear = Ear()
    private var mBrain:Brain = Brain()

    init(aName:String){
        mName = aName
    }

    func readBook(aBook:Book){
        mEye.read(aBook)
        mBrain.remember(mEye.info)
    }

    func enjoyWithSong(aSong:Song){
        mEar.hear(aSong)
        mBrain.remember(aSong.content)
    }

    func tell(){
        mMouth.speak("\(mName) : \(mBrain.memory)")
    }
}
```

```swift
    func createHumanDemo(){
        var _man:Human = Human(aName: "Wilden")    // 建立一個人，名叫 Wilden
        var _book:Book = Book()             // 建立一本書
        var _song:Song = Song()             // 建立一首歌
        _man.readBook(_book)                // 要 Wilden 讀書
        _man.tell()                         // 要 Wilden 說明現在記得什麼事
        _man.enjoyWithSong(_song)           // 要 Wilden  聽歌
        _man.tell()                         // 要 Wilden 說明現在記得什麼事
    }
```

## 初始化複合物件

確保複合的物件初始化，是建立複合的要點。編譯器不會自動幫我們完成這個工作，沒有正確初始化複合的物件往往是失敗的主要原因。

何時初始化複合的物件？有三種選擇。

1. 定義屬性時就初始化複合物件

   > 這種方式的優點是確保複合物件一定會被初始化，缺點是不論複合的物件有沒有用到，一定會被初始化，導致資源浪費。 如果複合的物件佔用資源大，如點陣圖物件、網路連接等，那麼會導致資源浪費。另外，如果需要在執行時建立複合物件這種方式也不能被使用。

2. 在構造函數中初始化

   > 在複合類別物件被建立時，被複合的物件才會被建立。 但是，如果想在複合類別物件構造函數被調用之 前就建立被複合的物件，請使用第一種初始化方式。 有些程式寫法不在構造函數中直接將初始化語句全部列出，單獨抽離初始化語句到一個方法中，一來可以保證程式碼的可讀性,二來較為靈活便於日後的修改。

3. 在使用物件時再初始化

   > 當使用到被複合的物件時，才初始化。 這種初始化方式缺點是要多寫一些程式碼確保正確初始化，優點是節省資源，在 Swift 中澤引入了此特性使其減少不少程式碼，如果被複合的物件資源佔用巨大，就會採用這種初始化方式。

## 複合與聚合

什麼是聚合？聚合\(Aggregation\)與複合形式相似，也是新類別物件中持有別的類別物件的引用。複合物件和聚合物件是新類別的物件，被複合物件和被聚合物件是現有類別物件。

複合和聚合不同點在於：被複合的物件是隨著複合類別物件一同建立，一同消亡回收的，不能脱離複合類別而獨自存在。被聚合的物件不一定是隨著聚合類別一同建立的，聚合類別消滅了，被聚合的物件也可能被第三方持有引用而繼續存在。

複合的物件引用不暴露給外部，但聚合的引用能被第三方所使用。複合的物件都是在複合類別內部建立的。聚合的物件往往是由外部傳入引用的。也有聚合類別自己內部建立聚合物件後，再將聚合物件引用傳出的。

複合的關係強於聚合的關係。複合的物件與複合類別物件「同生共死」，複合類別物件如果不存在，則複合的物件也不能繼續存在。聚合的物件和聚合類別物件是「各安天命」，聚合類別物件即使不存在了，但被聚合物件的引用依然可能被第三方的類別或變數持有，從而繼續生存。

