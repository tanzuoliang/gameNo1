/**
 * Created by Elendil on 2016/11/21.
 */
uicore = uicore ||{};

uicore.AnimText = uicore.Pane.extend({

    _text:null,
    _str:null,
    ctor:function(){
        this._super();
    },

    onEnter:function() {
        this._super();
    },

    setData:function(text){
        this._label = cc.LabelTTF(text);
        this._label.setString("0");
        this._label.setFontSize(25);
        this._label.x = 0;
        this._label.y = 0;
        this.addChild(this._label);
        // this._text = text;
        // this.addChild(text);
    },

    setLabelSize:function(size){
        this._label.setFontSize(size);
    },

    setAnim:function (text) {
        this._str = text;
        // this.schedule(this.updateTime,0.1);
        this._label.setString(text);
        var scale1 = cc.ScaleTo(.1,1.7,1.7);
        var scale2 = cc.ScaleTo(.1,1,1);
        this.runAction(cc.Sequence(scale1,scale2));
    },

    updateTime:function(){
        this._label.setString(this._str);
    }

});

uicore.AnimText.create = function(_text)
{
    var text = new uicore.AnimText();
    text.setData(_text);
    return text;
};