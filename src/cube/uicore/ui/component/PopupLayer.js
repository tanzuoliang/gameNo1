/**
 * Created by Virtue on 16/9/19.
 */
var ui = ui || {};

ui.PopupLayer = ui.Pane.extend(
{

    _listener:null,
    _layerColor:null,

    ctor:function ()
    {
        this._super();


        this._listener = cc.EventListener.create
        (
            {
                event:cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches:true,
                onTouchBegan:function ($touch,$event) {
                    return true;
                },
                onTouchEnded:function ($touch,$event) {

                }
            }
        )
        cc.eventManager.addListener(this._listener,this);
    },

    initCompleted:function () {
        //todo custom
        this._super();
    },

    /**
     * 从外部传来的数据方法
     */
    initData:function($data)
    {

    },


    addMask:function ($color)
    {
        if(!$color) $color = core.PopupManager.DEFAULT_COLOR;
        var size = cc.winSize;
        this._layerColor = new cc.LayerColor(
            $color
            ,size.width
            ,size.height);
        this.addChild(this._layerColor,0);
        var pos = this.convertToNodeSpace(cc.p(size.width / 2,size.height / 2));
        this._layerColor.setPosition(cc.p(pos.x - size.width /2,pos.y - size.height/2));
    },

    onExit:function ()
    {
        this._super();
        this.clear();
    },

    clear:function ()
    {
        this._listener &&  cc.eventManager.removeListener(this._listener);
        if(this._layerColor)
        {
            this.removeChild(this._layerColor);
        }
    }


})

ui.PopupLayer.create = function ()
{
    var pop = new ui.PopupLayer();
    return pop;
}