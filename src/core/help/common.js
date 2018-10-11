/**
 * Created by RockLee on 16/6/13.
 */
/**
 * Created by wbsifan on 14-6-18.
 */
/**
 * 公共函数库
 *      .基础对象方法扩展
 *      .其它通用方法
 */

/**
 * 判断数组中是否存在某个值
 * @param value
 * @returns {boolean}
 */
Array.prototype.hasValue = function(value) {
	if (this.indexOf(value) != -1) {
		return true;
	} else {
		return false;
	}
}

/**
 * 用占位符格式化字符串
 * @param data
 * @param defaultReplaceStr	默认替换的字符
 * @exp
 *      var args = {"a" : "1111", "b": "22222", "c":"333333"};
 *      console.log("测试{a}, 这是第二个{b}, 第三个{c}".format(args));
 * @returns {String}
 */
String.prototype.format = function(data, defaultReplaceStr) {
	var str = this.replace(/(\{(.+?)\})/g, function() {
		if(!data)
			return;
		if (data[arguments[2]]) {
			return data[arguments[2]];
		} else {
			if (defaultReplaceStr) {
				return defaultReplaceStr;
			} else {
				return arguments[1];
			}
		}
	});
	return str;
};

/**
 * 将一个Object转换成Array
 * @param obj
 * @returns Array
 */
function parseArray(obj) {
	if (obj instanceof Array) {
		return obj;
	}
	var tmpArr = [];
	for (var i in obj) {
		tmpArr[tmpArr.length] = obj[i];
	}
	return tmpArr;
}


/**
 * 数值排序
 * @param arr 要处理的数组
 * @param dir {dirA: 'desc', dirB: 'asc'} 排序键值:升序(降序)
 */
function arraySort(arr, dir) {
	arr.sort(function(a, b) {
		for (var k in dir) {
			if (a[k] == b[k]) {
				continue;
			} else {
				if (dir[k] == 'asc') {
					return a[k] - b[k];
				} else {
					return b[k] - a[k];
				}
			}
		}
	});
}


/**
 * 将序列字符串转换成对象
 * @param str  1:2|a:1|c:2 => {1:2, a:1, c:2}
 */
function strToObject(str) {
	var obj = {};
	if (!str) {
		return obj;
	}
	var tmp = str.toString().split("|");
	for (var i=0;i<tmp.length;i++) {
		var arr = tmp[i].toString().split(":");
		if(arr.length > 1){
			obj[arr[0]] = arr[1];
		}
		else{
			obj[0] = arr[0];
		}
	}
	return obj;
}

/**
 * 将序列字符串转换成对象
 * @param str  "2:mexp:100|2:coin:100" => [["2","mexp","100"],["2","coin","100"]]
 */
function strToArr(str) {
	var dataArr = [];
	if (!str) {
		return dataArr;
	}
	var tmp = str.toString().split("|");
	for (var i=0;i<tmp.length;i++) {
		dataArr[i] = tmp[i].toString().split(":");
	}
	return dataArr;
}

function getAttributeStr(name,num) {
    var lang = uicore.ConfigManagerL.getCnLanguage();
    var str;
    if(lang[name].intro){
    	str = lang[name].value + ":" + num + lang[name].intro;
	}
	else{
        str = lang[name].value + ":" + num;
	}

    return str
}

/**
 * 统计一个Object或者Array的元素数量
 * @param obj
 * @returns {Queue.length|*|length|Number|number|b.length}
 */
function count(obj) {
	var tmpArr = parseArray(obj);
	return tmpArr.length;
}

cc.isObj = function(data){
	if(!data)
		return;

	var p = 0;
	for(var i in data){
		p++;
	}

	if(p){
		return true;
	}
}

/**
 * 是否显示几位小数数值 如1.00 = 1
 * @param str
 * @returns {*}
 */
function checkNum(str) {
	var bstr = str.toString();
	var num;
	for (var i=0;i<str.length;i++) {
		if(bstr.substr(bstr.length-2,1) == "0" && bstr.substr(bstr.length-1,1) != "0"){
			num = bstr.toString().split(".")[0] + "." + bstr.substr(bstr.length-2,1) + bstr.substr(bstr.length-1,1)
		}
		else if(bstr.substr(bstr.length-2,1) == "0" && bstr.substr(bstr.length-1,1) == "0"){
			num = bstr.toString().split(".")[0];
		}
		else if(bstr.substr(bstr.length-2,1) != "0" && bstr.substr(bstr.length-1,1) == "0"){
			num = bstr.toString().split(".")[0] + "." + bstr.substr(bstr.length-2,1);
		}
		else{
			num = bstr.toString().split(".")[0] + "." + bstr.substr(bstr.length-2,1) + bstr.substr(bstr.length-1,1);
		}
	}
	return num;
}

