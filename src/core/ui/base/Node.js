/**
 * Created by Virtue on 2016/6/30.
 */
var ui = ui || {};

ui.Node = core.BaseObject.extend
(
    {
        _touchEnabled:false,
        _touchListener:null,
        _checkRect:null,
        _checkOffsetX:20,
        _checkOffsetY:20,

        ctor:function () {
            this._super();
        },

        setUITouchEnabled:function ($bool)
        {
            this._touchEnabled = $bool;
            if (this._touchEnabled) {
                if(this._touchListener){
                    return;
                }

                this._touchListener = cc.eventManager.addListener({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: false,//true,
                    onTouchBegan: this.onTouchBegan.bind(this),
                    onTouchMoved: this.onTouchMoved.bind(this),
                    onTouchEnded: this.onTouchEnded.bind(this),
                    onTouchCancelled:this.onTouchCancelled.bind(this)
                }, this);
            } else {
                this._touchListener && cc.eventManager.removeListener(this._touchListener);
            }
        },

        onTouchBegan:function ($touch,$event)
        {
            if(!this.containsTouchLocation($touch,$event))
            {
                return false
            }else
            {
                this._mouseBeganPoint = $touch.getLocation();
                return true;
            }
        },
        onTouchMoved:function ($touch,$event)
        {

        },
        onTouchEnded:function ($touch,$event)
        {
            if(!this.containsTouchLocation($touch,$event))
            {
                return false
            }else
            {
                if(this.isMouseClick($touch.getLocation())){
                    this.beClick($touch);
                }
                return true;
            }
        },
        onTouchCancelled:function ($touch,$event)
        {

        },
        //check
        containsTouchLocation:function($touch,$event)
        {
            var target = $event.getCurrentTarget();
            return cc.rectContainsPoint(this.getCheckRect(),target.convertTouchToNodeSpace($touch));
        },

        getCheckRect:function ()
        {
            if(this._checkRect)
            {
                return this._checkRect;
            }else
            {
                var size = this.getContentSize();
                var rect = cc.rect(0,0,size.width,size.height);
                return rect;
            }
        },

        isMouseClick:function(endedTouch){
            if(!endedTouch)
                return;
            if(!this._mouseBeganPoint)
                return;
            var p = 0;
            var a = 0;
            if(endedTouch.y > this._mouseBeganPoint.y){
                p = endedTouch.y - this._mouseBeganPoint.y
            }else{
                p =  this._mouseBeganPoint.y - endedTouch.y;
            }

            if(endedTouch.x > this._mouseBeganPoint.x){
                a = endedTouch.x - this._mouseBeganPoint.x
            }else{
                a =  this._mouseBeganPoint.x - endedTouch.x;
            }
            return(a <= this._checkOffsetX && p<=this._checkOffsetY);
        },

        setCheckRect:function ($x,$y,$w,$h)
        {
            var rect = cc.rect($x,$y,$w,$h);
            this._checkRect = rect;
        },

        beClick:function ($touch)
        {

        }
    }
)

ui.Node.create = function ()
{
    var node = new ui.Node();
    return node;
}


/**
 * tzl MultiNode
 */
