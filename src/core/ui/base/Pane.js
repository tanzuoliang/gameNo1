/**
 * Created by Virtue on 2016/6/30.
 */
var ui = ui || {};

ui.Pane = ui.Node.extend
(
    {
        _root:null,
        _rootName:null,

        ctor:function () {
            this._super();
        },
        
        onExit:function () {
            this._super();
        },

        initCompleted:function () {
            //todo custom
        },

        //---------custom
        setRoot:function ($rootName)
        {
            // this._root =  ccs.load($rootName).node;
            // this.setContentSize(this._root.getContentSize());
            // this.addChild(this._root,1);
            // this.initCompleted();
        },
        getRootComponent:function(componentName){
            if(!this._root)
                return;
            return ccui.helper.seekWidgetByName(this._root,componentName);
        }


    }
)
ui.Pane.create = function () {
    var pane = new ui.Pane();
    return pane;
}