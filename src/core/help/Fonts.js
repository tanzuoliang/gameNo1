/**
 * Created by chenchengqi on 17/4/19.
 */
var core = core || {};
core.font_1 = "res/font/huakangw9.TTF";
core.font_2 = "res/font/SHOWG.ttf";
core.font_3 = "res/font/CubeWarNum.fnt";

/**
 * 蓝色描边
 * @param label
 */
core.fontStyle_blue = function (label) {
    ccui.enableOutline(cc.color(30,57,86,255),label,2);
}

/**
 * 蓝色描边
 * @param label
 */
core.fontStyle_blue1 = function (label,size) {
    ccui.enableOutline(cc.color(23,50,68,255),label,size);
}

/**
 * 咖啡色描边
 * @param label
 */
core.fontStyle_coffee = function (label) {
    ccui.enableOutline(cc.color(21,14,6,255),label,2);
}

/**
 * 黑色描边
 * @param label
 */
core.fontStyle_black = function (label) {
    ccui.enableOutline(cc.color(0,0,0,125),label,2);
}

/**
 * 黑色描边不透明
 * @param label
 */
core.fontStyle_black_1 = function (label) {
    ccui.enableOutline(cc.color(0,0,0,255),label,2);
}

/**
 * 白色描边
 * @param label
 */
core.fontStyle_white = function (label,size) {
    ccui.enableOutline(cc.color(255,255,255,200),label,size);
}

/**
 * 绿色描边
 * @param label
 */
core.fontStyle_green = function (label) {
    ccui.enableOutline(cc.color(25,91,19,200),label,2);
}

/**
 * 棕色描边
 * @param label
 */
core.fontStyle_brown = function (label) {
    ccui.enableOutline(cc.color(112,68,20,255),label,2);
}

/**
 * hong 色描边
 * @param label
 */
core.fontStyle_red1 = function (label) {
    ccui.enableOutline(cc.color(126,14,14,255),label);
}