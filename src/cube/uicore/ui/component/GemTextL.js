/**
 * Created by WuBin on 2017/6/29.
 */
uicore = uicore ||{};

uicore.GemTextL = uicore.Pane.extend({

    _text:null,
    _str:null,
    _label:null,
    _numlabel:null,
    _nextImage:null,
    _nextnumlabel:null,
    _newImage:null,
    ctor:function(){
        this._super();
        this.width = 500;
        this.height = 33;
        this.setUITouchEnabled(true);
    },

    onEnter:function() {
        this._super();
    },

    setLabelTextColor:function () {
        this._label.setColor(cc.color(255,242,32));
    },

    setData:function(curData,nextData,name,type){
        if(!this._label){
            this._label = ccui.Text.create();
            this._label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            ccui.enableOutline(cc.color(58,30,6,255),this._label,2);
            this._label.setFontSize(20);
            this._label.x = 0;
            this._label.setAnchorPoint(cc.p(0,0));
            this._label.y = -20;
            // this._label.setString("等级:");
            this.addChild(this._label);
        }

        if(!this._numlabel){
            this._numlabel = ccui.Text.create();
            this._numlabel.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            ccui.enableOutline(cc.color(58,30,6,255),this._numlabel,2);
            this._numlabel.setFontSize(20);
            this._numlabel.setAnchorPoint(cc.p(0,0));
            this._numlabel.x = this._label.x + 170;
            this._numlabel.y = this._label.y;
            this._numlabel.setColor(cc.color(59,242,55));
            this.addChild(this._numlabel);
        }

        if(!this._nextImage){
            this._nextImage = ccui.ImageView.create();
            this._nextImage.loadTexture("res/"+ uicore.LanguageManager.languageFlag + "/ui/module/icon_SJJT_01.png");
            this._nextImage.x = this._label.x + 260;
            this._nextImage.y = this._label.y + 13;
            this.addChild(this._nextImage);
            this._nextImage.setVisible(false);
        }

        if(!this._nextnumlabel){
            this._nextnumlabel = ccui.Text.create();
            this._nextnumlabel.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            ccui.enableOutline(cc.color(58,30,6,255),this._nextnumlabel,2);
            this._nextnumlabel.setFontSize(20);
            this._nextnumlabel.setAnchorPoint(cc.p(0,0));
            this._nextnumlabel.x = this._label.x + 292;
            this._nextnumlabel.y = this._label.y;
            this._nextnumlabel.setColor(cc.color(0,212,50));
            this.addChild(this._nextnumlabel);
            this._nextnumlabel.setVisible(false);
        }

        if(!this._newImage){
            this._newImage = ccui.ImageView.create();
            this._newImage.loadTexture("res/"+ uicore.LanguageManager.languageFlag + "/ui/module/icon_NEW_02.png");
            this._newImage.x = this._nextImage.x + 3;
            this._newImage.y = this._nextImage.y;
            this.addChild(this._newImage);
            this._newImage.setVisible(false);
        }

        var str = this.checkGem(nextData);
        //是否是新属性
        if(type){
            this._newImage.setVisible(true);
            this._numlabel.setString(this.getNum(nextData));
            // this._numlabel.setString("+" + data[i] + str);
        }
        else{
            this._newImage.setVisible(false);
            this._numlabel.setString(this.getNum(curData));
            this._nextnumlabel.setString(this.getNum(nextData));

            //是否增加了属性
            if(Number(this.getNum(nextData)) > Number(this.getNum(curData))){
                this._nextImage.setVisible(true);
                this._nextnumlabel.setVisible(true);
            }
            else{
                this._nextImage.setVisible(false);
                this._nextnumlabel.setVisible(false);
            }
        }
    },

    checkGem:function (data) {
        for(var i in data){
            var str = "";
            switch (i){
                case "att":
                    str = "";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    break;
                case "hp":
                    str = "";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    break;
                case "add":
                    str = "%";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    break;
                case "hadd":
                    str = "%";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    break;
                case "dent":
                    str = "%";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    break;
                case "cd":
                    str = "%";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    break;
                case "odd":
                    str = "%";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    break;
                case "res":
                    str = "%";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    break;
                case "aspdd":
                    str = "%";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    break;
                case "age":
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    break;
                case "force":
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    break;
            }
        }
        return str;
    },

    getNum:function (data) {
        for(var i in data){
            return data[i].toFixed(1);
        }
    }

});

uicore.GemTextL.create = function()
{
    var text = new uicore.GemTextL();
    return text;
};