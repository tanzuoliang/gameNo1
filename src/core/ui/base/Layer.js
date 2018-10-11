/**
 * Created by Virtue on 2016/6/30.
 */
var ui = ui || {};

ui.Layer = cc.Layer.extend
(
    {
        ctor:function () {
            this._super();
        },
        onEnter:function () {
            this._super();
        },
        onStart:function () {
            this._super();
        },
        onExit:function () {
            this._super();
        },
    }
)

ui.Layer.create = function ()
{
    var layer = new ui.Layer();
    return layer;
}