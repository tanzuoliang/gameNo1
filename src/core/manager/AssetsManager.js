/**
 * Created by Virtue on 16/6/8.
 */
var core = core || {};

core.AssetsManager =
{
    //最大加载数
    _maxResNum:null,
    //已加载数
    _loadResNum:null,
    //当前加载资源列表(array)
    _resource:null,
    //加载回调
    _callback:null,

    //进度回调字典
    _updateCallBackDic:null,

    //缓存dic
    _cacheDic:null,


    //是否正在加载
    isLoading:false,

    //----外部调用  start----------
    /**
     * 获取同步json
     * @param $url
     * @returns {*}
     */
    getSynJson:function ($url)
    {
        return cc.loader.getRes($url);
    },

    /**
     * 加载资源
     * @param $resources 资源列表
     * @param $callback 回调
     */
    loadResources:function ($resources,$callback)
    {

        cc.log("[----check----]:加载总进度数:"+$resources.length);
        if(this.isLoading)
        {
            cc.log("loadResources:return--->正在加载ing..");
            return;
        }
        if(!($resources instanceof Array)) $resources = [$resources];
        this._resource = $resources || [];
        this._callback = $callback;
        this._maxResNum = this._resource.length;
        this._loadResNum = 0;
        this.isLoading = true;
        this._startLoading();
    },

    /**
     * 添加进度回调
     * @param $moduleName
     * @param $callback
     */
    addUpdateCallBack:function($moduleName,$callback)
    {
        if(!this._updateCallBackDic)
        {
            this._updateCallBackDic = {};
        }
        this._updateCallBackDic[$moduleName] = $callback;
    },

    /**
     * 删除进度回调
     * @param $moudleName
     */
    deleteUpdateCallBack:function ($moduleName)
    {
        if(this._updateCallBackDic && this._updateCallBackDic[$moduleName])
        {
            delete this._updateCallBackDic[$moduleName];
        }
    },

    /**
     * 手动清理cache
     * @param $resources
     */
    removeCache:function ($resources)
    {
        if(!($resources instanceof Array)) $resources = [$resources];
        for(var i = 0, len = $resources.length;i < len;i++)
        {
            this._removeFromCache($resources[i]["value"]);
        }
    },

    //----外部调用  end----------

    //-----内部方法-----
    _addToCache:function ($type,$value)
    {
        if(!this._cacheDic)
        {
            this._cacheDic = {};
        }
        if(this._cacheDic[$value])
        {
            this._cacheDic[$value]["nums"] ++;
        }else
        {
            this._cacheDic[$value] = {"nums":1,"type":$type};
        }
    },
    _removeFromCache:function ($value)
    {
        cc.log("[----check----]:removeCache::"+$value);
        if(this._cacheDic[$value])
        {
            cc.log("$value:"+$value+"删除缓存");
            var type = this._cacheDic[$value]["type"];
            switch(type)
            {
                case core.AssetsManager.EFFECT_UI_TYPE:
                    cc.spriteFrameCache.removeSpriteFramesFromFile($value + "0.plist");
                    cc.textureCache.removeTextureForKey($value + "0.png");
                    //ccs.armatureDataManager.removeArmatureFileInfo($value);
                    break;
                case core.AssetsManager.PLIST_IMAGE_TYPE:
                    cc.spriteFrameCache.removeSpriteFramesFromFile($value + ".plist");
                    cc.textureCache.removeTextureForKey($value + ".png");
                    break;
            }
            this._cacheDic[$value]["nums"] --;
            if( this._cacheDic[$value]["nums"] <= 0)
            {
                delete this._cacheDic[$value];
            }
        }
    },

    _startLoading:function ()
    {
        cc.log("[----check----]:startloading:"+this._loadResNum);
        var curVo = this._resource[this._loadResNum];
        if(curVo)
        {
            var resUrl = curVo["value"];
            var otherData = curVo["subData"];
            var type = curVo["type"];

            if(this._cacheDic && this._cacheDic[resUrl])
            {
                cc.log("[----check----]:已经加载了:"+resUrl);
                this._cacheDic[resUrl]["nums"] ++;
                this._loadComplete();
                return;
            }

            cc.log("AssetsManager--->开始加载:"+resUrl);
            cc.log("[----check----]:开始加载:"+resUrl);
            switch(type)
            {
                case core.AssetsManager.IMAGE_TYPE:
                    this._loadImageAsync(resUrl);
                    break;
                case core.AssetsManager.PLIST_IMAGE_TYPE:
                    this._loadPlistImageAsync(resUrl);
                    break;
                case core.AssetsManager.PLIST_PVR_TYPE:
                    this._loadPlistPvrAsync(resUrl);
                    break;
                case core.AssetsManager.ARMATURE_TYPE:
                    this._loadArmature(resUrl,otherData);
                    break;
                case core.AssetsManager.EFFECT_UI_TYPE:
                    this._loadUiEffect(resUrl,otherData);
                    break;
                case core.AssetsManager.MODULE:
                    this._loadStudioModule(resUrl,otherData);
                    break;
                case core.AssetsManager.UI:
                    this._loadUiExportJson(resUrl);
                    break;
                case core.AssetsManager.CORE_JS_TYPE:
                    this._loadCoreJs(resUrl,otherData);
                    break;
            }
        }else
        {
            cc.log("AssetsManager--->加载错误:"+"加载vo获取不到");
        }
    },

    _loadCoreJs:function ($coreHearderJs,$key)
    {
        cc.loader.loadJs($coreHearderJs,
            function ($err)
            {
                var list = module[$key];
                cc.loader.loadJs(list,function ()
                {
                    this._loadComplete();
                }.bind(this));
            }.bind(this)
        );
    },

    /**
     * 所有素材加载完毕
     * @private
     */
    _allComplete:function ()
    {
        cc.log("AssetesManager-->allLoadComplete");
        if(this._callback)
        {
            this._callback();
            this._callback = null;
        }
        this._clear();
    },

    /**
     * 单资源加载完毕
     * @private
     */
    _loadComplete:function ()
    {
        // cc.log("AssetsManager_loadComplete" + this._loadResNum);
        // if(!isNumber(this._loadResNum)){
        //     return;
        // }
        var curLoadVo = this._resource[this._loadResNum];
        cc.log("[----check----]:加载完毕:"+curLoadVo.value);
        this._loadResNum++;

        var percent = Math.round((this._loadResNum / this._maxResNum) * 100) | 0;
        percent = Math.min(percent,100);

        // this._updateCallBack(percent);

        cc.log("loadNum:" + this._loadResNum  + "::" + this._maxResNum);
        if(this._loadResNum >= this._maxResNum)
        {
            signals.event.send(loading.COMPLETE);
            this._allComplete();
        }else
        {
            signals.event.send(loading.PROGRESS,percent);
            this._startLoading();
        }
    },

    _updateCallBack:function($value)
    {
        for(var moduleName in this._updateCallBackDic)
        {
            this._updateCallBackDic[moduleName]($value);
        }
    },

    _clear:function ()
    {
        this._updateCallBackDic = null;
        this._resource = null;
        this._callback = null;
        this._maxResNum = null;
        this._loadResNum = null;
        this.isLoading = false;
    },
    //---------loadAssetes-------

    _loadImageAsync:function ($res)
    {
        cc.director.getTextureCache().addImageAsync($res,function ()
        {
            cc.log("_loadImageAsync-->success");
            this._addToCache(core.AssetsManager.IMAGE_TYPE,$res);
            this._loadComplete();
        }.bind(this));
    },

    c_res:null,
    _loadPlistImageAsync:function ($res)
    {
        cc.log("[----check----]:开始加载2222::"+$res);
        this.c_res = $res;

        cc.textureCache.addImageAsync($res,function (plist,tex)
        {
            this.c_res = null;

            cc.log("[load:] " + $res +" ImageAsync-->success ");
            this._addToCache(core.AssetsManager.PLIST_IMAGE_TYPE,$res);
            cc.spriteFrameCache.addSpriteFrames(plist,tex);
            this._loadComplete();
        }.bind(this,$res.replace("png","plist")));
    },

    _loadPlistPvrAsync:function ($res) {
        this.c_res = $res;
        cc.textureCache.addImageAsync($res,function (plist,tex)
        {
            this.c_res = null;

            cc.log("[load:] " + $res +" ImageAsync-->success ");
            this._addToCache(core.AssetsManager.PLIST_PVR_TYPE,$res);
            cc.spriteFrameCache.addSpriteFrames(plist,tex);
            this._loadComplete();
        }.bind(this,$res.replace("pvr.ccz","plist")));
    },

    _loadArmature:function ($res,$isAysnc)
    {
        // if($isAysnc)
        // {
        //     var fileName = $res.split(".")[0];
        //     var exportJson = fileName +".ExportJson";
        //     ccs.armatureDataManager.addArmatureFileInfo(exportJson);
        //     this._loadComplete();
        // }else
        // {
        //     cc.director.getTextureCache().addImageAsync($res,function ()
        //     {
        //         var fileName = $res.split(".")[0];
        //         var plistUrl = fileName + ".plist";
        //         var exportJson = fileName + ".ExportJson";
        //         cc.spriteFrameCache.addSpriteFrame(plistUrl,$res);
        //         ccs.armatureDataManager.addArmatureFileInfo(exportJson);
        //         this._loadComplete();
        //     }.bind(this));
        // }
    },

    _loadUiEffect:function ($res,$plistNum)
    {
        var fileName = $res;
        var loadArr = [fileName + ".ExportJson"];
        for(var i = 0;i < $plistNum;i++)
        {
            loadArr.push(fileName + i +".png");
            loadArr.push(fileName + i +".plist");
        }

        cc.loader.load(loadArr,function()
        {
            this._addToCache(core.AssetsManager.EFFECT_UI_TYPE,$res);
            ccs.armatureDataManager.addArmatureFileInfo($res);
            this._loadComplete();
        }.bind(this));
    },

    _loadUiExportJson:function ($res)
    {
        cc.loader.load($res,function()
        {
            this._addToCache(core.AssetsManager.UI,$res);
            this._loadComplete();
        }.bind(this));
    },

    _loadStudioModule:function ($res,$resData)
    {
        var fileName = $res.split(".")[0];
        var num = $resData["num"];
        var moduleName = $resData["moduleName"];
        var loadArr = [];
        for(var i = 0;i < num;i++)
        {
            loadArr.push(fileName + i + ".png");
            loadArr.push(fileName + i + ".plist");
        }
        cc.loader.load(loadArr,function()
        {
            this._addToCache(core.AssetsManager.MODULE,moduleName);
            for(var i = 0;i < num;i++)
            {
                cc.spriteFrameCache.addSpriteFrames(fileName + i + ".plist",fileName + i + ".png");
            }
            this._loadComplete();
        }.bind(this));
    },

}

