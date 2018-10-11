/**
 * Created by Virtue on 16/11/17.
 */
var core = core || {};

core.PlatformManager =
{
    isInit:false,

    socketURL:"",

    platform_name:null,

    platform_type:null,
    selectSever:null,

    showErrorDebug:true,

    loginSuccessCallBack:null,

    loginLastServerBack:null,
    init:function ($callback)
    {
        this.loginSuccessCallBack = $callback;
        if(!this.isInit)
        {
            this.isInit = true;
            this.initEvt();
        }

        uicore.SocketProctol.socket_url = this.socketURL;
        uicore.SocketProctol.socket_dan = 9998;
        uicore.SocketProctol.b_socket_dan = 9999;

        if(cc.sys.platform == cc.sys.MACOS)
        {
            game.GameConst.setGameInfo({uid:game.GameConst.testUid});
            core.HttpRequest.setSid(game.GameConst._userInfo.uid);

        }
        core.PluginsManager.init(this.loginSuccessCallBack);
        
    },

    initEvt:function ()
    {
        this.login_platform_listener = cc.eventManager.addCustomListener("didLoginPlatform",this.loginSDKSussess.bind(this));
        cc.eventManager.addCustomListener("didLoginPlatformSecond",this.loginSDKSussess1.bind(this));

        cc.eventManager.addCustomListener("callFromPlatform",this.callFromPlatform.bind(this));

        // if(cc.sys.platform == cc.sys.ANDROID){
        //     setInterval(function () {
        //         jsb.reflection.callStaticMethod("org/cocos2dx/javascript/platform/PlatformManager","readMemeryInfo","()V");
        //     },1000);
        // }

    },

    callFromPlatform : function (evt) {
        var data = JSON.parse(evt.getEventData());
        switch (data.code){
            case 10008:
                alert.MessageLayer.create().showMessage(data.data);
                break;
            case 10009:
                alert.MessageLayer.create().showMessage(data.data);
                break;
        }
    },

    delEvt:function ()
    {
        cc.eventManager.removeListener(this.login_platform_listener);
        cc.eventManager.removeCustomListeners("didLoginPlatformSecond");
    },

    loginSDKSussess:function($data)
    {
        cc.log("success");
        // this.loginSuccessCallBack && this.loginSuccessCallBack();
        //todo
        var jsonInfo = $data.getEventData();
        cc.log("didLoginPlatform:" + jsonInfo);
        var obj = JSON.parse(jsonInfo);
        core.HttpRequest.getData("Login", "sdkLogin", {
                "platform": core.PlatformManager.platform_name,
                "username": obj.username,
                "token": obj.token
            },
            this.sdkLoginSuce.bind(this));
        
        
    },

    loginSDKSussess1:function($data)
    {
        //todo saveTempData
        this.accid =  cc.sys.localStorage.getItem("tempAccid");
        this.token = cc.sys.localStorage.getItem("tempToken");

        main.LoginModel.setLastSever(cc.sys.localStorage.getItem("temp_lastServer"));
        var jsonInfo = $data.getEventData();
        var obj = JSON.parse(jsonInfo);
        core.PlatformManager.channel = obj.platform;
        //todo removeTempData
        //cc.sys.localStorage.removeItem("tempAccid");
        //cc.sys.localStorage.removeItem("tempToken");

        cc.log(" loginSDKSussess1 " + jsonInfo.str());

        cc.log("---------- loginSDKSussess1 this.accid = " + this.accid + " , this.token = " + this.token);
        this.loginSuccessCallBack && this.loginSuccessCallBack();
        this.selectServer();
    },

    sdkLoginSuce:function(res)
    {
        cc.log("sdkLoginSuce-----" + JSON.stringify(res));
        main.LoginModel.setLastSever(res.data.lastServer);
        this.accid = res.data.accid;
        this.token = res.data.token;
        
        cc.sys.localStorage.setItem("tempAccid", this.accid);
        cc.sys.localStorage.setItem("tempToken", this.token);
        cc.sys.localStorage.setItem("temp_lastServer", JSON.stringify(res.data.lastServer));

        this.loginSuccessCallBack && this.loginSuccessCallBack();
        this.selectServer();
    },

    /**
     * 进入游戏获取服务器列表
     */
    selectServer:function(getLastServerCb)
    {
        cc.log("PlatformManager selectServer");
        // this.loginLastServerBack = getLastServerCb;
        core.HttpRequest.getData("Login", "enter", {
            "accid": this.accid,
            "token": this.token
        }, this.selectServerScu.bind(this));
    },

    setServerCallBack:function (callback) {
        this.loginLastServerBack = callback;
    },

    selectServerScu:function(res) {
        cc.log("selectServerScu-----------" + JSON.stringify(res));
        core.HttpRequest.setSid(res.data.sid);
        this.getSeverInfo(res.data.serverId,function (res) {
            this.loginLastServerBack && this.loginLastServerBack(res);
            this.selectSever = res;
        }.bind(this));

         game.GameConst.setGameInfo(res.data);
        // if(!core.UpdateManager.online_updateFlag) {
        //     core.PluginsManager.init(this.loginSuccessCallBack);
        // }

    },

    /**
     * UID为0的时候需要创建角色
     */
    createUser:function () {
        core.HttpRequest.getData("Login", "create", {"rolename": core.PlatformManager.platform_name + (parseInt(Math.random() * 10000))}, this.loginComplete.bind(this));
    },

    loginComplete:function(res) {
        if(res){
            game.GameConst.setGameInfo(res.data);
        }

        core.HttpRequest.setUid(game.GameConst._userInfo.uid);
        if (this.loginSuccessCallBack != null)
        {
            this.loginSuccessCallBack();
            //core.PluginsManager.init(this.loginSuccessCallBack);
        }

    },

    /**
     * 取得单独服务器信息
     * @param id
     */
    getSeverInfo:function (id,cb) {
        core.HttpRequest.getData("Login", "getIdServer", {"id":id},function (res) {
            cb(res.data);
        }.bind(this));
    },

    /**
     * 设置游戏服务器
     */
    setSeverInfo:function (data) {
        cc.trace(data,"severInfo");
        core.PluginsManager.LOGIN_URL = data.url + "/gateway.php";
        core.HttpRequest.setUrl(core.PluginsManager.LOGIN_URL);
        // core.HttpRequest.setUrl(data.url + "/gateway.php");
        var chatUrl = data.chat_url.split(":");
        var battleUrl = data.battle_url.split(":");
        uicore.SocketProctol.socket_url = chatUrl[0] +":"+ chatUrl[1];
        uicore.SocketProctol.socket_dan = chatUrl[2];

        uicore.SocketProctol.b_soctet_url = battleUrl[0] +":"+ battleUrl[1];
        uicore.SocketProctol.b_socket_dan = battleUrl[2];
    }
};


