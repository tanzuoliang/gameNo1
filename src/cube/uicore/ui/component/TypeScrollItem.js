/**
 * Created by Elendil on 2016/11/24.
 */
var uicore = uicore ||{};

uicore.TypeScrollItem = uicore.Pane.extend({

    _data:null,
    type:0,
    ctor:function(){
        this._super();
        this.setRoot("type_item","type_item");
        this.setUITouchEnabled(true);
        this.anchorX = .5;
        this.anchorY = .5;
    },

    initCompleted:function(){
        this._super();

    },

    setData:function(data){
        this._data = data;
        if(data != "等级排序"){
            this.type = 1;
        }
        else{
            this.type = 0;
        }
        this.getRootComponent("Label_2").setString(data);
    },

    beClick:function(){
        this._super();
        cc.log("this._data::",this._data);
        // arraySort(fuse.FuseModel.itemList,{"isSelect":"desc","level":"asc","color":"asc","strenLv":"asc"});
        cc.eventManager.dispatchCustomEvent(uicore.TypeScrollItem.SELECT_TYPE,this.type);
    },
});

uicore.TypeScrollItem.create = function(){
    var d = new uicore.TypeScrollItem();
    if(d){
        return d;
    }
    return null;
}

uicore.TypeScrollItem.SELECT_TYPE = "select_type";