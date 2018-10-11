/**
 * Created by WuBin on 2017/3/23.
 */
var uicore = uicore||{};

uicore.TextControl = cc.Node.extend({
    _text:null,
    _placeHolder:null,
    addTextMark:function(text,data){
        this._text = text;
        text.callBack = data;
        text.control = this;
        this._placeHolder = text.getPlaceHolder();
        text.addEventListener(this.textFieldEvent,this);
        return this;
    },

    addPassword:function(text,data){
        this._text = text;
        this._placeHolder = text.getPlaceHolder();

        text.callBack = data;
        text.addEventListener(function(sender,type){
            switch (type) {
                case ccui.TextField.EVENT_ATTACH_WITH_IME:
                    sender.setPlaceHolder("");
                    break;
                case ccui.TextField.EVENT_DETACH_WITH_IME:
                    sender.setPlaceHolder(this._placeHolder);
                    break;
                case ccui.TextField.EVENT_INSERT_TEXT:
                    break;
                default:
                    break;
            }

            if(sender.callBack)
                sender.callBack(sender,type);
        },this);
    },

    textFieldEvent: function (sender, type) {
        cc.log("ime:" + type);
        switch (type) {
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                sender.setPlaceHolder("");
                this.toMark(sender,0);
                this.toTimeOut(sender);
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                sender.setPlaceHolder(this._placeHolder);
                this.clearTime();
                this.toMark(sender,0);
                this.setClearText();
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                this.toMark(sender,0);
                this.sw = 0;
                this.toTimeOut(sender);

                break;
            default:
                break;
        }

        if(sender.callBack)
            sender.callBack(sender,type);
    },

    clearTime:function(){
        this.unscheduleAllCallbacks();
    },

    _id:0,
    sw:0,
    toTimeOut:function(text){
        var that = this;
        this.clearTime();
        //this.schedule(this.updateTime.bind(this),.3);
    },

    updateTime:function(flot){
        if(this.sw){
            this.toMark(this._text,this.sw);
            this.sw = 0;
        }else{
            this.toMark(this._text,this.sw);
            this.sw = 1;
        }
    },

    setClearText:function(){
        if(this._text.getString() == " "){
            this._text.setString("");
        }
    },

    getString:function(){
        var str = this._text.getString();
        var arr = str.split("|");
        var st = "";

        for(var i=0;i<arr.length;i++){
            st+=arr[i];
        }
        return st;
    },

    toMark:function(text,isMark){
        if(!text.getParent()){
            this.clearTime();
            return;
        }
        var str = text.getString();
//		if(!str.length){
//			str = " ";
//		}

        if(isMark){
            text.setString(str + "|");
        }else{
            var arr = str.split("|");
            var st = "";

            for(var i=0;i<arr.length;i++){
                st+=arr[i];
            }
            text.setString(st);
        }
    },

    onExit:function(){
        this._super();
        this.clearTime();
        if(this._text){
            this._text.callBack = null;
        }
    }



})

uicore.TextControl.create = function(node){
    var d = new uicore.TextControl();
    node.addChild(d);
    if(d){
        return d;
    }
    return null;
}



