/**
 * Created by Virtue on 16/11/14.
 */
var core = core || {};

core.NoticManager =
{
    parserCb:null,

    parser:function ($noticeData)
    {
        if(this.parserCb) this.parserCb($noticeData);
    },

    setParserCallback:function ($cb)
    {
        this.parserCb = $cb;
    },

    errorCb:null,

    error:function ($errorData)
    {
        if(this.errorCb) this.errorCb($errorData);
    },

    setErrorCallback:function ($cb)
    {
        this.errorCb = $cb;
    }

}