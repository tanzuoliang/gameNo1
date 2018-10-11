/**
 * Created by Elendil on 2016/12/26.
 */
var uicore = uicore || {};


uicore.RichText = uicore.Node.extend({
    _color:cc.color.WHITE,
    _fontName:"res/font/huakangw9.TTF",
    _renderer:null,
    _size:25,
    _text:null,
    textLine:1,
    textHeigth:0,
    elementsList:null,
    _nodeList:null,
    _colorFlag:false,
    ctor:function(){
        this._super();
        this.initRenderer();
    },

    initRenderer:function(){
        this.elementsList = [];
        this._renderer = ccui.RichText.create();
        this._renderer.setTouchEnabled(false);
        this._renderer.ignoreContentAdaptWithSize(false);
        // this._renderer._textVerticalAlignment = cc.VERTICAL_TEXT_ALIGNMENT_CENTER;
        // this._renderer._textHorizontalAlignment = cc.TEXT_ALIGNMENT_CENTER;
        //this._renderer.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addChild(this._renderer);
    },

    setVerticalSpace : function (size) {
      this._renderer.setVerticalSpace(size);
    },

    setString:function(text,data,fontName){
        text = text.toString();
        this.textLine = 1;
        this.textHeigth = 0;
        this._text = text;
        if(fontName){
            this._fontName = fontName;
        }
        this._renderer.removeAllChildren();
        this.formatText(text,data);
    },

    getNodeList:function(){
        return this._nodeList
    },

    setColor:function(color){
        this._color = color;
    },

    setFontSize:function(size){
        this._size = size;
    },

    setSize:function($size){
        this.width = $size.width;
        this.height = $size.height;
        this._renderer.setContentSize($size);
        if(this.anchorX == 0){
            this._renderer.x = $size.width * 0.5;
        }
        if(this.anchorY == 0){
            this._renderer.y = $size.height * 0.5;
        }

    },

    txtWidth:0,//长度
    getFontLine:function(text){
        this.txtWidth = 0;
        var w = 0;
        var line = 0;
        for(var i = 0;i< text.length;i++)
        {
            var code = text[i].charCodeAt(0);
            cc.log("code = " + code);
            if(code > 10000){
                w += this._size;
                this.txtWidth += this._size;
            }else{
                w += this._size/1.5;
                this.txtWidth += this._size/1.5;
            }
            if(w >= this.width - 20){
                line++;
                w = 0;
            }
        }
        cc.log("this.txtWidth = " + this.txtWidth);

        this.handleFontLine(line);
    },



    handleFontLine:function(line){
        this.textLine += line;
        this.textHeigth = this.textLine * (this._size + 10);
        cc.log("line:" + this.textLine + " height:" + this.textHeigth);
    },

    formatText:function(text,data) {
        var list = [];
        var r1 = text.split("{");
        var txt = "";
        if(r1.length){
            for(var i=0;i<r1.length;i++){
                var index = r1[i].indexOf("}");
                var r2 = r1[i].split("}");
                if(index > 0){
                    var textData = this.formatData(i,r2[0],data);
                    txt += textData.text;
                    list.push(textData.rich);
                }else{
                    txt += r2[0];
                    list.push(this.getRichData(i,r2[0]));
                }

                if(r2[1]){
                    txt += r2[1];
                    list.push(this.getRichData(i,r2[1]));
                }
            }
            this.getFontLine(txt);
        }else{
            list.push(this.getRichData(0,text));
            this.getFontLine(text);
        }

        if(this.elementsList.length){
            for(var j=0;j<this.elementsList.length;j++){
                this._renderer.removeElement(this.elementsList[j]);
            }
        }

        if(!list)
            return;
        this.elementsList = list;
        for(var j=0;j<list.length;j++){
            this._renderer.pushBackElement(list[j]);
        }

    },

    formatData:function(tag,value,data){
        var retext;
        var dataList = value.split(",");
        var textData = {text:"",size:this._size,color:this._color};
        for(var i = 0;i< dataList.length;i++){
            var arg = dataList[i].split(":");
            switch (arg[0]){
                case "img":
                    textData.img = arg[1];//.replace("uicore.LanguageManager.languageFlag",uicore.LanguageManager.languageFlag);
                    break;
                case "text":
                    textData.text = arg[1];
                    break;
                case "arg":
                    if(data[arg[1]].toString())
                        textData.text = data[arg[1]];
                    break;
                case "color":
                    if(!this._colorFlag){
                        textData.color = this.getColor(arg[1]);
                    }
                    break;
                case "size":
                    textData.size = arg[1];
                    break;
                case "node":
                    if(!this._nodeList){
                        this._nodeList = [];
                    }

                    var node = uicore.RichTextNode.create();
                    if(data){
                        node.setData(arg[1],data);
                    }else{
                        node.setData(arg[1]);
                    }

                    textData.node = node;
                    this._nodeList.push(node);
                    break;

            }
        }
        cc.trace(textData,"textData------");
        if(textData.node){
            retext = ccui.RichElementCustomNode.create(tag,cc.color(255,255,255,255),255,textData.node,this._fontName);
        }else{
            if(textData.img){
                retext = ccui.RichElementImage.create(tag,textData.color,255,textData.img);
            }else{
                retext = ccui.RichElementText.create(tag,textData.color,255,textData.text,this._fontName,textData.size);
            }
        }

        return {rich:retext,text:textData.text};
    },

    setColorChangeFlag:function ($flag) {
        this._colorFlag = $flag;
    },

    //判断是否点击到NODE
    getClickNode:function(loc){
        if(!this._nodeList)
            return;
        for(var i=0;i<this._nodeList.length;i++){
            if(this._nodeList[i].getClickNode(loc)){
                return this._nodeList[i];
            }
        }
    },

    getRichData:function(tag,text){
        return ccui.RichElementText.create(1,this._color,255,text,this._fontName,this._size);
    },

    /**
     *
     * @param color
     * @returns {*}
     */
    getColor:function(color){
        var c;
        var list = color.split("|");
        if(list[1]){
            c = cc.color(parseInt(list[0]),parseInt(list[1]),parseInt(list[2]),255);
            return c;
        }
        c = cc.color.WHITE;
        switch (color){
            case "yellow":
                c = cc.color.YELLOW;
                break;
            case "blue":
                break;
                c = cc.color.BLUE;
            case "green":
                c = cc.color.GREEN;
                break;
            case "red":
                c = cc.color.RED;
                break;
            case "orange":
                c = cc.color.ORANGE;
                break;
            case "meagenta":
                c = cc.color.MAGENTA;
                break;
            case "gray":
                c = cc.color.GRAY;
                break;
            case "black":
                c = cc.color.BACK;
                break;
            case "blueA":
                c = cc.color(0,126,185,255);
            case "blueB":
                c = cc.color(0,64,249,255);
                break;
            case "blueC":
                c = cc.color(0,214,214,214);
                break;
            case "blueD":
                c = cc.color(50,255,255,214);
                break;
            case "purpleB":
                c = cc.color(132,0,255,255);
                break;
            case "yellowB":
                c = cc.color(255,246,0,255);
                break;
            case "yellowC":
                c = cc.color(255,111,5,255);
                break;
            case "greenB":
                c = cc.color(1,132,10,255);
                break;
            case "redB":
                c = cc.color(255,0,0,255);
                break;
            case "blueB":
                c = cc.color(0,80,212,255);
                break;
            case "n_purple":
                c = cc.color(196,30,245,255);
                break;
            case "n_orange":
                c = cc.color(255,145,3,255);
                break;
            case "n_purple_1":
                c = cc.color(255,0,126,255);
                break;
            case "n_brown":
                c = cc.color(176,103,48,255);
                break;
            case "n_red":
                c = cc.color(228,0,21,255);
                break;
            case "n_yellow":
                c = cc.color(254,216,0,255);
                break;
            case "n_green":
                c = cc.color(0,214,42,255);
                break;
            case "n_orange_1":
                c = cc.color(255,100,0,255);
                break;
            case "n_blue":
                c = cc.color(0,166,244,255);
                break;
            case "n_yellow_1":
                c = cc.color(255,198,0,255);
                break;
            case "n_gray":
                c = cc.color(199,143,166,255);
                break;
            case "1":
                c = cc.color.GREEN;
                break;
            case "2":
                c = cc.color.BLUE;
                break;
            case "3":
                c = cc.color(196,30,245,255);
                break;
            case "4":
                c = cc.color.ORANGE;
                break;
            case "5":
                c = cc.color.RED;
                break;
        }

        return c;
    }

});


uicore.RichText.create = function(){
    var d = new uicore.RichText();
    return d;
}