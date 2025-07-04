# Swift 的保留字

當你一開專案時，選到 ViewController 時，就可以看到紅色的 class 字樣，就是系統保留字。

```swift
  class ViewController:UiViewController {
  }
```

其他包括

用作宣告的關鍵字：deinit、enum、extension、func、import、init、let、protocol、static、struct、subscript、typealias、var。

用作語句的關鍵字： break、case、continue、default、do、else、fallthrough、if、in、for、return、switch、where、while。

用作表達和型別的關鍵字： as、dynamicType、is、new、super、self、Self、Type、COLUMN、FILE、FUNCTION、LINE。

特定上下文中被保留的關鍵字： associativity、didSet、get、infix、inout、left、mutating、none、nonmutating、operator、override、postfix、precedence、prefix、right、set、unowned、unowned\(safe\)、unowned\(unsafe\)、weak、willSet，這些關鍵字在特定上下文之外可以被用於識別符號。

以下標記被當作保留符號，不能用於自定義操作符： \( 、 \) 、 { 、 } 、 \[ 、 \] 、 . 、 , 、 : 、 ; 、 = 、 @ 、 \# 、 & （作為前綴操作符）、 -&gt; 、 \` 、 ? 和 ! \(作為後綴操作符\)。

這些保留字，也可以拿來當作自定義的變數或常數名稱，只要加上\( \` \) 如

```swift
  let `class`:String = ""
```

但是筆者非常不推薦拿保留字來當作變數或常數的名稱，因為非常容易混淆。

