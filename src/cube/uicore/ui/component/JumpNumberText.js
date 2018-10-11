/**
 * Created by Elendil on 2016/11/28.
 */
uicore = uicore ||{};

uicore.JumpNumberText = uicore.Pane.extend({

    text:null,
    maxNum:null,          //变动目标数字
    xNum:5,                 //分几次进行变动
    curNum:null,            //当前数字
    mNum:null,             //每次变动的数字大小
    aNum:null,          //初始数字大小
    bNum:null,          //每次加多少数字
    callback:null,
    ctor:function(){
        this._super();
    },

    onEnter:function() {
        this._super();
    },

    setData:function(text){

    },

    add:function (child) {
        child.addChild(this);
        this.schedule(this.updateTime,0.1);
    },

    over:function () {
        this.removeFromParent(true);
    },

    setNum:function (_text,_curNum,_maxNum,_callback) {
        this.text = _text;
        this.maxNum  = _maxNum;
        this.curNum  = _curNum;
        this.callback = _callback;
        this.aNum = this.curNum;
        this.bNum = Math.ceil((this.maxNum - this.aNum) / this.xNum);
        if(this.bNum <= 1){
            this.xNum = 1;
            this.mNum = this.maxNum - this.curNum;
        }
        else{
            this.mNum = this.bNum;
        }
    },

    updateTime:function(){
        this.xNum--;
        if(this.xNum < 0){
            this.unscheduleAllCallbacks();
            this.xNum = 3;
            this.callback();
            return;
        }
        this.aNum = parseInt(this.aNum) + this.mNum;
        this.text.setString(this.aNum);
    }
});

uicore.JumpNumberText.create = function(_text,_curNum,_maxNum,_callback)
{
    var text = new uicore.JumpNumberText();
    text.setNum(_text,_curNum,_maxNum,_callback);
    return text;
};

