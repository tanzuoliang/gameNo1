/**
 * Created by Virtue on 2016/6/30.
 */
var ui = ui || {};

ui.Scene = cc.Scene.extend
(
    {
        _gameLayer:null,
        _uiLayer:null,

        ctor:function (){
            // cc.director.setNotificationNode(null);
            this._super();
            this.init();
        },

        onEnter:function () {
            this._super();

         
        },

        onStart:function () {
            this._super();
        },

        onExit:function () {
            // cc.director.setNotificationNode(null);
            this._super();
        },
        //custom
        init:function ()
        {
            this._gameLayer = ui.Node.create();
            this.addChild(this._gameLayer);
            this._uiLayer = ui.Node.create();
            this.addChild(this._uiLayer);
        },
        getGameLayer:function () {
            return this._gameLayer;
        },

        getUiLayer:function () {
            return this._uiLayer;
        }
    }
)

ui.Scene.create = function () {
    var scene = new ui.Scene();
    return scene;
}