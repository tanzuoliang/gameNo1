/**
 * Created by Virtue on 16/6/13.
 */
var core = core || {};

core.ModuleManager =
{

    _moduleDic:null,

    init:function ()
    {
        this._moduleDic = this._moduleDic || {};
    },

    /**
     * 开启通用模块（基本算是游戏里要用的通过资源 建议常驻内存）
     * @param $commonRes
     * @param $callback
     */
    addCommonRes:function ($commonRes,$callback)
    {
        this.open(core.ModuleManager.COMMON_MODULE,$commonRes,$callback);
    },

    /**
     *
     * @param $moduleName  模块名
     * @param $loadResourse 资源文件列表
     * @param $callback     成功回调函数
     */
    open:function ($moduleName,$loadResourse,$callback)
    {
        if(this._moduleDic[$moduleName])
        {
            throw new Error("this module has opened--->"+$moduleName);
        }else
        {
            this._moduleDic[$moduleName] = {"resArr":$loadResourse};
            core.AssetsManager.loadResources($loadResourse,$callback);
        }
    },

    /**
     * 关闭开启的模块（释放资源）
     * @param $moduleName 模块名
     */
    close:function ($moduleName)
    {
        if(!this._moduleDic[$moduleName])
        {
            //throw new Error("this module not opened--->"+$moduleName);
        }else
        {
            var needRemoveRes = this._moduleDic[$moduleName]["resArr"];
            core.AssetsManager.removeCache(needRemoveRes);
            delete this._moduleDic[$moduleName];
        }
    },

    /**
     * 给当前已经开启的模块添加新的资源
     * @param $moduleName  模块名
     * @param $resArr      对应模块需要添加的资源列表
     * @param $callback    成功后的回调方法
     */
    addResByMoudleName:function ($moduleName,$resArr,$callback)
    {
        if(this._moduleDic[$moduleName] && this._moduleDic[$moduleName]["resArr"])
        {
            if(!($resArr instanceof Array)) $resArr = [$resArr];
            for(var key in $resArr)
            {
                this._moduleDic[$moduleName]["resArr"].push($resArr[key]);
            }
            core.AssetsManager.loadResources($resArr,$callback);
        }else
        {
            throw new Error("this module no open--->"+$moduleName);
        }
    },
}

core.ModuleManager.COMMON_MODULE = "common";