/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
	"project_type": "javascript",
	// "project_type" indicate the program language of your project, you can ignore this field

	"debugMode"     : 1,
	// "debugMode" possible values :
	//      0 - No message will be printed.
	//      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
	//      2 - cc.error, cc.assert, cc.warn will print in console.
	//      3 - cc.error, cc.assert will print in console.
	//      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
	//      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
	//      6 - cc.error, cc.assert will print on canvas, available only on web.

	"showFPS"       : true,
	// Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

	"frameRate"     : 60,
	// "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

	"noCache"       : false,
	// "noCache" set whether your resources will be loaded with a timestamp suffix in the url.
	// In this way, your resources will be force updated even if the browser holds a cache of it.
	// It's very useful for mobile browser debuging.

	"id"            : "gameCanvas",
	// "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

	"renderMode"    : 0,
	// "renderMode" sets the renderer type, only useful on web :
	//      0 - Automatically chosen by engine
	//      1 - Forced to use canvas renderer
	//      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

	"engineDir"     : "frameworks/cocos2d-html5/",
	// In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
	// but if you are using a single engine file, you can ignore it.

	"modules"       : ["cocos2d"],
	// "modules" defines which modules you will need in your game, it's useful only on web,
	// using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
	// For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

	"jsList"        : [
	]
	// "jsList" sets the list of js files in your game.
 }
 *
 */


var tank = {};


var Button = cc.Node.extend({
    ctor : function (label,call) {
        this._super();
        this.listener = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:this.onTouchBegan.bind(this),
            onTouchMoved : this.onTouchMoved.bind(this),
            onTouchEnded:this.onTouchEnded.bind(this)
        });




        var t = this.createView(0,0,cc.color(255,255,255,255),30,30);
        cc.eventManager.addListener(this.listener, t);
        var l = new cc.LabelTTF(label, "Arial", 20);
        l.x = 30;
        l.anchorX = 0;
        l.y = 10;
        this.addChild(l);

        this.call = call;
    },

    createView : function(x,y,c,w,h){
        var l = cc.LayerColor.create(c,w,h);
        l.x = x;
        l.y = y;
        this.addChild(l);
        return l;
    },

    onTouchBegan : function (touch,event) {
        var target = event.getCurrentTarget();
        var locationinNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0,0,s.width,s.height);
        if(cc.rectContainsPoint(rect,locationinNode)){
            target.opacity = 180;
            return true;
        }

        return false;
    },

    onTouchMoved  :function (touch,event) {
    },

    onTouchEnded : function (touch,event) {
        if(this.call){
            this.call();
        }
    }
});

