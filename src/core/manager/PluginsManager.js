/**
 * Created by Virtue on 16/11/4.
 */
var core = core || {};

core.PluginsManager =
{

    LOGIN_URL:"",

    curVersion:null,

    curNoticeUrl:null,

    isloadingJs:false,

    startGameCallback:null,

    setNoticeUrl:function($url)
    {
        this.curNoticeUrl = $url + "/service.php?m=api&a=payCallback";
    },


    restartGame:function () {
        jsb.sprite3DCache.removeAllSprite3DData();

        cc.loader.releaseAll();
        cc.director.purgeCachedData();
        // uicore.SceneManager.disposeAssets();
        ccs.armatureDataManager.clear();
        cc.AnimationCache.destroyInstance();
        cc.spriteFrameCache.removeUnusedSpriteFrames();
        cc.textureCache.removeUnusedTextures();
        cc.game.restart();
    },

    applicationDidEnterBackground:function () {
        cc.log("###applicationDidEnterBackground");
        this.backTime = core.TimeManager.getServerTime();
    },

    applicationDidEnterForeground:function () {
        cc.log("###applicationDidEnterForeground");
        this.foreTime = core.TimeManager.getServerTime();
        if(!this.backTime){
            this.backTime = core.TimeManager.getServerTime();
        }

        var t = this.foreTime - this.backTime;
        cc.log("###TTT = " + t);
        if(t > 1000){
            // this.restartGame();
        }
    },

    init:function ($cb)
    {
        cc.log("初始化PluginsManager");
        this.startGameCallback = $cb;
        
        if(core.UpdateManager.online_updateFlag) {
            this.readyOnlineUpdate();
        }else{
            this.loadGame();
        }


        cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function (evt) {
            this.applicationDidEnterForeground();
        }.bind(this));
        cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function (evt) {
            this.applicationDidEnterBackground();
        }.bind(this));
    },

    readyOnlineUpdate:function ()
    {
        cc.log("初始化UpdateManager");
        core.UpdateManager.init();
        core.UpdateManager.startCheckonlineUpdate();
    },

    /**
     * 调用java代码 通知游戏准备
     */
    callJava:function ()
    {
        return;
        if(cc.sys.os == "Android")
        {
            jsb.reflection.callStaticMethod("ogr/cocos2dx/javascript/platform/PlatformManager","cocos2dReadForGame","()V");
        }
    },


    loadGame:function ()
    {
        cc.log("loadGame");
        if(this.isloadingJs)
        {
            cc.log("loadGame2222");
            return;
        }
        this.isloadingJs = true;
        cc.loader.loadJs(["src/module.js"],this.loadMoudleJs.bind(this));
    },

    loadMoudleJs:function (err)
    {
        cc.log("loadMoudleJs");
        var headerList = [];
        for(var i=0;i<module.headerNameList.length;i++)
        {
            var headerListUrl = "src/include/"+module.headerNameList[i]+".js";
            headerList.push(headerListUrl);
        }
        cc.loader.loadJs(headerList,this._loadMoudleHeaderJs.bind(this));
    },
    _loadMoudleHeaderJs:function(err)
    {
        cc.log("_loadMoudleHeaderJs");
        var list = [];
        for(var i=0;i<module.headerNameList.length;i++)
        {
            list = list.concat(module[module.headerNameList[i]]);
        }
        cc.loader.loadJs(list,this.loadPreloadFiles.bind(this));
    },

    loadPreloadFiles:function (err)
    {
        cc.log("loaderScene");
        cc.LoaderScene.preload(g_resources, function () {
            this.login();
        }, this);
    },


    login:function ()
    {
        if(cc.sys.platform != cc.sys.MACOS)
        {
            sdk.SDKPlatform.getInstance().loginPlatform();
        }else{
            if(this.startGameCallback)
            {
                this.startGameCallback();
            }
        }
        this.callJava();
        //todo 进入游戏
        cc.log("进入游戏");


    },

    logout:function ()
    {
        //todo 退出游戏
        cc.Class;
    }
}