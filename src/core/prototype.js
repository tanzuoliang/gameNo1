/**
 * Created by ysjwdaypm
 * Date : 2018/5/14.
 * Time : 下午6:05
 */

/**
 启动模块
 **/

(function () {

    /**
     * 关于居中分配公式   (offsetWidth - (size - anchor * 2) * width) * 0.5;
     * 旋转   cosa   -sina    x
     *       sina   cosa      y
     *
     *
     *       (index - size + 1 - ( 0.5 - anchor) * 2) * 0.5 * width
     *       (offsetWidth +  2 * index  + anchor * 2 - size) * width * 0.5   + center.x    //anchor * 2 - size is const
     *
     *
     */
    
    /**
     * 劫持对象方法
     * @param obj 被劫持对象
     * @param methodName 被劫持方法名
     * @param funs 劫持注入方法
     */
    window.robbitMethod = function(obj,methodName,funs){
        var temp = obj[methodName];
        obj[methodName] = function () {
            funs(obj);
            temp.apply(obj,[].splice.call(arguments,0));
        };
    };

    window.overridePrototypeMethod = function (prototype,method,funs) {
        var temp = prototype[method];
        prototype[method] = function(){
            funs(this);
            temp.apply(this,[].splice.call(arguments,0));
        }
    };


    window.robbitCreateMethod = function(obj,callback) {
        if(!obj.__hasCreateRobbit__){
            obj.__hasCreateRobbit__ = true;
            var staticMethod = obj.create;
            obj.create = function () {
                var node = staticMethod.apply(null,[].splice.call(arguments,0));
                if(callback){
                    callback(node);
                }
                return node;
            }
        }
    };
    
    
    window.addChildToCenter = function (con,child,ex,ey) {
        ex = ex || 0;
        ey = ey || 0;
        var size  = con.getContentSize();
        child.x = size.width * 0.5 + ex;
        child.y = size.height * 0.5 + ey;
        con.addChild(child);
    };



    window.offsetCenter = function (con,ex,ey) {
        if(!con.____HAS_OFFSET__){
            ex = ex || 0;
            ey = ey || 0;
            var size  = con.getContentSize();
            con.x += size.width * 0.25 + ex;
            con.y += size.height * 0.25 + ey;

            cc.log("[offsetCenter] width = " + size.width + " , height = " + size.height + "  x = " + con.x + "   y = " + con.y);
            con.____HAS_OFFSET__ = true;
        }
    };


    window.addHelpGrid = function (con,opacity) {
        var node = cc.DrawNode.create();
        node.drawRect(cc.p(0,0),cc.p(con.width,con.height),cc.color(255,0,0,opacity || 255),2);
        con.addChild(node,10000);
    };

    /**
     * 安全删除
     * @param child
     */
    cc.Node.prototype.removeChildSafe = function(child){
        if(cc.sys.isObjectValid(child)){
            this.removeChild(child);
        }
    };

    cc.Node.prototype.isNative = function () {
        return cc.sys.isObjectValid(this);
    };


    ccui.Widget.prototype.removeChildSafe = function(child){
        if(cc.sys.isObjectValid(child)){
            this.removeChild(child);
        }
    };

    ccui.Widget.prototype.setVirtualGlobalZOrder = function (num) {
        this.getVirtualRenderer().setGlobalZOrder(num);
    };

    ccui.Widget.prototype.setVirtualVertexZ = function (num) {
        this.getVirtualRenderer().setVertexZ(num);
    };

    cc.Node.prototype.removeFromParentSafe = function(){
        if(cc.sys.isObjectValid(this)){
            this.removeFromParent();
        }
    };

    cc.Node.prototype.setVisibleSafe = function(vs){
        if(cc.sys.isObjectValid(this)){
            this.setVisible(vs);
        }
    };

    cc.Node.prototype.scheduleSafe = function (callFunc,time) {
        if(cc.sys.isObjectValid(this)){
            this.schedule(callFunc,time);
        }
    };

    cc.Node.prototype.isObjectValid = function () {
        return cc.sys.isObjectValid(this);
    };



    // ccui.ScrollView.prototype._ctor = function(size, container)
    // {
    //     this.setScrollBarEnabled(false);
    //     size == undefined ? this.init() : (container ? this.initWithViewSize(size, container) : this.initWithViewSize(size));
    // };

    window.overridePrototypeMethod(ccui.ScrollView.prototype,"_ctor",function (node) {
        node.setScrollBarEnabled(false);
    });

    window.robbitCreateMethod(ccui.ScrollView,function (node) {
        node.setScrollBarEnabled(false);
    });

    //--------------------------------------------------------------
    /**
     * 将数组转换成整数
     */
    Array.prototype.toInt = function () {
        for(var i = 0  , len = this.length ; i < len; i++){
            if(typeof this[i] === "string"){
                var code = this[i].charCodeAt(0);
                if(code >= 48 && code <= 57){
                    this[i] = parseInt(this[i]);
                }
            }
        }

        return this;
    };

    Array.prototype.union = function (list) {
        for(var i = 0 , len = list.length; i < len;i++){

            this[this.length] = list[i];
        }

        return this;
    };

    Array.prototype.unique = function (){
        var a,b;
        for(var i = 0; i < this.length;i++){
            a = this[i];
            for(var k = i + 1; k < this.length;k++){
                b = this[k];
                if(a == b){//get some
                    this[k] = this[this.length - 1];
                    this.length--;
                    k--;
                }
            }
        }
        return this;
    };



    Array.prototype.multiple = function (times) {

        var ret = [];

        for(var i = 0; i < times;i++){
            for(var j = 0; j < this.length;j++){
                ret.push(this[j]);
            }
        }

        for(var i = 0;i < ret.length;i++){
            this.push(ret[i]);
        }

        return this;
    };


    Array.prototype.addPrefix = function (prefix) {
        for(var i = 0,len = this.length; i < len;i++){
            this[i] = prefix + this[i];
        }

        return this;
    };


    cc.rectToString = function (rect) {
        return JSON.stringify(rect);
    };

    // Array.prototype.forEach
    //-------------------------------------------------------------

    String.prototype.splitToInt = function (separator) {
        return this.split(typeof separator === "undefined" ? "," : separator).toInt();
    };

    String.prototype.asciiLength = function () {
        var lsC = this.match(new RegExp("[\\u4E00-\\u9FFF]","g"));
        var lsE = this.match(new RegExp("[^\\u4E00-\\u9FFF]","g"));

        return 2 * (lsC ?  lsC.length : 0) + (lsE ? lsE.length : 0);
    };

    String.prototype.invalidFilter = function () {
        // return this.replace(new RegExp("[^\\u4E00-\\u9FFF|0-9|a-z|A-Z|!-/]","g"),"");
        return this.replace(new RegExp("[^\\u4E00-\\u9FFF!-~]","g"),"");
    };

    Number.prototype.split = function(separator){
        return this.toString().split(typeof separator === "undefined" ? "," : separator);
    };

    Number.prototype.splitToInt = function(){
        return [this];
    };

    Number.prototype.ceil = function(){
        return Math.ceil(this);
    };

    Number.prototype.round = function(){
        return Math.round(this);
    };

    Number.prototype.floor = function(){
        return Math.floor(this);
    };


    cc.spriteFrameCache.addSpriteFrames = cc.spriteFrameCache.addSpriteFrames || function(){};

    /**
     * CCArmature l:429
     *          auto children = skin->getChildren();
                for(auto child : children){
                    if(child->getTag() == 10){
                        child->visit(renderer, transform, flags);
                    }
                }
     CCSkin l:142
               for(auto child : this->getChildren()){
                    if(child->getTag() == 10){
                    child->setNodeToParentTransform(_transform);
                }
    }

     * 跟随骨动画
     *  var bone = this.crystalBombEffect._animation.getBone("bigcrystal").getDisplayRenderNode();
        var  node = cc.Node.create();
        var spr = cc.Sprite.create("res/skybox/chouka_BG_01.png");
        var rect = bone.getBoundingBox();
        spr.x = rect.width * 0.5;
        spr.y = rect.height * 0.5;
        node.addChild(spr);
        bone.addChild(node,10,10);
        cc.log("add bone succ " + JSON.stringify(rect));

     */


    ccui.Text.prototype.setStringSafe = function (str) {
        cc.sys.isObjectValid(this) &&  this.setString(str);
    };



})();


function defineProperty(obj,proto,value) {
    Object.defineProperty(obj, proto, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: value
    });
}