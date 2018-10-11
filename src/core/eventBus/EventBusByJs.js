/**
 * Created by Virtue on 17/2/7.
 */

var eventBus = eventBus || {};

eventBus.EventBusByJs = (function() {

    function __EVENT_BUS__()
    {
        this._eventBusList = {};
    };

    __EVENT_BUS__.prototype.addEvent = function($eventName,$callback,$target)
    {
        if(!this._eventBusList[$eventName])
            this._eventBusList[$eventName] = [];

        this._eventBusList[$eventName].push([$target,$callback]);

    };

    __EVENT_BUS__.prototype.delEvent = function($eventName,$target)
    {
        if(!this._eventBusList[$eventName])
            return;
        for(var i=0,len = this._eventBusList[$eventName].length; i < len;i++)
        {
            if(this._eventBusList[$eventName][i][0] == $target)
            {
                this._eventBusList[$eventName].splice(i,1);
                break;
            }
        }
        if(this._eventBusList[$eventName].length == 0)
            delete this._eventBusList[$eventName];
    };

    __EVENT_BUS__.prototype.dispatchEvent = function($eventName,$object)
    {
        if(!this._eventBusList[$eventName])
        {
            cc.log("no event : " + $eventName);
            return;
        };
        var len = this._eventBusList[$eventName].length;
        for(var i = 0; i<len;i++)
        {
            if(this._eventBusList[$eventName][i])
            {
                var target = this._eventBusList[$eventName][i][0];
                var cb = this._eventBusList[$eventName][i][1];
                cb(target,$object);
            }
        }
    };

    __EVENT_BUS__.prototype.getCallbackNumsByName = function ($eventName)
    {
        if(!this._eventBusList[$eventName])
        {
            cc.log("no event : " + $eventName);
            return 0;
        }else
        {
            return this._eventBusList[$eventName].length();
        }

    };

    return new __EVENT_BUS__();
})();