tank.Slide = (function () {

    var __Slider__ = cc.Node.extend({

        leftBar : null,
        rightBar : null,
        label : null,
        slierBar : null,
        listener : null,
        _name : "",

        angleList : null,

        angleIndex : 0,

        __value__ : 0,

        ctor : function (_name) {
            this._super();
            this._name = _name;
            this.listener = cc.EventListener.create({
                event : cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan:this.onTouchBegan.bind(this),
                onTouchMoved : this.onTouchMoved.bind(this),
                onTouchEnded:this.onTouchEnded.bind(this)
            });

            this.leftBar = this.createView(-210,0,cc.color(255,255,255,255),30,30);
            this.rightBar = this.createView(210,0,cc.color(255,255,255,255),30,30);
            this.slierBar = this.createView(0,0,cc.color(255,0,0,255),30,30);

            cc.eventManager.addListener(this.listener.clone(), this.leftBar);
            cc.eventManager.addListener(this.listener.clone(), this.rightBar);
            cc.eventManager.addListener(this.listener.clone(), this.slierBar);

            this.label = new cc.LabelTTF(this._name + ":0", "Arial", 20);
            this.label.setAnchorPoint(cc.p(0,0));
            this.label.x = 250;
            this.addChild(this.label);

            this.angleList = [-180,-90,0,90,180];
        },

        createView : function(x,y,c,w,h){
            var l = cc.LayerColor.create(c,w,h);
            l.x = x;
            l.y = y;
            this.addChild(l);
            return l;
        },

        onTouchBegan : function (touch,event) {
            var target = event.getCurrentTarget();
            var locationinNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0,0,s.width,s.height);
            if(cc.rectContainsPoint(rect,locationinNode)){
                target.opacity = 180;
                return true;
            }

            return false;
        },

        onTouchMoved  :function (touch,event) {
            var target = event.getCurrentTarget();
            if(target != this.slierBar)return;
            var pos = touch.getLocation();
            var _x = pos.x - this.x;
            if(_x > -180 && _x < 180){
                this.slierBar.x = _x;
                this.label.setString(this._name + ":" + _x);
            }
        },

        value : function () {
            return this.slierBar.x;
        },

        intValue : function () {
            return this.__value__;
        },

        onTouchEnded : function (touch,event) {
            var target = event.getCurrentTarget();
            target.opacity = 255;
            if(target == this.rightBar){
                this.slierBar.x = 0;
                this.label.setString(this._name + ":0");
                if(this._name == "px" || this._name == "py"){
                    this.__value__ += 10;
                }

            }
            else if(target == this.leftBar){
                this.angleIndex = ++this.angleIndex % this.angleList.length;
                this.slierBar.x = this.angleList[this.angleIndex];
                this.label.setString(this._name + ":" + this.slierBar.x);

                if(this._name == "px" || this._name == "py"){
                    this.__value__ -= 10;
                }
            }
        }
    });

    __Slider__.create = function (x,y,parent,_name) {
        var s = new __Slider__(_name);
        s.x = x;
        s.y = y;
        parent.addChild(s);
        return s;
    };

    return __Slider__;

})();



