---
title: "含有多個類別的 Swift 類別文件的標準實例"
---

# 含有多個類別的 Swift 類別文件的標準實例

## 1. 僅有該類別使用，不會在其他類別使用

```swift
//  SettingContectGroupViewController.swift
import UIKit
class SettingContectGroupViewController: LocalizableViewController {
    private var mContainer  :UIScrollView   = UIScrollView()
    private var mStartY     :CGFloat        = 0.0
    private let mModel      :LPMainModel    = LPMainModel.getInstance()
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.white
        self.title = LocalizedString(pKey: "SettingTitle_ContectGroup", "SettingTitle_ContectGroup")

        let _view:UIView = UIView()
        self.view.addSubview(_view)

        mStartY = ((self.navigationController? == nil) ? 0 : self.navigationController!.navigationBar.frame.height) + UIApplication.sharedApplication().statusBarFrame.height

        mContainer.frame = self.view.bounds
        self.view.addSubview(mContainer)
        ...
    }

    func onUploadHandler(){
        ...
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}


class ConectGroupCell:UIView {
    private let mTitle:UILabel = UILabel()
    private let mButton:UIButton = UIButton()
    private let mLine:UIView = UIView()
    private let mImageView:UIImageView = UIImageView()
    private let mFontSize:CGFloat = 16.0
    private let mTitleColor:UIColor = UIColor.fromHex(0x333333)
    private let mButtonColor:UIColor = UIColor.fromHex(0xFF2a00)

    var button:UIButton{
        get{
            return mButton
        }
    }

    init(aImageName:String,aTitle:String,aButtonTitle:String){
        super.init(frame: CGRectZero)
        mImageView.image = UIImage(named: aImageName)
        mTitle.text = aTitle
        let _btnTextAttr:NSAttributedString = NSAttributedString(string: aButtonTitle, attributes: [NSFontAttributeName:UIFont.boldSystemFontOfSize(mFontSize - 2.0),NSForegroundColorAttributeName:mButtonColor])
        mButton.setAttributedTitle(_btnTextAttr, forState: UIControlState.Normal)

    }

    required init(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }


    override func layoutSubviews() {
        self.backgroundColor = UIColor.clear
        ...
    }
}
```

## 2. 在設計功能 Module 時，完全同類型功能的結構或是類別。

```swift
//  MeetingVO.swift
import Foundation
enum PeriodMode:String {
    case Today      = "Today"
    case Tomorrow   = "Tomorrow"
    case Week       = "Week"
    case Month      = "Month"
    case ALL        = "All"
}

struct MeetingDetailKey {
    static let MaxCount      :String = "MaxCount"      //會議編號
    static let Table         :String = "Table"         //會議時間起(yyyy/MM/dd HH:mm:dd)
    static let MeetingSeq    :String = "MeetingSeq"    //會議編號
    static let StartDate     :String = "StartDate"     //會議時間起(yyyy/MM/dd HH:mm:dd)
    static let EndDate       :String = "EndDate"       //會議時間迄(yyyy/MM/dd HH:mm:dd)
    static let MeetingType   :String = "MeetingType"   //會議類型
    static let Subject       :String = "Subject"       //會議標題
    static let Place         :String = "Place"         //會議地點
}
```

> > 若以上兩種情況上不會分辨時，只需要維持一個檔案內只寫一個類別絕對不會有錯誤。

