/**
 * Created by Elendil on 2016/11/24.
 */
var uicore = uicore ||{};

uicore.TypeScroll = uicore.Pane.extend({

    typeArr:["等级排序","品质排序"],
    ctor:function(){
        this._super();
        this.setRoot("type_scroll","type_scroll");
        this.setUITouchEnabled(true);
    },

    initCompleted:function(){
        this._super();
        // var typeItem = uicore.TypeScrollItem.create();
        // this.addChild(typeItem,99);
        
    },

    setData:function(data){
        var num = 0;
        var list = [];

        for(var i=0;i<this.typeArr.length;i++){
            var typeItem = uicore.TypeScrollItem.create();
            typeItem.setData(this.typeArr[i]);
            list.push(typeItem);
            num++;
        }

        this._girdLayout = uicore.Layout.create();
        // this._girdLayout.setDir(uicore.Layout.LAYOUT_DIR_VERTICAL);
        this._girdLayout.width = 100;
        this._girdLayout.height = 120;
        // this._girdLayout.setNodeSize(cc.size(100,25));
        this._girdLayout.isGrew = 0.01;

        this._girdLayout.setList(list,.5);
        this.getRootComponent("ScrollView_1").addNode(this._girdLayout);
        this._girdLayout.updatePosition();
        this.getRootComponent("ScrollView_1").setInnerContainerSize(cc.size(100,num*25));
    },

    onExit:function(){
        this._super();
    }

});

uicore.TypeScroll.create = function(){
    var d = new uicore.TypeScroll();
    if(d){
        return d;
    }
    return null;
}