var __panel1 = cc.Node.extend({

    xSlider : null,
    ySlider : null,
    zSlider : null,
    skxSlier : null,
    skySlider : null,
    view : null,
    xP : null,
    yP : null,
    attachNode : null,

    ctor : function () {
        this._super();

        // this.addChild(cc.LayerColor.create(cc.color(255,0,0,255),640,1136));

        this.xSlider = tank.Slide.create(200,600,this,"x");
        this.ySlider = tank.Slide.create(200,550,this,"y");
        this.zSlider = tank.Slide.create(200,500,this,"z");

        // this.skxSlier = tank.Slide.create(200,450,this,"scale");
        // this.skySlider = tank.Slide.create(200,400,this,"sky");
        // this.xP = tank.Slide.create(200,350,this,"px");
        // this.yP = tank.Slide.create(200,300,this,"py");
        // this.xP.__value__ = 100 + cc.winSize.width/2;
        // this.yP.__value__ = cc.winSize.height / 2;

        
        // var heroName = "liemoren";
        var heroName = "xuerent";

        var modelName = "res/new/res/3d/" + heroName+ "_idle.c3b";
        // modelName = "res/new/res/3dCard/cardback_dem.c3b";
        // var modelName = "res/test/dafashi_attack.c3b";
        this.view = new jsb.Sprite3D(modelName);
        // this.view.setCullFaceEnabled(false);
        // this.view.setCullFace(gl.FRONT);
        // this.view.scaleX = -1;

        // this.view.enableNewModel();
        // this.view.useOutline();
        // this.view.setPosition(cc.p(200,800));
        this.view.setRotation3D({x:0,y:0,z:0});

        var node = cc.Node.create();
        this.addChild(node);
        node.setPosition3D(cc.math.vec3(300,800,100));

        // this.view.setPosition3D(cc.math.vec3(200,800,10000));
        // this.view.scaleZ = -1;
        // this.view.setOpacity(0);
        // this.view.runAction(cc.repeatForever(cc.sequence([
        //     cc.fadeIn(3),
        //     cc.fadeOut(3)
        // ])));

        // this.view.runAction(cc.fadeIn(3));
        //this.view.setTexture("res/tank/test/canzhanzhe.jpg");
        // this.view.setScale(25);
        // this.view.setVertexZ(1200);
        // var animation = new jsb.Animation3D(modelName);
        // var animate = new jsb.Animate3D(animation);
        // this.view.runAction(cc.RepeatForever.create(animate));
        node.addChild(this.view);
        this.view.setGlobalZOrder(100);


        this.scheduleUpdate();

        // this.view.runAction(cc.repeatForever(cc.sequence([
        //     cc.rotateTo(1,300,300),
        //     cc.rotateTo(1,0,0)
        // ])));

        this.helpNode = cc.Node.create();
        node.addChild(this.helpNode);
        this.helpNode.runAction(cc.repeatForever(cc.sequence([
            cc.moveTo(1,350,350),
            cc.callFunc(function () {
                this.helpNode.y = 0;
            }.bind(this))
        ])));

        //this.attachNode = this.view.getAttachNode("Bone001");

        var actions = [
            ["attack",true],
            ["die",false],
            ["idle",true],
            ["move",true],
            ["chuchang",false],
            ["skill",true]];
        for(var i = 0; i < actions.length;i++){
            var bu = new Button(actions[i][0],this.playAction.bind(this, actions[i],heroName));
            bu.x = 200;
            bu.y = 400 - i * 40;
            this.addChild(bu);
        }


    },

    playAction : function (animate,heroName) {
        this.view.stopAllActions();
        var ani = new jsb.Animate3D(new jsb.Animation3D("res/new/res/3d/" + heroName + "_" + animate[0] + ".c3b"));
        this.view.runAction(animate[1]?cc.RepeatForever.create(ani) : ani);

        ani.registerOnFrameChange(function (frame,total) {
            cc.log("curret play " + animate[0] + " " + frame + " frames total is " + total);
        },1);
    },

    update : function (dt) {
        var _x = this.xSlider.value();
        var _y = this.ySlider.value();
        var _z = this.zSlider.value();
        // var scale = this.skxSlier.value() * 0.1;
        // this.view.setScale(Math.max(0.1,scale));
        // this.view.setRotation3D({x:_x,y:this.helpNode.y,z:_z});
        this.view.setRotation3D({x:_x,y:_y,z:_z});

    }
});






function doTest(){
    cc.director.setProjection(cc.Director.PROJECTION_2D);
    var scene = new cc.Scene();
    cc.director.runScene(scene);
    scene.getDefaultCamera().setPosition3D(cc.math.vec3(0, 0,100));

    var layer = cc.Layer.create();

    scene.addChild(layer);
    layer.addChild(new __panel1());
    // var s = cc.Sprite.create("test");
    // s.attr({
    //     x : 320,
    //     y : 568 + 300,
    //     rotation : 0,
    //     scale : 1.2
    // });
    //
    // var b =  cc.Sprite.create("test");
    // b.attr({
    //     x : 320 - Math.sin(70 / 180 * Math.PI) * 300,
    //     y : 568 + Math.cos(70 / 180 * Math.PI) * 300,
    //     rotation : -70,
    // });
    //
    // layer.addChild(s);
    // layer.addChild(b);
    //
    // var s = cc.Sprite.create("test");
    // s.attr({
    //     x : 320,
    //     y : 568,
    //     rotation : 0,
    //     scale : 0.5
    // });
    //
    // layer.addChild(s);

    // layer.addChild(cc.Sprite.create("res/3d/cike_rl.jpg"));
    // layer.addChild(cc.Sprite.create("res/3d/baoxiangHJ.png"));
    //
    //
    // setTimeout(function () {
    //     cc.log(cc.textureCache.getCachedTextureInfo());
    // },100);


}