ui.ViewMutilControl = cc.Node.extend({

    finger_first : null,
    finger_second : null,
    delta_x : null,
    delta_y : null,
    mDistance : null,
    curScale : null,

    maxScaleX : 0,
    minScaleX : 0,
    maxScaleY : 0,
    minScaleY : 0,

    moveCall : null,
    comCall : null,

    view : null,
    viewSize : null,
    curViewWidth : null,
    curViewHeight : null,

    ctor : function () {
        this._super();
        this._touchListener = ({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            swallowTouches: false,//true,
            onTouchsBegan: this.onTouchsBegan.bind(this),
            onTouchsMoved: this.onTouchsMoved.bind(this),
            onTouchsEnded: this.onTouchsEnded.bind(this),
            onTouchsCancelled:this.onTouchsCancelled.bind(this)
        });
        this._touchListener = cc.eventManager.addListener(this._touchListener, this);

        this._touchListenerOneByOne = ({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,//true,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
            onTouchCancelled:this.onTouchCancelled.bind(this)
        });
        this._touchListenerOneByOne = cc.eventManager.addListener(this._touchListenerOneByOne, this);
    },

    onTouchBegan : function (touch,event) {
        this.finger_first  = touch.getLocation();
        return true;
    },
    onTouchMoved : function (touch,event) {
        var now = touch.getLocation();
        var detal_x = now.x - this.finger_first.x;
        var detal_y = now.y - this.finger_first.y;
        this.finger_first = now;
        this.view.x += detal_x;
        this.view.y += detal_y;


        this.fixViewPosition();
    },
    onTouchEnded : function (touch,event) {

    },
    onTouchCancelled : function (touch,event) {

    },

    onTouchsBegan : function (touchs,event) {
         if(touchs.length >= 2){
            this.finger_first   = touchs[0].getLocation();
            this.finger_second  = touchs[1].getLocation();
            this.mDistance = cc.pDistance(this.finger_first,this.finger_second);
            if(this.curScale == null)
                this.curScale = 1.0;
        }
    },

    onTouchsMoved : function (touchs,event) {
         if(touchs.length >= 2){
            this.finger_first   = touchs[0].getLocation();
            this.finger_second  = touchs[1].getLocation();
            var  dis = cc.pDistance(this.finger_first,this.finger_second);
            this.curScale *= dis / this.mDistance;
            this.mDistance = dis;
            var nowScalw_x =  Math.min(this.maxScaleX,Math.max(this.minScaleX,this.curScale));
            var nowScalw_y =  Math.min(this.maxScaleY,Math.max(this.minScaleY,this.curScale));
            if(this.moveCall != null){
                this.moveCall(nowScalw_x, nowScalw_y);
            }



            var w = this.curViewWidth * (nowScalw_x - this.view.scaleX) * 0.5;
            var h = this.curViewHeight * (nowScalw_y - this.view.scaleY) * 0.5;
            this.view.x -= w;
            this.view.y -= h;
            this.view.scaleX = nowScalw_x;
            this.view.scaleY = nowScalw_y;
             this.curViewWidth  = this.view.width * nowScalw_x;
             this.curViewHeight  = this.view.height * nowScalw_y;
        }

        this.fixViewPosition();
    }
    ,

    onTouchsEnded : function (touchs,event) {
        if(this.comCall != null){
            this.comCall();
        }

        this.finger_first = this.finger_second = null;
    }
    ,

    onTouchsCancelled : function (touchs,event) {
        if(this.comCall != null){
            this.comCall();
        }

        this.finger_first = this.finger_second = null;
    },

    onExit : function () {
        this._super();
        cc.eventManager.removeListener(this._touchListener);
        cc.eventManager.removeListener(this._touchListenerOneByOne);
        this.moveCall = this.comCall = null;
    },
    
    fixViewPosition : function () {
        if(this.view.x > 0)
            this.view.x = 0;
        if(this.view.x + this.curViewWidth  < this.viewSize.width)
            this.view.x =  this.viewSize.width - this.curViewWidth;

        if(this.view.y > 0)
            this.view.y = 0;

        if(this.view.y + this.curViewHeight  < this.viewSize.height)
            this.view.y =  this.viewSize.height - this.curViewHeight;
    },

    setTouchEnabled : function (bo) {
        
    }
});

// ui.MultiNode.create = function (minWidth,maxWidth,minHeight,maxHeight,moveCall,comCall) {
//     var ret = new ui.MultiNode();
//
//     ret.maxScaleX = 1.0;
//     ret.minScaleX = minWidth / maxWidth;
//     ret.maxScaleX = 1.0;
//     ret.minScaleX = minHeight / maxHeight;
//     ret.moveCall = moveCall;
//     ret.comCall = comCall;
// }

ui.ViewMutilControl.create = function (viewSize,view) {
    var ret = new ui.ViewMutilControl();
//
    ret.maxScaleX = 1.0;
    ret.minScaleX = viewSize.width / view.width;
    ret.maxScaleX = 1.0;
    ret.minScaleX = viewSize.height / view.height;

    ret.curViewWidth = view.width;
    ret.curViewHeight = view.height;

    ret.view = view;
    ret.viewSize = viewSize;

    return ret;
}