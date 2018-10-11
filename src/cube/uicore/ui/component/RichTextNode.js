/**
 * Created by WuBin on 2017/2/21.
 */
var uicore = uicore || {};
uicore.RichTextNode = uicore.Pane.extend({
    id:0,
    itemCon:null,
    _tipClass:null,
    type:0,
    ctor:function(){
        this._super();
        //this.onStart();

    },

    init:function(){
        this._super();
    },

    click:function(){
        cc.log("click");
    },

    onEnter:function(){
        this._super();

    },

    onStart:function(){
        this._super();

    },

    setData:function(data,arg){
        var l = data.split("|");
        var text = ccui.Text.create();
        this.type = parseInt(l[0]);
        switch (this.type){
            //1为展示道具怪物卡
            case 1:
                this.id = l[2];
                var con = uicore.ConfigManager.getItemOfCard(l[1]);
                this.itemCon = con;
                text.setColor(uicore.GameConst["ITEM_COLOR_" + con.color]);
                text.setString("[" + con.name + "]");
                text.anchorX = 0;
                text.anchorY = 0;
                if(l[2]){
                    text.setFontSize(l[2]);
                }else{
                    text.setFontSize(23);
                }
                this.setItemTip(l[1]);
                this.addChild(text,9);
                this.width = text.width;
                this.height = text.height;
                break;
            //2为自定义装备分享
            case 2:
                this.id = l[2];
                var con = uicore.ConfigManager.getItemOfCard(arg.baseId);
                this.itemCon = con;
                text.setColor(uicore.GameConst["ITEM_COLOR_" + con.color]);
                text.setString("[" + con.name + "]");
                text.anchorX = 0;
                text.anchorY = 0;
                if(l[2]){
                    text.setFontSize(l[2]);
                }else{
                    text.setFontSize(23);
                }
                this._tipData = arg;
                this._tipClass = alert.PropTip;
                this.addChild(text,9);
                this.width = text.width;
                this.height = text.height;
                break;
            case 5:

                this.id = arg.data;
                this.setRoot("res/heroInfo_1/talk_sound_item.json");
                if(arg.time)
                    this.getRootComponent("time").setString(arg.time + " s");
                this._root.y -= 5;
                this.width = 200;
                this.height = 30;
                break;
        }

    },

    setItemTip:function(baseId){
        var con = uicore.ConfigManager.getItemOfCard(baseId);
        if(!con)
            return;
        if(con.isItem){
            switch (con.type){
                case 1:
                    this._tipClass = alert.ItemTip;
                    break;
                case 2:
                    this._tipClass = alert.EquipTip;
                    break;
                case 3:
                    this._tipClass = alert.ItemTip;
                    break;
                case 4:
                    this._tipClass = alert.ItemTip;
                    break;
                default :
                    this._tipClass = alert.EquipTip;
                    break;
            }
        }
        this._tipData = con;
        if(con.isCard){
            this._tipClass = alert.EquipTip;


        }
    },

    showTip:function(){

        alert.AlertLayer.create().showAlertClass(this._tipClass,this._tipData,true,true);


    },

    getClickNode:function(loc){
        if(loc.x > this.x){
            if(loc.x < this.x + this.width){
                return true;
            }
        }
    },

    onExit:function(){
        //this.layer.removeColorLayer();
        this._super();
    }
});

uicore.RichTextNode.create = function(){
    var d = new uicore.RichTextNode();
    if(d){
        return d;
    }
    return null;
}


