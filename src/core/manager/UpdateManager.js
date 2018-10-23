/**
 * Created by Virtue on 16/11/4.
 */
var core = core || {};

core.LoginEffectZOrder = 2;

core.UpdateLayerZOrder  = 1;

core.UpdateManager =
{

    GAME_VERSION_JSON:"game_version.json",

    online_updateFlag:false,

    updateScene:null,

    _scene_class:null,

    _layer_class:null,

    /**
     * 初始化
     * @param $onlineUpdateSceneClass
     */
    init:function()
    {
        this.updateScene = new this._scene_class();
        this.updateScene.retain();
        cc.director.getScheduler().performFunctionInCocosThread(function ()
        {
            cc.director.replaceScene(this.updateScene);
            this.updateScene.release();
            this.updateScene.run(this._layer_class);
        }.bind(this));

    },

    /**
     * 检查是否需要热更
     */
    startCheckonlineUpdate:function ()
    {
        cc.director.getScheduler().performFunctionInCocosThread(function ()
            {
                // this.updateScene.popupNotice();
                this.updateScene.startCheck();
            }.bind(this));

    },

    /**
     * 传入使用的class
     * @param $onlineUpdateSceneClass
     * @param $onlineUpdateLayerClass
     */
    setUseClass:function ($onlineUpdateSceneClass,$onlineUpdateLayerClass) {
        this._scene_class = $onlineUpdateSceneClass;
        this._layer_class = $onlineUpdateLayerClass;
    }
}