function testSet(){
    var p = {
        name:"chen",
        work:function() {
            console.log("wording...");
        },


        _age : base64encode("88"),

        get age(){
            var d = base64decode(this._age);
            cc.log("get val is " + d);
            return parseInt(d);
        },
        set age(val) {
            if (val<0 || val> 100) {//如果年龄大于100就抛出错误
                cc.log("current val is " + val);
                throw new Error("invalid value")
            }else{
                this._age = base64encode(""+val);
                cc.log("set age = " + this._age);
            }
        }
    };


    function A(){};


    var proto = {};
    for(var k in p){
        if(p[k] && typeof p[k] == "undefined")
            continue;
        proto[k] = p[k];
    }

    A.prototype = proto;

    var a = new A();
    a.age = 11;
    cc.log("a.age = " + a.age);
}


function test(){

    cc.director.setProjection(cc.Director.PROJECTION_2D);
    cc.director.setDisplayStats(true);

    var scene = new cc.Scene();
    var layer = new cc.Layer();
    scene.addChild(layer);
    cc.director.runScene(scene);

    // var usingTTF = true;
    // var usingBMF = true;
    //
    // var info = "12345654430987758888888888822225";
    //
    // for(var i = 0; i < 10;i++){
    //     layer.addChild(cc.LabelBMFont.create("+" + Math.floor(10 + Math.random() * 1000000),"res/font/fk_text_zdsh_01.fnt"));
    // }
    //
    // for(var i = 0; i < 10; i++){
    //
    //     var label = cc.Label.create();
    //     label.setDimensions(180, 0);
    //
    //     label.setLineBreakWithoutSpace(true);
    //     label.setGlobalZOrder(10);
    //     if(usingTTF){
    //         label.initWithTTF(info,"res/font/huakanghaibaojianti.TTC",18);
    //     }
    //     else if(usingBMF){
    //         label.setBMFontFilePath("res/font/swordFont2.fnt");
    //         label.setString(info);
    //     }
    //     else{
    //         label.setSystemFontSize(28);
    //         label.setString(info);
    //     }
    //
    //     label.y = 1136;
    //     label.x = 100;
    //     label.setAnchorPoint(cc.p(0,1));
    //     layer.addChild(label);
    //
    // }

    // CrystalEffectManager.test(layer);

    // var b = cc.Sprite("res/HelloWorld.png");
    // b.scale = 0.1;
    // // layer.addChild(b);
    //
    // cc.textureCache.removeTextureForKey("res/HelloWorld.png");
    // b.x = 320;
    // b.y = 586;

    uicore.EffectFile.pushFile("res/uiEffect/levelup_kapai.ExportJson","shuijing");

    var partic =uicore.Effect.new("levelup_kapai");
    layer.addChild(partic);

    partic.x = 320;
    partic.y = 568;

}


function testDrag(){
    var s = new cc.Sprite("res/uiEffect/renlei.png");
    s.anchorX = s.anchorY = 0;

    var node = ui.ViewMutilControl.create(cc.size(600,800),s);

    cc.director.setProjection(cc.Director.PROJECTION_2D);

    var scene = new cc.Scene();
    var layer = new cc.Layer();
    scene.addChild(layer);
    cc.director.runScene(scene);

    layer.addChild(s);
    layer.addChild(node);


}



