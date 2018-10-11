/**
 * Created by Virtue on 16/6/3.
 */
var core = core || {};

/*
 cc.loader.loadJson(res.language,function($errorId,$json)
 {
 core.LanguageManager.setLanguageArea(core.LanguageManager.KOREA);

 core.LanguageManager.parserLanguage($json,core.LanguageManager.JSON_TYPE);

 cc.log("语言包测试--"+core.LanguageManager.getText("test_1"));

 cc.log("语言包测试--"+core.LanguageManager.getText("test_2",["hoho","SB"]));
 });
 */
/**
 * 语言管理器
 * @type {{_languageDic: null, _areaName: null, setLanguageArea: core.LanguageManager.setLanguageArea, parserLanguage: core.LanguageManager.parserLanguage, getText: core.LanguageManager.getText, _parserXml: core.LanguageManager._parserXml, _parserJson: core.LanguageManager._parserJson}}
 */
core.LanguageManager =
{
    _languageDic:null,//语言字典

    _areaName:null,//区域设置

    /**
     * 设置语言
     * @param $areaName
     */
    setLanguageArea:function($areaName)
    {
        this._areaName = $areaName;
    },

    /**
     * 解析语言
     * @param $resource
     * @param $type
     */
    parserLanguage:function ($resource,$type)
    {
        if(!this._languageDic)
        {
            this._languageDic = {};
        }
        if(!this._areaName)
        {
            this._areaName = core.LanguageManager.CHINA;
        }

        if($resource)
        {
            switch($type)
            {
                case core.LanguageManager.XML_TYPE:
                    this._parserXml($resource);
                    break;
                case core.LanguageManager.JSON_TYPE:
                    this._parserJson($resource);
                    break;
            }
        }else
        {
            throw new Error("parserLanguage Error");
        }
    },


    /**
     * 根据key获取语言表内部具体内容
     * @param $keyName
     * @param $parameters
     * @returns {string}
     */
    getText:function ($keyName,$parameters)
    {
        if(!this._languageDic)
        {
            throw new Error("LanguageManager no init");
            return;
        }
        var resourceStr = "";
        if(this._languageDic[$keyName] != null)
        {
            resourceStr = this._languageDic[$keyName];
        }else
        {
            resourceStr = resourceStr;
        }
        if($parameters)
        {
            for(var i=0;i<$parameters.length;i++)
            {
                var placeStr = "\\{" + i + "\\}";
                var re = new RegExp(placeStr,"g");
                resourceStr = resourceStr.replace(re,$parameters[i]);
            }
        }
        return resourceStr;
    },

    //--------

    /**
     * 解析xml类型(暂不推荐)
     * @param $resource
     * @private
     */
    _parserXml:function($resource)
    {
        //速度比较慢,不推荐
        throw new Error("LanguageManager-->使用json格式");
    },

    /**
     * 解析json类型
     * @param $resource
     * @private
     */
    _parserJson:function ($resource)
    {
        cc.log("language->parserStart");
        for(var index in $resource)
        {
            var key = $resource[index]["key"];
            if(this._languageDic[key])
            {
                throw new Error("LanguageManager-->_parserJson-->重复key");
            }else
            {
                // this._languageDic[key] = $resource[key];
                this._languageDic[key] = $resource[index][this._areaName];
            }
        }
        cc.log("language->parserComplete");
    }
};

core.LanguageManager.XML_TYPE = "xml";
core.LanguageManager.JSON_TYPE = "json";

core.LanguageManager.CHINA = "ch"
core.LanguageManager.JAPAN = "jp";
core.LanguageManager.KOREA = "kr";