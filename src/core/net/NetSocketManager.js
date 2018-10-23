/**
 * Created by Virtue on 16/6/3.
 */
var core = core || {}

/**
 *  例子
 *  core.NetSocketManager.getInstance().initNetwork("ws://192.168.1.240","9501");
 *  core.NetSocketManager.getInstance().send(Chat.message.login(1,1,"hahaha"));
 */

core.NetSocketManager =
{
    /**
     * 单例
     */
    _instance:null,

    /**
     *  额外socket字典
     */
    _complexSocketDic:null,

    /**
     * 获取单例
     * @returns {null}
     */
    getInstance:function ()
    {
        if(!this._instance)
        {
            this._instance = this.CREATE_SOCKET()
        }
        return this._instance;
    },


    /**
     * 根绝key获取额外socket
     * @param $key
     */
    getComplexSocketByKey:function ($key)
    {
        if(!this._complexSocketDic)
            this._complexSocketDic = {};

        if(!this._complexSocketDic[$key])
        {
            this._complexSocketDic[$key] = this.CREATE_SOCKET();
        }
        return this._complexSocketDic[$key];
    },


    /**
     * 生成
     */
    CREATE_SOCKET:function ()
    {
        var socket = new core.NetSocket();
        return socket;
    }
}


core.HeartCheck = function (ws) {
    this.timeout = 5000;
    this.timeoutObj = null;
    this.ws = ws;
};

core.HeartCheck.prototype.reset = function(){
    clearTimeout(this.timeoutObj);
    this.start();
};

core.HeartCheck.prototype.start =  function(){
    var that = this;
    this.timeoutObj = setTimeout(function(){
        var str = { "common": "Heart", "uid": game.GameConst.getUserInfo().uid};
        str = JSON.stringify(str);
        cc.trace(str, "[unionChat] send heart");
        that.ws.send(str);
    }, this.timeout);
};

core.HeartCheck.prototype.destory = function () {
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.ws = null;
};

core.HeartCheck.prototype.resetWS = function (ws) {
    this.ws = ws;
};

core.HeartCheck.create = function (ws) {
    return new core.HeartCheck(ws);
};


core.NetSocket = cc.Class.extend(
{
    socket:null,

    isInit:false,

    host:null,

    needReConnect:true,

    dataPool:null,

    reConnectMaxTimes:20,
    curConnectTime:0,
    _messageParser:null,



    /**
     * 初始化
     */
    initNetwork:function ($url,$post,messageParser)
    {

        this.host = $url+":"+$post;

        this._messageParser = messageParser;
        this.hearCheck = core.HeartCheck.create();

       this._init();
    },

    /**
     * 内部初始化外部无法调用
     * @private
     */
    _init:function ()
    {
        this.dataPool = [];
        cc.log("init--netSocket:" + this.host);
        this.socket = new WebSocket(this.host);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.needReConnect = true;

        // this.hearCheck.resetWS(this.socket);
    },

    onMessage:function ($evt)
    {
        var data = $evt.data;
        cc.log('[unionChat] Network onMessage...' + this.host + "||message:" + data);
        //core.SocketProtocolHelper.parser(data);
        this._messageParser && this._messageParser(data);
        // this.hearCheck && this.hearCheck.reset();
    },

    onError:function ($evt)
    {
        cc.log('[unionChat] Network onError...' + this.host);
    },

    onClose:function ($evt)
    {
        cc.log('[unionChat]Network onClose...' + this.host);
        this.socket.close();
        this.isInit = false;
        this.CELAN_EVENT();
        this.socket = null;

        if(this.curConnectTime >= this.reConnectMaxTimes)
        {
            // cc.log("链接重复次数达到上限...");
            this.curConnectTime = 0;
            alert.AlertLayer.create(alert.AlertLayer.ALERT_TYPE_CONFIRM,
                {title:"",content:"连接超时？...",data:null,sure:this._init.bind(this),index : alert.AlertConfirmPane.DEFAULT});
            return;
        }

        if(this.needReConnect)
        {
            this.curConnectTime ++;
            cc.log('Network ReConnect...' + this.host);
            // setTimeout(this._init.bind(this),500);
            setTimeout(this._init.bind(this),this.curConnectTime * 1000);
            // this._init();
        }
    },

    onOpen:function ($evt)
    {
        cc.log('[unionChat] Network onOpen...' + this.host);

         //eventBus.EventBusByJs.dispatchEvent("reConnect_success",null);

        this.curConnectTime = 0;
        this.isInit = true;
        if(this.dataPool.length > 0)
        {
            this._send();
        }

        // this.hearCheck && this.hearCheck.start();
    },

    /**
     * send socketdata
     * @param $data
     */
    send:function ($data)
    {
        if(this.socket) {
            if (this.dataPool) {
                this.dataPool.push($data);
                this._send();
            }
            cc.log("###send");
        }else{
            // alert.AlertLayer.create(alert.AlertLayer.ALERT_TYPE_CONFIRM,
            //     {title:"",content:"socket未初始化",data:null,sure:this._init.bind(this),index : alert.AlertConfirmPane.DEFAULT});
            //{title:"",content:uicore.LanguageManager.getString("connect_times_top"),data:null,sure:this._init.bind(this)});
        }

    },

    _send:function()
    {
        if(this.dataPool.length < 0 )return;

        if (!this.isInit)
        {
            cc.log("Network is not init..");
            // alert.AlertLayer.create(alert.AlertLayer.ALERT_TYPE_CONFIRM,
            //     {title:"",content:"socket未开启",data:null,sure:this._init.bind(this),index : alert.AlertConfirmPane.DEFAULT});
            //{title:"",content:uicore.LanguageManager.getString("connect_times_top"),data:null,sure:this._init.bind(this)});
        }else
        {
            if(this.socket.readyState == WebSocket.OPEN)
            {
                var sendData = this.dataPool.shift();
                cc.trace(sendData, "[unionChat]send$data");
                this.socket.send(sendData);

            }else
            {
                cc.log('Network WebSocket readState:'+this.socket.readyState);
                this._send();
            }
        }
    },

    /**
     * 主动关闭socket
     */
    close:function ()
    {
        if (this.socket){
            cc.log("Network close...");
            this.needReConnect = false;
            this.CELAN_EVENT();
            this.isInit = false;
            this.socket.close();
            this.socket = null;
        }
    },

    CELAN_EVENT:function ()
    {
        this.socket.onopen = null;
        this.socket.onmessage = null;
        this.socket.onerror = null;
        this.socket.onclose = null;
    }
})