/**
 * 只加载核心js库文件
 * @param $url
 * @param $key
 * @param $callback
 */
core.AssetsManager.onlyLoadCoreJs = function ($url,$key,$callback)
{
   cc.loader.loadJs($url,
       function ($err)
       {
           var list = module[$key];
           // cc.log("listlistlist");
           // cc.trace(list);
           cc.loader.loadJs(list,function ()
           {
              if($callback)
                  $callback();
           }.bind(this));
       }.bind(this)
   );
}

/**
 * 封装方法
 * @param $arr [[type1,url1,subdata1],[type2,url2,subdata2]]
 * @returns {Array}
 */
core.AssetsManager.packageResArr = function ($arr)
{
    var realArr = [];
    for(var i= 0;i<$arr.length;i++)
    {
        var type = $arr[i][0];
        var resUrl = $arr[i][1];
        var subData = $arr[i][2];
        realArr.push(core.AssetsManager.createVo(type,resUrl,subData));
    }
    return realArr;
}


/**
 * 生成加载vo
 * @param $type
 * @param $res
 * @param $subData
 * @returns {{}}
 *
 *  plist core.AssetsManager.createVo(core.AssetsManager.PLIST_IMAGE_TYPE,"res/icon/item.png")
 *  uieffect  core.AssetsManager.createVo(core.AssetsManager.EFFECT_UI_TYPE,"res/uiEffect/xilian_small.ExportJson",1)
 */
core.AssetsManager.createVo = function($type,$res,$subData)
{
    var resVo = {};
    resVo["type"] = $type;
    resVo["value"] = $res;
    resVo["subData"] = $subData;
    return resVo;
}
//core_js
core.AssetsManager.CORE_JS_TYPE = 0;
//图片
core.AssetsManager.IMAGE_TYPE = 1;
//plist和图片
core.AssetsManager.PLIST_IMAGE_TYPE = 2;
//armature
core.AssetsManager.ARMATURE_TYPE = 3;
//ui___ effect
core.AssetsManager.EFFECT_UI_TYPE = 4;
//cocos module
core.AssetsManager.MODULE = 5;
//studio ui-exportjson
core.AssetsManager.UI = 6;
//plist, pvr.ccz
core.AssetsManager.PLIST_PVR_TYPE = 7;