function showUIEffect(){
    cc.director.setProjection(cc.Director.PROJECTION_2D);

    var scene = new cc.Scene();
    var layer = new cc.Layer();
    scene.addChild(layer);
    /**
     *
     3
     4
     5
     6
     7
     8
     // 转场特效持续两秒
     var transitionTime = 2;
     // 创建下一个场景
     var nextScene = new cc.Scene();
     // 使用下一个场景创建转场特效场景
     var transitionScene = new cc.TransitionProgressInOut(transitionTime, nextScene);
     // 替换运行场景为转场特效场景
     cc.director.runScene(transitionScene);
     */
    var transitionScene = new cc.TransitionProgressInOut(2, scene);
    var transitionScene = new cc.TransitionProgressHorizontal(2, scene);
    var transitionScene = new cc.TransitionProgressHorizontal(2, scene);
    var transitionScene = new cc.TransitionProgressHorizontal(2, scene);
    // var transitionScene = new cc.TransitionPageTurn(2, scene,true);
// 替换运行场景为转场特效场景
//     cc.director.runScene(transitionScene);
    cc.director.runScene(scene);

    var currIndex = 0;
    var ls = [
        "button_auto_pve",
            "chouka",
            "levelup_star",
            "shengxing_single",
            "shengxing_sixstar",
            "shengxing_smallstar",
            "shuijing01",
            "shuijing01A",
            "shuijing02_blue",
            "shuijing02_green",
            "shuijing02_orange",
            "shuijing02_purple",
            "shuijing02_red",
            "shuijing_icon_blue",
            "shuijing_icon_green",
            "shuijing_icon_orange",
            "shuijing_icon_purple",
            "shuijing_icon_red",
            "shuijing_xinyingxiong",
            "shuijingblue",
            "shuijinggreen",
            "shuijingorange",
            "shuijingpurple",
            "shuijingred",
            "zhaohuanback",
            "zhuangbei_A",
            "zhuangbei_B"
        ]
        ;


    for(var key in ls){
        uicore.EffectFile.pushFile("res/uiEffect/" + ls[key] + ".ExportJson","uiEffect");
    }

    var left = new Button("left",function () {
        if(currIndex > 0)
            currIndex--;
        showNew();
    });
    left.x = 20;
    left.y = 40;

    var label = ccui.Text.create();
    label.setFontSize(32);
    label.x = 300;
    label.y = 40;
    layer.addChild(label);

    var right = new Button("right",function () {
        if(currIndex < ls.length  - 1 )
            currIndex++;
        showNew();
    });

    right.x = 540;
    right.y = 40;

    showNew();

    function showNew() {
        layer.removeChildByTag(2);
        var e = uicore.Effect.new(ls[currIndex],1,1);
        e.x = 320;
        e.y = 568;
        // e.setRotation(30);
        // e.setSpeedScale(2);
        layer.addChild(e,1,2);
        label.setString(ls[currIndex]);
    }




    layer.addChild(left);
    layer.addChild(right);
}



function testGLDraw(){
    cc.director.setProjection(cc.Director.PROJECTION_2D);
    var scene = new cc.Scene();
    var layer = new cc.Layer();
    scene.addChild(layer);
    cc.director.runScene(scene);

    // for(var i = 0; i < 1;i++){
    //     var a = new cc.Sprite("res/icon/bfutai_01.png");
    //     a.x = 320,a.y = 568;
    //     layer.addChild(a);
    //     // a.setVertexZ(1400);
    //
    //     // var b = new cc.Sprite("res/icon/bfutai_02.png");
    //     // b.x = 320,b.y = 568;
    //     // layer.addChild(b);
    //
    //
    //     // b.setVertexZ(1025);
    //
    //     // scene.getDefaultCamera().setPosition3D(cc.math.vec3(0, 0,0));
    //     // a.setGlobalZOrder(1);
    // }

    var d = new jsb.Sprite3D("res/new/res/3d/jinglinggong_chuchang.c3b");
    d.x = 320;
    d.y = 310;
    layer.addChild(d);
    d.setRotation3D(cc.math.vec3(30, 0, 0));
    d.setVertexZ(30);
    // d.setGlobalZOrder(100);

    var d = new jsb.Sprite3D("res/new/res/3d/jinglingjinweijun_skill.c3b");
    d.x = 320;
    d.y = 350;
    layer.addChild(d);
    d.setRotation3D(cc.math.vec3(30, 0, 0));
    // d.setVertexZ(-424);
    d.setGlobalZOrder(1);
    
}


