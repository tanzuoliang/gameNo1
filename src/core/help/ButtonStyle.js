/**
 * Created by chenchengqi on 2017/5/15.
 */
var core = core || {};

core.ButtonStyle = {
    greenTexture:null,
    blueTexture:null,
    yellowTexture:null,
    red01Texture:null,
    disposeTexture:null,

    green:null,
    blue:null,
    yellow:null,
    red01:null,

    greenText:null,
    blueText:null,
    yellowText:null,
    tabbed_1:null,
    tabbed_2:null,
    HeroUpTexture:null,
    HeroDownTexture:null,
    HerodisposeTexture:null,
    initStyle:function () {
        this.greenTexture=uicore.LanguageManager.urlName + "/common/button/common_btn_green_up.png";
        this.greenTexturedown=uicore.LanguageManager.urlName + "/common/button/common_btn_green_down.png";
        this.yellowTextureup= uicore.LanguageManager.urlName + "/common/button/common_btn_yelllow_up.png";
        this.yellowTexturedown=uicore.LanguageManager.urlName + "/common/button/common_btn_yelllow_down.png";
        this.yellowTexturedispose=uicore.LanguageManager.urlName + "/common/button/common_btn_gray.png";
            this.blueTexture=uicore.LanguageManager.urlName + "/common/button/common_btn_green_up.png";
        this.red01Texture = uicore.LanguageManager.urlName + "/common/button/common_btn01_red_up.png";
           // this.yellowTexture="res/" + uicore.LanguageManager.languageFlag + "/ui/module/button_HS_01.png";
           //  this.disposeTexture="res/" + uicore.LanguageManager.languageFlag + "/ui/module/button_HS_07.png";//old code
            this.disposeTexture="res/" + uicore.LanguageManager.languageFlag + "/new_ui/common/button/common_btn_gray.png";
            var tabbedTexture1_normal = "res/" + uicore.LanguageManager.languageFlag + "/ui/module/button_DB_01.png";
            var tabbedTexture1_down = "res/" + uicore.LanguageManager.languageFlag + "/ui/module/button_DB_03.png";

            this.HeroUpTexture="res/" + uicore.LanguageManager.languageFlag + "/ui/module/button_YXFY_01.png";
            this.HeroDownTexture="res/" + uicore.LanguageManager.languageFlag + "/ui/module/button_YXFY_02.png";
            this.HerodisposeTexture="res/" + uicore.LanguageManager.languageFlag + "/ui/module/button_YXFY_03.png";


            this.byellowTexture="res/" + uicore.LanguageManager.languageFlag + "/ui/module/button_HS_01.png";
            this.bbuleTexture="res/" + uicore.LanguageManager.languageFlag + "/ui/module/button_LS_04.png";
            this.bdisposeTexture="res/" + uicore.LanguageManager.languageFlag + "/ui/module/button_HS_08.png";

            this.buleSelectTexture = uicore.LanguageManager.urlName + "/module/bag/warehouse_tab_select.png";
            this.buleDisposeTexture = uicore.LanguageManager.urlName + "/module/bag/warehouse_tab_unselect.png";

            this.redSelectTexture = uicore.LanguageManager.urlName + "/common/button/common_btn_red_up.png";
            this.redDisposeTexture = uicore.LanguageManager.urlName + "/common/button/common_btn_gray.png";

            this.yellowBnormalTexture = uicore.LanguageManager.urlName + "/common/button/common_btn02_up.png";
            this.yellowBSelectTexture = uicore.LanguageManager.urlName + "/common/button/common_btn02_down.png";
            this.yellowBDisposeTexture = uicore.LanguageManager.urlName + "/common/button/common_btn02_gray.png";

        this.red01 =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":1},"texture":this.red01Texture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":1},"texture":this.red01Texture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":1},"texture":this.disposeTexture,"font":1}];

        this.green =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.greenTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.greenTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.disposeTexture,"font":1}];

        this.green1 =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.greenTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.greenTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.disposeTexture,"font":1}];

        this.green2 =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.greenTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.greenTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.disposeTexture,"font":1}];

        this.blue1 =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.blueTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.blueTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.disposeTexture,"font":1}];

        this.blue=[{"color":cc.color(12,61,107,255),"texture":this.blueTexture,"font":1},
            {"color":cc.color(12,61,107,255),"texture":this.blueTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"texture":this.disposeTexture,"font":1}];

         this.yellow=[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.yellowTextureup,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"texture":this.yellowTexturedown,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"texture":this.disposeTexture,"font":1}];

        this.tabbed_hero =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"texture":this.HeroUpTexture,"font":1},
            {"color":cc.color(217,184,114,255),"texture":this.HeroDownTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"texture":this.HerodisposeTexture,"font":1}];

        this.greenText =[{"color":cc.color(6,83,26,255),"font":1},
            {"color":cc.color(6,83,26,255),"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1}];

        this.blueText =[{"color":cc.color(12,61,107,255),"font":1},
            {"color":cc.color(12,61,107,255),"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1}];

        this.yellowText =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1}];


        this.tabbed_1 =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"font":1}];

        this.tabbed_2 =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1}];

        this.tabbed_3 =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(6,83,26,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1}];

        this.tabbed_4 =[{"color":cc.color(0,0,0,130),"font":1},
            {"color":cc.color(255,255,255,255),"shadow":{},"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1}];

        this.tabbedColor_1 =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(204,204,204,204),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1}];

        this.tabbedColor_2 =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(204,204,204,204),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1}];

        this.tabbedColor_3 =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(204,204,204,204),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1}];

        this.tabbedColor_4 =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(204,204,204,204),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1}];

        this.tabbedColor_5 =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(204,204,204,204),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1}];

        this.tabbed_7 =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1},
            {"color":cc.color(6,83,26,255),"outline":{"color":cc.color(0,0,0,82),"size":3},"font":1}];

        this.tabbed_8 =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"font":1},
            {"color":cc.color(6,83,26,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"font":1}];


        this.byellow =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.byellowTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.byellowTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.bdisposeTexture,"font":1}];

        this.bbule =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.bbuleTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.bbuleTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.bdisposeTexture,"font":1}];

        this.greenbtn =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.greenTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.greenTexturedown,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.yellowTexturedispose,"font":1}];

        this.yellowbtn =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.yellowTextureup,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.yellowTexturedown,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.yellowTexturedispose,"font":1}];

        this.bulebtn =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.buleSelectTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.buleSelectTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.buleDisposeTexture,"font":1}];

        this.redbtn =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.redSelectTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.redSelectTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.redDisposeTexture,"font":1}];

        this.bigYellowBtn =[{"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.yellowBnormalTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.yellowBSelectTexture,"font":1},
            {"color":cc.color(255,255,255,255),"outline":{"color":cc.color(0,0,0,82),"size":2},"texture":this.yellowBDisposeTexture,"font":1}];
    },



}
