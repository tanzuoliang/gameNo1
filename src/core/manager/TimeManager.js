
/**
 * Created by Virtue on 16/6/3.
 */
var core = core || {};

core.TimeManager =
{
    //服务器时间（未修正)
    _serverTimeNoCorrect:null,

    //服务器时间(已修正)
    _serverTime:null,

    //本机时间
    _localTime:null,

    //修正值
    _correctValue:null,

    //unCorrectTime服务器原本是件（未修正)
    _unCorrectTime:null,

    //修正服务器时间
    correctServerTime:function($time)
    {
        this._unCorrectTime = $time*1000;
        this._localTime = new Date().getTime();
        this._correctValue =  this._localTime - $time*1000;
    },

    //获取服务器未修正时间（时间戳）
    getUnCorrectServerTime:function()
    {
        return this._unCorrectTime;
    },

    //获取服务器已修正时间（时间戳）
    getServerTime:function()
    {
        this._localTime = new Date().getTime();
        this._serverTime = this._localTime - this._correctValue;
        return this._serverTime;
    },

    //把时间戳转换为 年月天时分秒
    transformTime:function($time)
    {
        var date = new Date($time);
        var year = date.getFullYear();
        var month = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        var day = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var miSeconds = date.getMilliseconds();
        if(hours < 10){
            hours = "0" + hours;
        }
        if(minutes < 10){
            minutes = "0" + minutes;
        }
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        var transTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + ":" + miSeconds;
        var o  = {year:year,month:month,day:day,hours:hours,minutes:minutes,seconds:seconds,transTime:transTime};
        //  cc.trace(o,"transformTime");
        return o;
    },

    //把时间戳转换为 年月天时分秒
    transformTimeH:function($time)
    {
        var date = new Date($time);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        if(hours < 10)
        {
            hours = "0" + date.getHours();
        }

        if(minutes < 10)
        {
            minutes = "0" + date.getMinutes();
        }
        var seconds = date.getSeconds();
        var transTime = hours + ":" + minutes;
        return transTime;
    },

    //把2个时间戳之差转换为
    //type (day,hours,minutes,seconds)
    calculateTimes:function($time1,$time2,$type)
    {
        var divNum = 1;
        switch($type)
        {
            case "day":
                divNum = 1000 * 3600 * 24;
                break;
            case "hours":
                divNum = 1000 * 3600;
                break;
            case "minutes":
                divNum = 1000 * 60;
                break;
            case "seconds":
                divNum = 1000;
                break;
        }
        var value = Math.floor(($time1 - $time2) / parseInt(divNum));
        return value;
    },

    testTime:function($second)
    {
        // cc.log("time is " + $second);
        var h = Math.floor($second /3600);
        var m = Math.floor(($second- h * 3600)/60);
        var s = Math.floor(($second- h * 3600) % 60);
        h = h < 10 ? "0"+h:h;
        m = m < 10 ? "0"+m:m;
        s = s < 10 ? "0"+s:s;
        return h+":"+m+":"+s;
    },

    testM_S:function($second)
    {
        var h = Math.floor($second /3600);
        var m = Math.floor(($second- h * 3600)/60);
        var s = Math.floor(($second- h * 3600) % 60);
        h = h < 10 ? "0"+h:h;
        m = m < 10 ? "0"+m:m;
        s = s < 10 ? "0"+s:s;
        return m+":"+s;
    },

    testDay:function($second)
    {
        var d = Math.floor($second /86400);
        var se = $second % 86400;
        return d + uicore.LanguageManager.getString("day") + this.testTime(se);

    },

    testDays:function($second)
    {
        var d = Math.ceil($second /86400);
        return d + uicore.LanguageManager.getString("day");

    },

    testTimeCN:function($second)
    {
        var h = Math.floor($second /3600);
        var m = Math.floor(($second- h * 3600)/60);
        var s = Math.floor(($second- h * 3600) % 60);
        h = h < 10 ? "0"+h:h;
        m = m < 10 ? "0"+m:m;
        s = s < 10 ? "0"+s:s;
        return h+uicore.LanguageManager.getString("hours")+m+uicore.LanguageManager.getString("min")+s+uicore.LanguageManager.getString("second");
    },

    testTimeCNhm:function($second)
    {
        var h = Math.floor($second /3600);
        var m = Math.floor(($second- h * 3600)/60);
        var s = Math.floor(($second- h * 3600) % 60);
        h = h < 10 ? "0"+h:h;
        m = m < 10 ? "0"+m:m;
        return h+uicore.LanguageManager.getString("hours")+m+uicore.LanguageManager.getString("min");
    },

    testTimeCNDay:function($second)
    {
        var h = Math.floor($second /3600);
        h = h < 10 ? "0"+h:h;
        return h+uicore.LanguageManager.getString("hours");
    },

    testDayCN:function($second)
    {
        var d = Math.floor($second /86400);
        var h = Math.floor(($second- d * 86400)/3600);
        var m = Math.floor(($second- h * 3600 - d * 86400)/60);
        // var s = Math.floor(($second- h * 3600) % 60);

        var gapTimeStr = "";
        if($second > 86400){
            gapTimeStr = d + uicore.LanguageManager.getString("day") + h + uicore.LanguageManager.getString("hours") + m + uicore.LanguageManager.getString("min");
        }
        else if($second<86400 && $second>=3600)
        {
            gapTimeStr = h + uicore.LanguageManager.getString("hours") + m + uicore.LanguageManager.getString("min");
        }
        else if($second<3600 && $second>=60)
        {
            gapTimeStr = m + uicore.LanguageManager.getString("min");
        }
        return gapTimeStr;
    },

    testDayCNs:function($second)
    {
        var d = Math.floor($second /86400);
        var se = $second % 86400;
        var gapTimeStr = "";
        if($second > 86400){
            gapTimeStr = d + uicore.LanguageManager.getString("day") + this.testTimeCN(se);
        }
        else if($second<86400 && $second>=3600)
        {
            gapTimeStr = this.testTimeCN(se);
        }
        else if($second<3600 && $second>=60)
        {
            gapTimeStr = this.testTimeCN(se);
        }
        return gapTimeStr;
    },

    getGapTimeStr:function($bigTime,$smallTime)
    {
        var gapTime = parseInt(($bigTime - $smallTime)/1000);
        var gapTimeStr = "";
        if(gapTime > 604800)
        {
            gapTimeStr = uicore.LanguageManager.getString("day_7");
        }
        else if(gapTime<604800 && gapTime>259200)
        {
            gapTimeStr = uicore.LanguageManager.getString("day_3");
        }else if(gapTime<259200 && gapTime>86400)
        {
            gapTimeStr = uicore.LanguageManager.getString("day_1");
        }
        else if(gapTime<86400 && gapTime>3600)
        {
            gapTimeStr = Math.floor(gapTime/3600) + uicore.LanguageManager.getString("hours_1");
        }
        else if(gapTime<3600 && gapTime>60)
        {
            gapTimeStr = Math.floor(gapTime/60) + uicore.LanguageManager.getString("min_1");
        }else
        {
            gapTimeStr = uicore.LanguageManager.getString("just");
        }
        return gapTimeStr;
    },

    getOverTimeStr:function($bigTime,$smallTime){
        var gapTime = parseInt(($bigTime - $smallTime)/1000);

        var gapTimeStr = "";
        if(gapTime > 86400){
            gapTimeStr = Math.floor(gapTime/86400) + uicore.LanguageManager.getString("day");
        }
        else if(gapTime<86400 && gapTime>=3600)
        {
            gapTimeStr = Math.floor(gapTime/3600) + uicore.LanguageManager.getString("hours");
        }
        else if(gapTime<3600 && gapTime>=60)
        {
            gapTimeStr = this.testTime(gapTime);
        }
        return gapTimeStr;
    },

    getOverTimeStr1:function($bigTime,$smallTime){
        var gapTime = parseInt(($bigTime - $smallTime)/1000);

        var gapTimeStr = "";
        if(gapTime > 86400){
            gapTimeStr = Math.floor(gapTime/86400) + uicore.LanguageManager.getString("day");
        }
        else if(gapTime<86400 && gapTime>=3600)
        {
            gapTimeStr = Math.floor(gapTime/3600) + uicore.LanguageManager.getString("hours");
        }
        else if(gapTime<3600 && gapTime>=60)
        {
            gapTimeStr = this.testTime(gapTime);
        }
        return gapTimeStr;
    },

    getOverTimeDayStr:function($bigTime,$smallTime){
        var gapTime = parseInt(($bigTime - $smallTime)/1000);

        var gapTimeStr = "";
        if(gapTime > 86400){
            gapTimeStr = Math.floor(gapTime/86400+1) + uicore.LanguageManager.getString("day");
        }
        else{
            gapTimeStr = "1" + uicore.LanguageManager.getString("day");
        }
        return gapTimeStr;
    }

}