function testMask(){
    cc.director.setProjection(cc.Director.PROJECTION_2D);
    var scene = new cc.Scene();
    var layer = new cc.Layer();
    scene.addChild(layer);
    cc.director.runScene(scene);


    var clipNode = cc.ClippingNode.create();
    clipNode.setInverted(true);
    clipNode.setAlphaThreshold(0.5);
    var layerColor = cc.LayerColor.create(cc.color(255,25,0,155),640,1136);
    clipNode.addChild(layerColor);
    var maskLayer = cc.Sprite.create("res/CN/new_ui/common/icon/lock_icon.png");
    maskLayer.x = 320;
    maskLayer.y = 568;
    maskLayer.scale = 2;

    clipNode.setStencil(maskLayer);

    layer.addChild(clipNode);
}

function showPlist(){
    cc.director.setProjection(cc.Director.PROJECTION_2D);
    var scene = new cc.Scene();
    var layer = new cc.Layer();
    scene.addChild(layer);
    cc.director.runScene(scene);
    
    // var plist = "res/icon/itemIcon.plist";
    var plist = "res/skill/104057050.plist";
    cc.spriteFrameCache.addSpriteFrames(plist,plist.replace(".plist",".png"));
    var data = jsb.fileUtils.getStringFromFile(plist);
    var re = /<key>(.*\.png)<\/key>/;
    var list = [];
    do{
        var find = data.match(re);
        if(find){
            list.push(find[1]);
            data = data.replace(find[0],"");
        }
        else{
            break;
        }
    }
    while(true);


    var __WIDTH__ = 300;

    var Item = cc.Node.extend({
        ctor : function (res) {
            this._super();

            // var la = ccui.Layout.create();
            // la.setSize(cc.size(512,512));
            // la.setClippingEnabled(true);
            // this.addChild(la);

            var s = cc.Sprite.create("#" + res);
            this.addChild(s);
            // s.setAnchorPoint(cc.p(0,0));
            // s.setBlendFunc(new cc.BlendFunc(cc.SRC_ALPHA, cc.ONE));

            this.size = s.getContentSize();
            var text = ccui.Text.create();
            text.setString(res + "\n" + JSON.stringify(this.size));
            text.setFontSize(20);
            text.setTextColor(cc.color(255,0,255,255));
            this.addChild(text,1);


            var lay = cc.LayerColor.create(cc.color.WHITE,280,50);
            lay.x = -140;
            lay.y = -25 - 120;

            text.y = -120;

            // lay.scaleX = 1 / this.scaleX;
            // lay.scaleY = 1 / this.scaleY;
            this.addChild(lay);


            // s.scaleX = __WIDTH__ / this.size.width;
            // s.scaleY = __WIDTH__ / this.size.height;
            //
            // text.scaleX = 1 / this.scaleX;
            // text.scaleY = 1 / this.scaleY;

            this.s = s;
        },

        onEnter : function () {
            this._super();
            this.scheduleUpdate();
        },
        update : function (dt) {
            this.s.setBlendFunc(new cc.BlendFunc(cc.ONE, cc.ONE));
        }
    });


    var scroll = ccui.ScrollView.create();
    scroll.setTouchEnabled(true);
    scroll.setDirection(ccui.ScrollView.DIR_VERTICAL);
    scroll.setBounceEnabled(true);

    scroll.setScrollBarEnabled(false);

    scroll.setSize(640,1136);

    var curCol = 0;
    var curRow = 0;

    var totoalCol = 2;
    var totalRow = Math.ceil(list.length / totoalCol);

    cc.log("totalRow = " + totalRow);
    var maxHeight = totalRow * __WIDTH__ + 100;
    scroll.setInnerContainerSize(cc.size(640,maxHeight));
    for(var i = 0; i < list.length;i++){
        var item = new Item(list[i]);
        scroll.addChild(item);
        item.x = (curCol + 0.5) * __WIDTH__;
        item.y = maxHeight - (curRow + 0.5) * __WIDTH__;
        curCol++;
        if(curCol >= totoalCol){
            curCol = 0;
            curRow++;
        }

        // var s = cc.Sprite.create("#"+list[i]);
        // s.x = 320;
        // s.y = 568;
        //
        // scene.addChild(s);
    }



    // layer.addChild(scroll);


    var s = cc.Sprite.create("res/skill/104057050.png");
    s.x = 320;
    s.y = 568;
    scene.addChild(s);

}



