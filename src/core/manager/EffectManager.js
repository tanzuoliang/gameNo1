/**
 * Created by Virtue on 16/6/15.
 */
var core = core || {};

core.EffectManager =
{

    _initFlag:false,

    _effectDic:null,

    _frameEventNameCallbackDic:null,
    _frameIndexCallbackDic:null,
    _completeCallbackDic:null,

    /**
     * 初始化
     */
    init:function ()
    {
        if(this._initFlag)
        {
            return;
        }
        if (!this._effectDic)
        {
            this._effectDic = {};
        }
        if(!this._frameIndexCallbackDic)
        {
            this._frameIndexCallbackDic = {};
        }
        if(!this._completeCallbackDic)
        {
            this._completeCallbackDic = {};
        }
        if(!this._frameEventNameCallbackDic)
        {
            this._frameEventNameCallbackDic = {};
        }
    },

    /**
     * 生成特效
     * @param $keyName 自定义keyname 别重复
     * @param $resName 资源name
     * @param $isLoop 是否循环 默认循环
     * @param $isNeedClean 是否需要自清理 默认不清理
     * @returns {ccs.Armature}
     */
    createEffect:function($keyName,$resName,$isLoop,$isNeedClean) {

        $isLoop = $isLoop == undefined ? true : false;
        $isNeedClean = $isNeedClean == undefined ? false : true;

        //防止没有初始化
        this.init();

        if(this._effectDic[$keyName])
        {
            throw new Error("EffectManager:---->"+$keyName+"已存在");
        }

        var armature = ccs.Armature.create($resName);
        this._effectDic[$keyName] = armature;

        armature.getAnimation().setMovementEventCallFunc(function(armature,movementType,movementID)
        {
            if(movementType ==  ccs.MovementEventType.complete || movementType == ccs.MovementEventType.loopComplete)
            {
                if(this._completeCallbackDic[$keyName])
                {
                    this._completeCallbackDic[$keyName](armature);
                }
                if(!$isLoop)
                {
                    armature.getAnimation().pause();
                }
                if($isNeedClean)
                {
                    this.deleteEffect($keyName);
                }
            }
        },this);
        armature.getAnimation().setFrameEventCallFunc(function (bone, frameEventName, originFrameIndex, currentFrameIndex)
        {
            if(this._frameEventNameCallbackDic[$keyName] && this._frameEventNameCallbackDic[$keyName][frameEventName])
            {
                this._frameEventNameCallbackDic[$keyName][frameEventName](armature,frameEventName);
            }
            if(this._frameIndexCallbackDic[$keyName] && this._frameIndexCallbackDic[$keyName][currentFrameIndex])
            {
                this._frameIndexCallbackDic[$keyName][currentFrameIndex](armature,currentFrameIndex);
            }
        },this);
        return armature;
    },

    /**
     * 设置播放完成回调
     * @param $keyname
     * @param $func
     */
    setCompleteCallback:function ($keyname,$func)
    {
        if(this._effectDic &&  this._effectDic[$keyname])
        {

            this._completeCallbackDic[$keyname] = $func;
        }else
        {
            throw new Error($target +" is null");
        }
    },

    /**
     * 设置桢回调
     * @param $keyname
     * @param $indexframe
     * @param $func
     */
    setFrameIndexCallback:function ($keyname,$indexframe,$func)
    {
        if(this._effectDic &&  this._effectDic[$keyname])
        {

            if(!this._frameIndexCallbackDic[$keyname])
            {
                this._frameIndexCallbackDic[$keyname] = {};
            }
            this._frameIndexCallbackDic[$keyname][$indexframe] = $func;
        }else
        {
            throw new Error($target +" is null");
        }
    },

    /**
     * 设置事件名回调
     * @param $keyname
     * @param $eventname
     * @param $func
     */
    setFrameEventNameCallback:function ($keyname,$eventname,$func)
    {
        if(this._effectDic &&  this._effectDic[$keyname])
        {

            if(!this._frameEventNameCallbackDic[$keyname])
            {
                this._frameEventNameCallbackDic[$keyname] = {};
            }
            this._frameEventNameCallbackDic[$keyname][$eventname] = $func;
        }else
        {
            throw new Error($target +" is null");
        }
    },

    /**
     * 删除特效
     * @param $keyName
     */
    deleteEffect:function($keyName)
    {
        if(this._effectDic &&  this._effectDic[$keyName])
        {
            var armature = this._effectDic[$keyName];
            delete this._effectDic[$keyName];
            delete this._completeCallbackDic[$keyName];
            delete this._frameEventNameCallbackDic[$keyName];
            delete this._frameIndexCallbackDic[$keyName];
            armature.removeFromParentAndCleanup(true);
        }else
        {
            throw new Error($target +" is null");
        }
    },
}