cc.trace = function(data,type){
	// return;
	type = type || 'trace';
	if(!data)
		return;

	if(!data.hasOwnProperty("setInfoData")){
		cc.log(type + "::" + JSON.stringify(data));
	}
}

cc.random = function (min, max) {
	min = min || 0;
	max = max || 1;
	return (min + (Math.random() * (max - min)));
}

cc.max = function(a,b){
	return a > b ? a : b;
}

cc.min = function(a,b){
	return a < b ? a : b;
}

cc.clone = function (obj) {
	if(!obj)
		return;
	var newObj = (obj.constructor) ? new obj.constructor : {};
	for (var key in obj) {
		var copy = obj[key];
		// Beware that typeof null == "object" !
		if (((typeof copy) == "object") && copy &&
			!(copy instanceof cc.Node) && !(copy instanceof HTMLElement)) {
			newObj[key] = cc.clone(copy);
		} else {
			newObj[key] = copy;

		}
	}
	return newObj;
}


cc.exit = function(){
	plugins.PluginsManager.logout();
}

cc.login = function(){
	
}

ccui.TextShadow = function(label){
	label && label.enableShadow(cc.color(0,0,0,255),cc.size(1,-2),3);
}

ccui.enableOutline = function(color,label,size,where){
	if(!size)size = 3;
	label && label.enableOutline(color,size);
	!label && cc.log("find null label from " + where);
}

ccui.disableEffect = function(label){
	label && label.disableEffect();
}

/**
 * 图片灰态
 * @param curUI
 */
ccui.setShaderUI = function(curUI){
	curUI.setShaderProgram(cc.ShaderCache.getInstance().getProgram("ShaderUIGrayScale"));
};

ccui.setNormalUI = function(curUI){
	curUI && curUI.setShaderProgram(cc.ShaderCache.getInstance().getProgram("ShaderPositionTextureColor_noMVP"));
};
/**
 * 设置按钮可按或者不可以按
 * @param $btn				//按钮
 * @param $type				//是否能按
 */
ccui.setButLight = function($btn,$type){
    $btn.setEnabled($type);
    $btn.setBright($type);
}

/**
 * 设置数字文本
 * @param text				//文本
 * @param str				//内容
 */
ccui.setTextInfo = function(text,str){
	var string = String(str);
	text.setString(ccui.numText(string));
}

ccui.setChildTextFontTTF = function(child,type){
    var index = child.getChildren().length;
    var arr = child.getChildren();
    for(var i=0;i<index;i++){
        ccui.textFontTTF(arr[i]);
	}
}

ccui.textFontTTF = function(child,type){
	if(!child)return;
	if(child.setFontName){
		switch (type){
			case 1:
				child.setFontName(core.font_1);
				break;
			case 2:
				child.setFontName(core.font_2);
				break;
			case 3:
				child.setFontName(core.font_3);
				break;
			default:
				child.setFontName(core.font_1);
				break;
		}
	}

	if(child.setTitleFontName){
		switch (type){
			case 1:
				child.setTitleFontName(core.font_1);
				break;
			case 2:
				child.setTitleFontName(core.font_2);
				break;
			case 3:
				child.setTitleFontName(core.font_3);
				break;
			default:
				child.setTitleFontName(core.font_1);
				break;
		}
	}
}

ccui.numText = function(num){
	var dataArr = num.toString().split("/");
    var st = null;
	for(var i=0;i<dataArr.length;i++){
		var str;
        if(dataArr[i] >= 1000){
            var qnumber = Math.floor(dataArr[i]/1000);
            var bnumber = Math.floor(dataArr[i]/10);
            var bstr = bnumber.toString();

            if(bstr.substr(bstr.length-2,1) == "0" && bstr.substr(bstr.length-1,1) != "0"){
                str = qnumber + "." + bstr.substr(bstr.length-2,1) + bstr.substr(bstr.length-1,1) + uicore.LanguageManager.getString("qian");
            }
            else if(bstr.substr(bstr.length-2,1) == "0" && bstr.substr(bstr.length-1,1) == "0"){
                str = qnumber + uicore.LanguageManager.getString("qian");
            }
            else if(bstr.substr(bstr.length-2,1) != "0" && bstr.substr(bstr.length-1,1) == "0"){
                str = qnumber + "." + bstr.substr(bstr.length-2,1) + uicore.LanguageManager.getString("qian");
            }
            else{
                // st = qnumber + "." + bstr.substr(bstr.length-2,1) + bstr.substr(bstr.length-1,1) + uicore.LanguageManager.getString("qian");
                str = qnumber + "." + bstr.substr(bstr.length-2,1) + uicore.LanguageManager.getString("qian");
            }

            //百万
            if(qnumber >= 1000){
                qnumber = Math.floor(dataArr[i]/1000000);
                bnumber = Math.floor(dataArr[i]/10000);
                bstr = bnumber.toString();

                if(bstr.substr(bstr.length-2,1) == "0" && bstr.substr(bstr.length-1,1) != "0"){
                    str = qnumber + "." + bstr.substr(bstr.length-2,1) + bstr.substr(bstr.length-1,1) + uicore.LanguageManager.getString("baiwan");
                }
                else if(bstr.substr(bstr.length-2,1) == "0" && bstr.substr(bstr.length-1,1) == "0"){
                    str = qnumber + uicore.LanguageManager.getString("baiwan");
                }
                else if(bstr.substr(bstr.length-2,1) != "0" && bstr.substr(bstr.length-1,1) == "0"){
                    str = qnumber + "." + bstr.substr(bstr.length-2,1) + uicore.LanguageManager.getString("baiwan");
                }
                else{
                    // st = qnumber + "." + bstr.substr(bstr.length-2,1) + bstr.substr(bstr.length-1,1) + uicore.LanguageManager.getString("baiwan");
                    str = qnumber + "." + bstr.substr(bstr.length-2,1) + uicore.LanguageManager.getString("baiwan");
                }
            }
        }else{
        	str = dataArr[i];
        }

        //文字格式
		if(st){
            st = st + "/" + str;
		}
		else{
            st = str;
		}
	}
    return st;
}

