/**
 * Created by Virtue on 16/9/21.
 */
var core = core || {}

core.HttpRequest =
{

    /**
     * 过滤列表 model:action
     */
    fiterList: [],

    /**
     * 请求的URL地址
     */
    url: "",

    /**
     * 请求队列
     */
    queryList: {},

    /**
     * uid
     */
    uid:null,

    /**
     * sid
     */
    sid:null,

    
    memoryCache : {time : {},data : {}},
    //---------------------public function-------------------------------

    /**
     * 获取httpRequest对象
     * @returns {null}
     */
    getHttpRequest: function() {
        return cc.loader.getXMLHttpRequest();
    },

    /**
     * 变更基础的URL地址
     * @param url
     */
    setUrl:function(url) {
        this.url = url;
    },
    
    
    isValidRequest : function (key) {
        var now = Date.now();
        var timeCache = this.memoryCache.time;
        if(Object.prototype.hasOwnProperty.call(timeCache,key)){
            var time = timeCache[key];
            if((now - time) > 300){
                timeCache[key] = now;
                return true;
            }
            
            return false
        }

        timeCache[key] = now;
        return true;
    },


    saveTempModel : function (key,res) {
        var dataCache = this.memoryCache.data;
        dataCache[key] = res;
    },

    generateDataUUID : function (model,action,data) {
        return model + "_" + action + "_" + (!!data ? JSON.stringify(data) : "none");
    },

    dumpTempModel : function () {
        var dataCache = this.memoryCache.data;
        cc.log("-------------------------------- start temp data ---------------------------");
        for(var key in dataCache) {
            cc.trace(dataCache[key],key);
            cc.log("\n");
            cc.log("\n");
        }

        cc.log("-------------------------------- end temp data ---------------------------");
    },

    /**
     * 请求接口
     * @param $model
     * @param $action
     * @param $data
     * @param $callback
     * @param $errorCallback
     */
    getData:function ($model,$action,$data,$callback,$errorCallback)
    {
        var dataUUID = this.generateDataUUID($model,$action,$data);

        //   add by tzl at 2018/10/9 下午5:19
        if(!this.isValidRequest(dataUUID)){
            var dataCache = this.memoryCache.data;
            $callback && $callback(dataCache[dataUUID]);
            cc.log("[request] Frequent operation " + dataUUID);
            return;
        }
        
        if(!$data){
            $data = {uid:this.uid};
        }else{
            $data.uid = this.uid;
        }
        var that = this;
        alert.HttpLoadLayer.show();
        var xmlhttp = this.getHttpRequest();

        xmlhttp.onreadystatechange = function ()
        {
            if(xmlhttp.readyState == 4)
            {
                var curTime = core.TimeManager.getServerTime();
                var t = core.TimeManager.transformTime(curTime);

                alert.HttpLoadLayer.hide();
                
                //请求成功
                if(xmlhttp.status == 200)
                {
                    var res = JSON.parse(xmlhttp.responseText);
                    //todo 数据加密
                    // cc.trace(res,"resresresres:");
                    //todo 删除队列
                    that._delQuery(res['m'] +":"+ res['a']);
                    //todo 错误处理
                    if(res.err)
                    {
                        cc.trace(res,"error:" + res['m'] + ":" + res['a'] + ":" + JSON.stringify($data));
                        //cc.log("Error:=======>"+res.err);
                        uicore.NoticeManager.error(res.err,res["m"],res["a"]);
                        // alert(res.err);
                        if($errorCallback)
                        {
                            $errorCallback();
                        }
                    }else
                    {
                        if(res.note){
                            // cc.trace(res,"eooooooo:" + $model + ":" + $action);
                            uicore.NoticeManager.receive(res.note,$model + ":" + $action);
                        }

                        cc.log("[" + t.transTime + "]http结果 " + res['m'] + ":" + res['a'] + "    " + xmlhttp.responseText);

                        that.saveTempModel(dataUUID,res);
                        
                        $callback && $callback(res);
                        $callback = null;

                    }

                    if(res.note)
                    {
                        core.NoticManager.parser(res.note);
                    }

                    $errorCallback = null;

                }else
                {    
                    that.errCallBack();
                }
            }
        };

        //组装请求数据
        if(!$data)
        {
            $data = {};
        }
        if($action)
            $data["a"] = $action;
        if($model)
            $data["m"] = $model;


        if(game.GameConst._userInfo)
        {
            $data["uid"] = game.GameConst._userInfo.uid;
            $data["sid"] = game.GameConst._userInfo.sid;
        }

        var postData = this.buildQuery($data);
        xmlhttp.open("POST",this.url);
        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

        xmlhttp.send(postData);
        var curTime = core.TimeManager.getServerTime();
        var t = core.TimeManager.transformTime(curTime);
        cc.log("[" + t.transTime + "]http请求:--->"+this.url+"?"+postData);

    },

    setSid:function ($sid)
    {
        this.sid = $sid;
    },

    setUid:function ($uid)
    {
        this.uid = $uid;
    },

    /**
     * 网络错误回调
     * @param queryname
     */
    errCallBack: function() {
        this._clearQuery();

        //todo alert提示
    },

    /**
     * 组装请求数据
     * @param formdata
     * @returns {string}
     */
    buildQuery: function(formdata) {
        var value, key, tmp = [];
        // 递归组装数据
        var _http_build_query_helper = function(key, val) {
            var k, tmp = [];
            if (val === true) {
                val = '1';
            } else if (val === false) {
                val = '0';
            }
            if (val != null) {
                if (typeof val === 'object') {
                    for (k in val) {
                        if (val[k] != null) {
                            tmp.push(_http_build_query_helper(key + '[' + k + ']', val[k]));
                        }
                    }
                    return tmp.join("&");
                } else if (typeof val !== 'function') {
                    return encodeURIComponent(key) + '=' + (val);
                } else {
                    throw new Error('There was an error processing for http_build_query().');
                }
            } else {
                return '';
            }
        };
        for (key in formdata) {
            value = formdata[key];
            var query = _http_build_query_helper(key, value);
            if (query !== '') {
                tmp.push(query);
            }
        }
        return tmp.join("&");
    },

    //-------------------private function----------------------------

    _setQuery: function(queryname) {
        // 过滤列表
        if (this.fiterList.indexOf(queryname) != -1) {
            return true;
        }
        // 已经在列表中
        if (this.queryList.hasOwnProperty(queryname)) {
            return false;
        }

        this.queryList[queryname] = true;

        return true;
    },

    _delQuery: function(queryname) {
        // 过滤列表
        if (this.fiterList.indexOf(queryname) != -1) {
            return true;
        }

        delete this.queryList[queryname];
        // 统计请求数量
        var queryNum = 0;
        for (var i in this.queryList) {
            queryNum++;
        }

    },

    _clearQuery: function() {
        for (var i in this.queryList) {
            clearTimeout(this.queryList[i]);
        }
        this.queryList = {};
    }
}