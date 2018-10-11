/**
 * Created by Elendil on 2016/11/22.
 */
var uicore = uicore ||{};

uicore.HeroIcon = uicore.Pane.extend({
    _data:null,
    colorImage:null,
    bgImage:null,
    proImage:null,
    clearArr:[],
    activation_icon:null,
    ctor:function(){
        this._super();
        this.width = 124;
        this.height = 167;
        this.anchorX = .5;
        this.anchorY = .5;
        this.setUITouchEnabled(true);
    },

    beClick:function(){
        this._super();
    },

    initCompleted:function(){
        //this._super();
        // this.setUITouchEnabled(true);
        // this.getRootComponent("sure_btn").y = -33;
    },

    setData:function(data){
        this._data = data;
    },

    setStar:function(data){
        var con = uicore.ConfigManagerL.getOneMonsterInfoConfig(data.cid);

        var levelBackImage = ccui.ImageView.create("kapai_zujian_1.png",1);
        levelBackImage.x = 71;
        levelBackImage.y = 91;
        this.addChild(levelBackImage,80);

        // var levelImage = ccui.ImageView.create("res/"+ uicore.LanguageManager.languageFlag + "/ui/module/kapai_DJDK_01.png");
        // levelImage.x = 28;
        // levelImage.y = 35;
        // this.addChild(levelImage,80);

        var levelText = ccui.Text.create();
        levelText.setFontSize(25);
        ccui.textFontTTF(levelText);
        ccui.enableOutline(cc.color(29,29,29,255),levelText,2);
        levelText.setString(data.level);
        // levelText.x = 14 + levelText.width/2;
        levelText.y = 31;
        levelText.x = 35 - levelText.width + 18 + (levelText.width - 26);
        this.addChild(levelText,81);

        var star_icon;
        if(con.type == 2){              //英雄
            star_icon = ccui.ImageView.create("icon_jitui_02.png",1);
        }else{
            star_icon = ccui.ImageView.create("icon_KPFY_02.png",1);
        }
        star_icon.x = 20;
        star_icon.y = 155;
        this.addChild(star_icon,86);

        var starText = ccui.Text.create();
        starText.setFontSize(30);
        ccui.textFontTTF(starText);
        ccui.enableOutline(cc.color(149,35,14,255),starText,2);
        starText.setString(con.star);
        if(con.type == 2){              //英雄
            starText.x = star_icon.x + star_icon.width/2 - 22;
            starText.y = star_icon.y + 7;
        }else{
            starText.x = star_icon.x + star_icon.width/2 - 20;
            starText.y = star_icon.y;
        }

        this.addChild(starText,87);

        //设置种族
        var raceStr = "icon_BSZ_01.png";
        switch (con.race){
            case 1:
                raceStr = "icon_RZ_01.png";
                break;
            case 2:
                raceStr = "icon_JLZ_01.png";
                break;
            case 3:
                raceStr = "icon_BSZ_01.png";
                break;
        };

        var racelImage = ccui.ImageView.create(raceStr,1);
        racelImage.x = 111;
        racelImage.y = 35;
        this.addChild(racelImage,88);

        var line_icon = ccui.ImageView.create("res/"+ uicore.LanguageManager.languageFlag + "/ui/arena/icon_ZH_01.png");
        line_icon.scaleX = 0.5;
        line_icon.scaleY = 0.5;
        line_icon.x = 23;
        line_icon.y = 158;
        this.addChild(line_icon,98);

        if(data.isLine){
            line_icon.setVisible(true);
        }
        else{
            line_icon.setVisible(false);
        }

        // var a1 = cc.moveBy(0.5, cc.p(0, 8));
        // var action2 = cc.sequence( a1.clone(), a1.reverse(), cc.delayTime(0.25)).repeatForever();
        // this.levelUpImage.runAction(action2);
    },

    setShaderUI:function(curUI){
        curUI.setShaderProgram(cc.ShaderCache.getInstance().getProgram("ShaderUIGrayScale"));
    },

    //职业图标
    setBase:function(data){
        var battle_icon = ccui.ImageView.create("icon_pros_" + data + ".png",1);
        battle_icon.x = 38;
        battle_icon.y = 145;
        this.addChild(battle_icon,85);
    },

    /**
     * 卡牌选择
     * @param bool
     */
    setActivationIcon:function (bool) {
        this.activation_icon = null;
        if(!this.activation_icon) {
            this.activation_icon = ccui.ImageView.create("res/" + uicore.LanguageManager.languageFlag + "/ui/module/tongyong_KPXK_01.png");
            this.activation_icon.scaleX = 0.9;
            this.activation_icon.scaleY = 0.93;
            this.activation_icon.x = 67;
            this.activation_icon.y = 94;
            this.addChild(this.activation_icon, 99);

            var cb = cc.callFunc(this.goFadeOut.bind(this));
            var fade = cc.fadeOut(1);
            var action = cc.sequence(fade, cb);
            this.activation_icon.runAction(action);
        }
        if(this.activation_icon){
            this.activation_icon.setVisible(bool);
        }
    },

    goFadeOut:function ($sender) {
        var cb = cc.callFunc(this.goFadeIn.bind(this));
        var fade = cc.fadeIn(1);
        var action = cc.sequence(fade, cb);
        this.activation_icon.runAction(action);
    },

    goFadeIn:function ($sender) {
        var cb = cc.callFunc(this.goFadeOut.bind(this));
        var fade = cc.fadeOut(1);
        var action = cc.sequence(fade, cb);
        this.activation_icon.runAction(action);
    },

    //
    setIcon:function(data){
        this.removeAllChildren();
        for(var i=0;i<this.clearArr.length;i++){
            if(this.clearArr[i] == data.id){
                var numText = ccui.Text.create();
                numText.setFontSize(24);
                numText.x = 70;
                numText.y = 70;
                numText.setString(data.id);
                this.addChild(numText,84);
                return;
            }
        }

        if(data.id == 666666){
            return;
        }
        if(data.icon) {
            var icon = ccui.ImageView.create(data.icon + "_pic.png", 1);
            icon.x = 71;
            icon.y = 92;
            this.addChild(icon, 80);
        }
        this.setCardColor(data.color);
        if(data.state == 1){
            this.setStar(data);
            if(!data.bigStar)
                return;
            this.setStarLevel(data.bigStar);
        }
        else if(data.state == 0){
            this.setNoHave(data);
            this.setShaderUI(icon);
            this.setShaderUI(this._itemColor);
        }
        else {

        }

        // var con = uicore.ConfigManagerL.getOneMonsterInfoConfig(data.cid);
        // this.setBase(con.classify);
        // this.getRootComponent("Label_74").setString(data.tatter+"/"+con.need_num);
        // var icon = uicore.Item.create();
        // icon.setItemSize(120);
        // icon.x = 50;
        // icon.y = 50;
        // icon.setItem(con.icon ,0,con.color);
        // this.getRootComponent("card").getChildByName("icon").loadTexture(con.icon + ".png",1);
        // if(data.cid == 12027 || data.cid == 12024){
        //     return;
        // }
        // this.getRootComponent("card").getChildByName("icon").loadTexture("icon_" + data.cid + ".png",1);
        // this.getRootComponent("card").getChildByName("icon").scaleX = 0.8;
        // this.getRootComponent("card").getChildByName("icon").scaleY = 0.8;
        // this.getRootComponent("card").getChildByName("level").setString("LV. " + data.level);
        // ccui.enableOutline(cc.color(0,0,0,255),this.getRootComponent("card").getChildByName("level"));
    },

    _itemColor:null,
    setCardColor:function (color) {
        // cc.log("color:" + "kapai_diban_" + color + ".png");
        this._itemColor = ccui.ImageView.create("kapai_diban_" + color + ".png",1);
        this._itemColor.x = 71;
        this._itemColor.y = 92;
        this.addChild(this._itemColor);
    },

    /**
     * 设置升星等级
     * @param starLevel
     */
    setStarLevel:function (starLevel) {
        var imageUrl = "icon_KPXX_01.png";
        if(starLevel > 5){
            starLevel = starLevel - 5;
            imageUrl = "icon_KPXX_02.png";
        }
        for(var i=0;i<starLevel;i++){
            var starImage = ccui.ImageView.create(imageUrl,1);
            starImage.x = 118;
            starImage.y = 150 - 21 * i;
            this.addChild(starImage,98);
        }
    },

    setNoHave:function(data){

        var levelBackImage = ccui.ImageView.create("res/"+ uicore.LanguageManager.languageFlag + "/ui/module/kapai_zujian_1.png");
        levelBackImage.x = 73;
        levelBackImage.y = 91;
        this.addChild(levelBackImage,80);

        var con = uicore.ConfigManagerL.getOneMonsterInfoConfig(data.id);
        var suipian_icon = ccui.ImageView.create("res/"+ uicore.LanguageManager.languageFlag + "/ui/module/icon_suipian_15.png");
        suipian_icon.x = 30;
        suipian_icon.y = 33;
        this.addChild(suipian_icon,83);
        this.setShaderUI(suipian_icon);

        var numText = ccui.Text.create();
        numText.setFontSize(24);
        numText.y = 32;
        numText.setString(data.tatter+"/"+con.need_num);
        numText.x = suipian_icon.x + suipian_icon.width + numText.width/2 - 5;//85
        this.addChild(numText,84);
        this.setShaderUI(numText);

        if(data.tatter >= con.need_num){
            this.setActivationIcon(true);
        }

    },

    onEnter:function(){
        this._super();
    },
});

uicore.HeroIcon.create = function(){
    var d = new uicore.HeroIcon();
    if(d){
        return d;
    }
    return null;
}