core.OnlineUpdateScene = ui.Scene.extend
(
    {
        _percent:0,

        _updateLayer:null,
        _popLayer:null,

        _curVersion:null,

        _storagePath:null,
        _nextVersion:null,
        _packageUrl:null,

        _xmlhttp:null,


        _downloadNums:0,

        _curloadNums:0,

        _zipUrlArr:null,


        __successListenerId:null,
        __errorListenerId:null,
        __progressListenerId:null,


        ctor:function ()
        {
            this._super();
        },

        onExit:function ()
        {
            this.delEvent();
            this._super();

        },

        /**
         * 弹出游戏外公告
         */
        popupNotice:function ()
        {
            cc.log("[popupNotice]")
            if(this._popLayer)
                this._popLayer.removeFromParent();

            this.notice_xmlHttp= core.HttpRequest.getHttpRequest();
            this.notice_xmlHttp.onreadystatechange = function ()
            {

                if(this.notice_xmlHttp.readyState == 4)
                {
                    //请求成功
                    if(this.notice_xmlHttp.status == 200)
                    {
                        var res = JSON.parse(this.notice_xmlHttp.responseText);
                        cc.trace(res,"notice_xmlHttp");

                        //错误处理
                        if(res.err["message"])
                        {
                            cc.log("hot error " + res.err["message"]);
                            this.loadGame();
                            return;
                        }else
                        {
                            if(res.data.length == 0)
                            {
                                this.startCheck();
                            }
                            else{
                                //处理公告信息
                            }
                        }
                    }else
                    {
                        this.startCheck();
                    }
                }
            }.bind(this);

            //http://tankdev.tianyi-game.com/version/hort_res_0.zip

            var data = {m:"Update",a:"getNotice",ver:this._curVersion};
            var postData = core.HttpRequest.buildQuery(data);
            this.notice_xmlHttp.open("POST",core.PluginsManager.LOGIN_URL);
            this.notice_xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            this.notice_xmlHttp.send(postData);
            cc.log("http请求:--->"+core.HttpRequest.url+"?"+postData);
        },


        /**
         * 开始检测
         */
        startCheck:function ()
        {
            if(this._popLayer)
                this._popLayer.removeFromParent();
            this._updateLayer.setVisible(true);

            if(core.UpdateManager.online_updateFlag == false)
            {
                cc.log("ignore storagePath:-->"+this._storagePath);
                this._curVersion = "develop--Mode";
                this._updateLayer.setVersion(this._curVersion);
                this.loadGame();
                return ;
            }//======开发者模式

            this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");
            this._storagePath = this._storagePath + "upgrade_data/";
            cc.log("storagePath:-->"+this._storagePath);


            this._xmlhttp = core.HttpRequest.getHttpRequest();
            this._xmlhttp.onreadystatechange = function ()
            {

                if(this._xmlhttp.readyState == 4)
                {
                    //请求成功
                    if(this._xmlhttp.status == 200)
                    {
                        cc.log("http 请求成功 :" + this._xmlhttp.responseText);
                        var res = JSON.parse(this._xmlhttp.responseText);
                        cc.trace(res,"热更新！！！！11");
                        //错误处理
                        if(res.err["message"])
                        {
                            cc.log("hot error " + res.err["message"]);
                            this.loadGame();
                        }else
                        {
                            this._zipUrlArr = parseArray(res.data["packList"]);
                            var packSize = res.data["packSize"];
                            this._downloadNums = this._zipUrlArr.length;
                            this._curloadNums = 0;

                            cc.trace(res.data,"热更新！！！！");

                            if(this._downloadNums > 0 )
                            {
                                cc.log("readyDownload");
                                this.readyDownload(packSize);
                            }else
                            {
                                //todo 最新版本无需更新
                                cc.log("最新版本无需更新");
                                this.loadGame();
                            }
                        }
                    }else
                    {
                        cc.log("error status " + this._xmlhttp.status);
                        this.loadGame();
                    }
                }
            }.bind(this);

            //cc.log("serpath:" + jsb.fileUtils.getSearchPaths());
            //cc.log("full path " + jsb.fileUtils.fullPathForFilename(core.UpdateManager.GAME_VERSION_JSON));

            cc.loader.loadJson(core.UpdateManager.GAME_VERSION_JSON,this._getVersionData.bind(this));
        },


        /**
         * 准备下载..todo 弹出框等
         */
        readyDownload:function ($packSize)
        {
            //todo 子类复写
        },

        /**
         * 启动
         * @param $onlineUpdateLayerClass
         * @param $callback
         */
        run:function ($onlineUpdateLayerClass)
        {
            if(!cc.sys.isNative)
            {
                this.loadGame();
                return;
            }

            //todo 开始检验
            // cc.director.runScene(this);
            //todo 初始化事件
            this.initEvent();
            //todo 初始化界面
            this.initView($onlineUpdateLayerClass);
            //todo update
            // this.schedule(this.updateProgress,0.1);
        },

        /**
         * 移除事件
         */
        delEvent:function ()
        {
            cc.log("###delEvent");
            cc.eventManager.removeListener(this.__progressListenerId);
            cc.eventManager.removeListener(this.__successListenerId);
            cc.eventManager.removeListener(this.__errorListenerId);
            eventBus.EventBusByJs.delEvent("update_notice");
            this.__progressListenerId = null;
            this.__successListenerId = null;
            this.__errorListenerId = null;

            core.PlatformManager.delEvt();
            cc.log("###delEvent111");
        },

        /**
         * 初始化事件
         */
        initEvent:function ()
        {

            eventBus.EventBusByJs.addEvent("update_notice",this.startCheck.bind(this),this);
            this.__progressListenerId = cc.eventManager.addCustomListener("tianyi_upgrade_onprogress",this._onProgress.bind(this));
            this.__successListenerId = cc.eventManager.addCustomListener("tianyi_upgrade_onsuccess",this._onSuccess.bind(this));
            this.__errorListenerId = cc.eventManager.addCustomListener("tianyi_upgrade_onerror",this._onError.bind(this));
        },

        /**
         * 加载游戏
         */
        loadGame:function ()
        {
            this._updateLayer.updateComplete();
            //todo
            core.PluginsManager.loadGame();
        },

        /**
         * initView
         */
        initView:function ($onlineUpdateLayerClass)
        {
            this._updateLayer = new $onlineUpdateLayerClass();
            //todo check
            this._updateLayer.checkUpdate();
            this.addChild(this._updateLayer);
            this._updateLayer.setLocalZOrder(core.UpdateLayerZOrder);
            this._updateLayer.setVisible(true);
        },


        /**
         * 更新layer数据
         * @param dt
         */
        updateProgress:function (dt)
        {
             this._updateLayer.updatePercent(this._percent);
        },

        _onProgress:function ($data)
        {
            cc.log("onprogress");
            var data = $data.getEventData();
            if(data != null && data != "null")
            {
                // var strArr = data.split(":");
                this._percent = data;
                //strArr[1] nowDownload
                //strArr[2] totalDownload
                this._updateLayer.updatePercent(this._percent);
            }
        },

        _onSuccess:function ($data)
        {
            this.unscheduleAllCallbacks();
            cc.log(this._nextVersion+"--->版本下载完毕");
            this._curloadNums ++;
            this._updateLayer.setVersion(this._nextVersion);
            this.__checkHasNewVersion();
        },

        _onError:function($data)
        {
            this.unscheduleAllCallbacks();
            // this._updateLayer.updateInfo(uicore.LanguageManager.getString("online_update_error"));
            cc.log("热更出错");
            this._updateLayer.showHint(uicore.LanguageManager.getString("online_update_error"), function () {
                cc.game.restart();
            }.bind(this));

        },

        /**
         * 获取本地版本信息
         * @private
         */
        _getVersionData:function($errorId,$json)
        {

            this._curVersion = $json["version"];

            cc.log("当前版本:"+this._curVersion);

            this._updateLayer.setVersion(this._curVersion);

            var data = {m:"Update",a:"update",ver:this._curVersion};
            var postData = core.HttpRequest.buildQuery(data);
            this._xmlhttp.open("POST",core.PluginsManager.LOGIN_URL);
            this._xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            this._xmlhttp.send(postData);
            cc.log("http请求:--->"+core.PluginsManager.LOGIN_URL+"?"+postData);
        },


        /**
         * 检验是否还有新版本
         * @private
         */
        __checkHasNewVersion:function () {
            if(this._curloadNums >= this._downloadNums)
            {
                cc.log("全部热更完毕");
                //todo 重启
                cc.game.restart();
            }else
            {
                this._packageUrl = this._zipUrlArr[this._curloadNums]["package"];
                this._curVersion = this._zipUrlArr[this._curloadNums]["curVer"];
                this._nextVersion = this._zipUrlArr[this._curloadNums]["nextVer"];
                this._updateLayer.startUpdate();

                //todo 调用C++
                tianyi.TYUpgradeManager.getInstance().checkUpgrade(this._packageUrl,this._nextVersion,this._storagePath);
            }
        }

    }
)

core.OnlineUpdateLayer = uicore.Pane.extend
(
    {
        ctor:function ()
        {
            this._super();
            cc.log("OnlineUpdateLayer ctor");
        },

        /**
         * 设置版本号
         * @param $version
         */
        setVersion:function ($version)
        {
            //todo
        },

        /**
         * 检查
         */
        checkUpdate:function ()
        {
            //todo
        },

        /**
         * 开始
         */
        startUpdate:function ()
        {
            //todo
        },

        /**
         * 更新进度
         * @param $value
         */
        updatePercent:function ($value)
        {
            //todo
        },

        /**
         * 更新完毕
         */
        updateComplete:function ()
        {
            //todo
        }
    }
);

core.UpdateNoticePopView = uicore.Pane.extend
(
    {
        ctor:function ()
        {
            this._super();
            this.loadRoot("res/CN/ui/onlineUpdate/onlineNoticeLayer.json");
        },

        initCompleted:function ()
        {

        },

        onExit:function ()
        {
            this._super();
        },

        onEnter : function () {
            this._super();

        },


    }
);
