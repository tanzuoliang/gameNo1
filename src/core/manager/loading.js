/**
 * Created by ysjwdaypm
 * Date : 2018/9/10.
 * Time : 上午10:47
 */

/**
 启动模块
 **/

var loading = (function () {


    function Loader(){
        //静态资源 即一直存于内存中的资源
        this.staticRes = null;
        //动态，当前需要 
        this.dynamicRes = null;

        this.loadRes = null;
        this.currentFrame = 0;
        this.totalFrames = 0;
        this.isLoading = false;

        this.memoryDic = {};

        this.callBack = null;
    }
    
    Loader.prototype.loadSceneAssets = function (dynamicRes,staticRes,callFunc) {
        this.dynamicRes = dynamicRes.unique();
        this.staticRes = staticRes;

        this.callBack = callFunc;

        this.loadRes = this.dynamicRes.concat(this.staticRes);
        this.loadRes.sort(function (a,b) {
            return resourceSize[a] > resourceSize[b] ? -1 : 1;
        });

        this.isLoading = false;
        this.startup();

    };

    Loader.prototype.appendSceneAssets = function (assets) {
        this.loadRes = this.dynamicRes.concat(assets);
        this.isLoading = false;

        this.totalFrames += assets.length;
        this.IntervalID = setInterval(this.update.bind(this),50);

    };

    Loader.prototype.unloadSceneAssets = function () {
        if(this.dynamicRes){
            for(var i = 0,res,ext,len = this.dynamicRes.length; i < len;i++){
                res = this.dynamicRes[i];
                ext = cc.path.extname(res);
                switch (ext){
                    case ".plist":
                        this.unloadPlist(res);
                        break;

                    case ".png":
                    case ".jpg":
                        this.unloadImg(res);
                        break;

                    case ".ExportJson":
                        ccs.armatureDataManager.removeArmatureFileInfo(res);
                        break;


                }
                cc.log("[loading] unload " + res);
                delete this.memoryDic[res];
            }
        }
        
        
    };

    Loader.prototype.unloadPlist = function (plist) {
        cc.spriteFrameCache.removeSpriteFramesFromFile(plist);
        cc.textureCache.removeTextureForKey(plist.replace(".plist",".png"));
    };

    Loader.prototype.unloadImg = function (img) {
        cc.textureCache.removeTextureForKey(img);
    };
    
    Loader.prototype.startup = function () {
        this.IntervalID = setInterval(this.update.bind(this),50);
        this.currentFrame = 0;
        this.totalFrames = this.dynamicRes.length + (this.staticRes ? this.staticRes.length : 0);

        cc.log("[loading] start to load " + JSON.stringify(this.loadRes));
    };

    //-----------------------------------------------------
    Loader.prototype.update = function (dt) {
        // cc.log("[loading] isLoading = " + this.isLoading);
        if(!this.isLoading){
            this.isLoading = true;
            var res = this.loadRes[this.currentFrame];
            // cc.log("[loading] loadResoirce " + res  + "  frame = " + this.currentFrame);
            if(this.memoryDic[res]){
                this.signalComplete(res);
            }else{
               var ext = cc.path.extname(res);
                switch (ext){
                    case ".plist":
                        this.loadPlist(res);
                        break;
                    case ".png":
                    case ".jpg":
                        this.loadImg(res);
                        break;
                    case ".ExportJson":
                        this.loadAnimation(res);
                        break;
                }
            }
        }
    };


    Loader.prototype.loadPlist = function (plist) {
        var that = this;
        var res = plist.replace(".plist",".png");
        cc.textureCache.addImageAsync(res,function () {
            cc.spriteFrameCache.addSpriteFrames(plist);
            // cc.log("[loading] addSpriteFrames " + plist + "  frame = " + that.currentFrame);
            that.signalComplete(plist);
        });
    };

    Loader.prototype.loadImg = function (img) {
        var that = this;
        cc.textureCache.addImageAsync(img,function () {
            that.signalComplete(img);
        });
    };

    Loader.prototype.loadAnimation = function (res) {
        var that = this;
        ccs.armatureDataManager.addArmatureFileInfoAsync(res,function () {
            that.signalComplete(res);
        },this);
    };

    
    Loader.prototype.signalComplete = function (res) {
        this.currentFrame++;
        this.memoryDic[res] = res;
        if(this.currentFrame >= this.totalFrames){
            this.allComplete();
        }else{
            this.isLoading = false;
            cc.log("[loading] signalComplete " + res);
            signals.event.send(event_pro,Math.floor(100 * this.currentFrame / this.totalFrames));
        }
    };
    
    Loader.prototype.allComplete = function () {
        clearInterval(this.IntervalID);
        cc.log("[loading] allComplete ");
        signals.event.send(event_pro,100);
        setTimeout(function () {
            signals.event.send(event_com);
        },200);

        this.callBack && this.callBack();
    };

    var event_pro = "load_pro";
    var event_com = "load_com";
    return {
        scene : new Loader(),
        module : new Loader(),
        PROGRESS : event_pro,
        COMPLETE : event_com
    };

})();
