/**
 * Created by imac on 2017/7/26.
 */
var uicore = uicore || {};

/*
 var str = "<Text  color=ff00ff fontSize=32 fontName=res/new_ui/fnt/tank_bold.ttf>ysjwdawda" +
 "</Text><Text  color=0f0ff0 fontSize=32 fontName=res/new_ui/fnt/huakangyuantiW7.TTF>如果有一天你知道那么多你就去死吧</Text><Image src=res/new_ui/icon/icon_dwpindao_01.png></Image>" +
 "<Text>testinfo</Text><Image src=res/new_ui/icon/icon_jiangbei_01.png color=ffffff></Image>" +
 "<Text color=ff0000 fontSize=50>前端程序真他妈的苦逼</Text>";


 var node = showRichtext(str);
 node.x = cc.winSize.width * 0.5 - 200;
 node.y = cc.winSize.height * 0.5 + 200;
 // node.formatText();

*/

uicore.NewRichText = ccui.RichText.extend({
    getTextConfig:function (msg) {
        var config = {"tag":"","text":"","attr":{}};
        var head = msg.match(/<(.+?)>/)[0];
        head = head.replace("<","").replace(">","");
        var list = head.split(" ");
        config.tag = list[0];
        list.shift();

        for(var i = 0,str,l,len = list.length; i < len; i++){
            str = list[i];
            if(str != ""){
                str.trim();
                l = str.replace(/\s+?/g,"").split("=");
                config.attr[l[0]] = l[1];
            }
        }

        config.text = msg.replace(/<(.+?)>/,"").replace(/<\/(.+?)>/,"");
        return config;
    },

    get_color:function (str) {
        var r,g,b,a = 255;
        if(str.length == 6){
            r = parseInt(str.substr(0,2),16);
            g = parseInt(str.substr(2,2),16);
            b = parseInt(str.substr(4,2),16);
        }

        if(str.length == 8){
            a = parseInt(str.substr(6,2),16);
        }

        return cc.color(r,g,b,a);
    },

    showRichtext:function (content) {
        var e = /<.+?>.*?<\/.+?>/g
        var list = content.match(e);

        for(var i = 0, config,len = list.length; i < len;i++){
            config = this.getTextConfig(list[i]);
            switch (config.tag){
                case "Text":
                    var color = config.attr.color ? this.get_color(config.attr.color) : cc.color(255,255,255,255);
                    var t = ccui.RichElementText.create(1,color,color.a,config.text,
                        config.attr.fontName || "Arial",
                        config.attr.fontSize? parseInt(config.attr.fontSize) : 12);
                    this.pushBackElement(t);
                    break;
                case "Image":
                {
                    var color = config.attr.color ? this.get_color(config.attr.color) : cc.color(255,255,255,255);
                    var t = ccui.RichElementImage.create(2,color,color.a,config.attr.src);
                    this.pushBackElement(t);
                }
                    break;
            }
        }
    },

});

uicore.NewRichText.create = function(content){
    var d = new uicore.NewRichText();
    d.showRichtext(content);
    if(d){
        return d;
    }
    return null;
}


// uicore.RichText = function() {
//     function getTextConfig(msg){
//         var config = {"tag":"","text":"","attr":{}};
//         var head = msg.match(/<(.+?)>/)[0];
//         head = head.replace("<","").replace(">","");
//         var list = head.split(" ");
//         config.tag = list[0];
//         list.shift();
//
//         for(var i = 0,str,l,len = list.length; i < len; i++){
//             str = list[i];
//             if(str != ""){
//                 str.trim();
//                 l = str.replace(/\s+?/g,"").split("=");
//                 config.attr[l[0]] = l[1];
//             }
//         }
//
//         config.text = msg.replace(/<(.+?)>/,"").replace(/<\/(.+?)>/,"");
//         return config;
//     }
//
//     function get_color(str) {
//         var r,g,b,a = 255;
//         if(str.length == 6){
//             r = parseInt(str.substr(0,2),16);
//             g = parseInt(str.substr(2,2),16);
//             b = parseInt(str.substr(4,2),16);
//         }
//
//         if(str.length == 8){
//             a = parseInt(str.substr(6,2),16);
//         }
//
//         return cc.color(r,g,b,a);
//     }
//
//     function showRichtext(content){
//         var e = /<.+?>.*?<\/.+?>/g
//         var list = content.match(e);
//
//         var uiRichText = new ccui.RichText();
//         uiRichText.setAnchorPoint(cc.p(0,1));
//         uiRichText.setContentSize(cc.size(300,200));
//         uiRichText.ignoreContentAdaptWithSize(false);
//
//         for(var i = 0, config,len = list.length; i < len;i++){
//             config = getTextConfig(list[i]);
//
//             switch (config.tag){
//                 case "Text":
//                     var color = config.attr.color ? get_color(config.attr.color) : cc.color(255,255,255,255);
//                     var t = ccui.RichElementText.create(1,color,color.a,config.text,
//                         config.attr.fontName || "Arial",
//                         config.attr.fontSize? parseInt(config.attr.fontSize) : 12);
//                     uiRichText.pushBackElement(t);
//                     break;
//                 case "Image":
//                 {
//                     var color = config.attr.color ? get_color(config.attr.color) : cc.color(255,255,255,255);
//                     var t = ccui.RichElementImage.create(2,color,color.a,config.attr.src);
//                     uiRichText.pushBackElement(t);
//                 }
//                     break;
//             }
//         }
//
//         return uiRichText;
//     }
//
// };