var TwoForThree = cc.Node.extend({

    r : 0,

    onEnter : function () {
        this._super();
        this.s = cc.Sprite.create("res/CN/new_ui/common/heroCard/altar_10102.jpg");
        // this.s.addChild(cc.Sprite.create("res/CN/new_ui/common/heroCard/altar_10102.jpg"))
        this.addChild(this.s);
        // this.scheduleUpdate();

        // this.runAction(cc.flipY3D(4));
    },
    
    update : function (dt) {
        this.setRotation3D(cc.math.vec3(0,this.r++,0));
        cc.log("r = " + this.r)
    }
    
});

function test3dRotation() {
    cc.director.setProjection(cc.Director.PROJECTION_2D);
    var scene = new cc.Scene();
    var layer = new cc.Layer();
    scene.addChild(layer);
    cc.director.runScene(scene);

    var s = new TwoForThree();
    layer.addChild(s);
    s.x = 320;
    s.y = 568;
    
    
}



cc.game.onStart = function(){
    // cc.initCrashReport("53c884a523", true);

    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);
    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    // Setup the resolution policy and design resolution size
    cc.view.setDesignResolutionSize(640, 1136, cc.ResolutionPolicy.SHOW_ALL);
    // Instead of set design resolution, you can also set the real pixel resolution size
    // Uncomment the following line and delete the previous line.
    // cc.view.setRealPixelResolution(960, 640, cc.ResolutionPolicy.SHOW_ALL);
    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);


    cc.loader.loadJson("platform.json",function ($errorId,$json)
    {


        core.PluginsManager.LOGIN_URL = $json["game_loginUrl"];

        core.PlatformManager.platform_name = $json["platform_name"];
        core.PlatformManager.platform_type = $json["platform_type"];

        core.PlatformManager.socketURL = $json["socket_url"] || "ws://192.168.10.240"; //182.254.155.127, 192.168.1.240


        core.AssetsManager.onlyLoadCoreJs("src/include/module_core.js","module_core", function () {
            cc.log("222");
            var searchPaths = jsb.fileUtils.getSearchPaths();

            var first_search = searchPaths[0] || "";
            // searchPaths[searchPaths.length]= cc.path.join(first_search,"res/new");881
            searchPaths[1]= "res/new";
            jsb.fileUtils.setSearchPaths(searchPaths);

            core.HttpRequest.setUrl(core.PluginsManager.LOGIN_URL);

            // core.UpdateManager.online_updateFlag = true;
            core.UpdateManager.online_updateFlag = $json.openHotUpdate;
            core.UpdateManager.setUseClass(onlineUpdate.CubeUpdateScene,onlineUpdate.CubeUpdateLayer);
            core.NoticManager.setParserCallback(uicore.NoticeProctol.parse);

            game.GameConst.testUid = 178;

            cc.director.runScene(new main.MainScene());

            
            gameConfig.cubewar_skill_info["102012001"].count_target = 1;




            // sys.dump();
            // sys._application.openURL("http://www.baidu.com");
            //
            // doTest();
            // test();
            // setTimeout(showUIEffect,1000);
            // showPlist();

            // showUIEffect();

            // test3dRotation();

            // testMask();
            // test();
            // setTimeout(test,10000);
            // component.executeTest();
            // testGLDraw();


            // var num = 0;
            // var i = setInterval(function () {
            //     cc.log("hahahah");
            //     num++;
            //     if(num == 10){
            //         clearInterval(i);
            //     }
            // }.bind(this),100);
        });

    });

    
    
    cc.log("111");



};
cc.game.run();