ccui.jumpFont = function(node,scale){
	var scale1;
	var scale2;
	scale1 = cc.ScaleTo(.1,scale,scale);
	scale2 = cc.ScaleTo(.1,1,1);
	node.runAction(cc.Sequence(scale1,scale2));
}


/**
 * 将uinit8array转成字符串
 * @param bytes
 * @returns {string}
 */
function Uint8ToString(u8a){
	var CHUNK_SZ = 0x8000;
	var c = [];
	for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
		c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
	}
	return c.join("");
}

/**
 * 绘制图片
 * @param $width
 * @param $height
 * @param $target
 */
function drawImage($width,$height,$target)
{
	var renderText = new cc.RenderTexture($width,$height, 2);
	renderText.begin();
	$target.visit();
	renderText.end();
	return renderText;
}




/**
 * 随机数
 * @param seed    随机种子
 * @param replay  是否需要回放
 *   // test
	 var rander = new SeedRand(1000, true);
	 var list = {};
	 for ($i = 0; $i < 10000; $i++) {
				var tmp = rander.next(1, 10);
				if (list.hasOwnProperty(tmp)) {
					list[tmp]++;
				} else {
					list[tmp] = 1;
				}
			}
	 console.log(list);
	 alert(rander.getValue(666));
 */
function SeedRand(seed, replay) {
	if (seed) {
		this.seed = seed;
	} else {
		this.seed = new Date().getTime();
	}
	this.replay = replay;
	this.record = {};
	this.num = 0;

	/**
	 * 返加指定区间的随机数
	 * @param min
	 * @param max
	 * @returns {number}
	 */
	this.next = function(min, max) {
		this.seed = (this.seed * 9301 + 49297) % 233280;
		var tmp = this.seed / 233280;
		var value = Math.floor(min + tmp * (max - min + 1));
		this.num++;
		if (this.replay) {
			this.record[this.num] = value;
		}
		return {num:this.num,value:value};
	}

	/**
	 * 返加指定回合的随机数
	 * @param num
	 * @returns {*}
	 */
	this.getValue = function (num) {
		return this.record[num];
	}

}

function isString(str){
	return (typeof str=='string')&&str.constructor==String;
}

function isNumber(obj){
	return (typeof obj=='number')&&obj.constructor==Number;
}


function checkSpecialChar(str) {
	var len = str.length;
	for(var i = 0; i < len; i++){
		var curByte = str.charCodeAt(i);
		// cc.log(curByte);
		if(curByte > 127 || curByte == 137 || (curByte >= 48 && curByte <= 57) || (curByte >= 65 && curByte <= 90) || (curByte >= 97 && curByte <= 122)){

		}else{
			return true;
		}
	}
	return false;
}

function getStrLen(str) {
	var len = 0;
	for(var i = 0; i < str.length; i++){
		var byte = str.charCodeAt(i);
		if(byte > 127){
			len+=2;
		}else{
			len+=1;
		}
	}
	return len;
}

ccui.showResource = function () {
		var info = cc.textureCache.getCachedTextureInfo();
		var list = info.split("TextureCache dumpDebugInfo");
		cc.log("---------------------------------\n\nTextureCache dumpDebugInfo" + list[1] + "\n\n");
		 cc.trace(info);

		var ll = list[0].split("\n");
		if(ll != "" && ll.length > 0) {
			for (var i in ll) {
				if(ll[i] && ll[i].split) {
					var l = ll[i].split("Resources/res");
					if (l[1]) {
						 cc.log(l[1]);
					}
				}
			}
		}
		 cc.log("\n\n\n\n--------------------------");

}




