/**
 * Created by WuBin on 2017/6/21.
 */
uicore = uicore ||{};

uicore.GemText = uicore.Pane.extend({

    _text:null,
    _str:null,
    _label:null,
    _numlabel:null,
    ctor:function(){
        this._super();
        this.width = 300;
        this.height = 30;
        this.setUITouchEnabled(true);
    },

    onEnter:function() {
        this._super();
    },

    setLabelTextColor:function () {
        this._label.setColor(cc.color(255,242,32));
        this._numlabel.setColor(cc.color(255,242,32));
    },

    setData:function(data){
        if(data == "Not"){
            return;
        }
        var size = 24;
        if(data["size"]){
            size = data["size"];
        }

        if(!this._label){
            this._label = ccui.Text.create();
            this._label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            ccui.enableOutline(cc.color(58,30,6,255),this._label,2);
            this._label.setFontSize(size);
            this._label.x = -45;
            this._label.setAnchorPoint(cc.p(0,0));
            this._label.y = -20;
            this.addChild(this._label);
        }

        if(!this._numlabel){
            this._numlabel = ccui.Text.create();
            this._numlabel.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            ccui.enableOutline(cc.color(58,30,6,255),this._numlabel,2);
            this._numlabel.setFontSize(size);
            this._numlabel.setAnchorPoint(cc.p(0,0));
            this._numlabel.y = this._label.y;
            this._numlabel.setColor(cc.color(59,242,55));
            this.addChild(this._numlabel);
        }

        for(var i in data){
            var str = "";
            switch (i){
                case "att":
                    str = "";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    this._numlabel.setString("+" + data[i].toFixed(1) + str);
                    break;
                case "hp":
                    str = "";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    this._numlabel.setString("+" + data[i].toFixed(1) + str);
                    break;
                case "add":
                    str = "%";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    this._numlabel.setString("+" + data[i].toFixed(1) + str);
                    break;
                case "hadd":
                    str = "%";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    this._numlabel.setString("+" + data[i].toFixed(1) + str);
                    break;
                case "dent":
                    str = "%";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    this._numlabel.setString("+" + data[i].toFixed(1) + str);
                    break;
                case "cd":
                    str = "%";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    this._numlabel.setString("+" + data[i].toFixed(1) + str);
                    break;
                case "odd":
                    str = "%";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    this._numlabel.setString("+" + data[i].toFixed(1) + str);
                    break;
                case "res":
                    str = "%";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    this._numlabel.setString("+" + data[i].toFixed(1) + str);
                    break;
                case "aspdd":
                    str = "%";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    this._numlabel.setString("+" + data[i].toFixed(1) + str);
                    break;
                case "age":
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    this._numlabel.setString("+" + data[i].toFixed(1) + str);
                    break;
                case "force":
                    str = "%";
                    this._label.setString(uicore.LanguageManager.getString(i) + ":");
                    this._numlabel.setString("+" + data[i].toFixed(1) + str);
                    break;

            }
            cc.trace(data,"tatatatas");
            cc.trace(i,"i-----");
            cc.trace(uicore.LanguageManager.getString(i),"uicore.LanguageManager.getString(i)-----");
        }
        this._numlabel.x = this._label.x + this._label.width + 10;

    },

});

uicore.GemText.create = function()
{
    var text = new uicore.GemText();
    return text;
};