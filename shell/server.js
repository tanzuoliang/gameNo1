var http = require('http');
var URL = require("url");
var callfile = require('child_process');

var lastTime = Date.now();

var on_building = false;

function get_client_ip(req) {
	var ip = req.headers['x-forwarded-for'] ||
		req.ip ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress || '';
	if(ip.split(',').length>0){
		ip = ip.split(',')[0]
	}
	return ip;
};

function build() {
	return new Promise(function (resolve,rej) {
			let now = Date.now();
			let de = now - lastTime;
			if(!on_building){
				on_building = true;
				callfile.execFile("./build_apk.sh", [], null, function (error, stdout, stderr) {
						resolve("ok");
						on_building = false;
				});
				
			}else{
				resolve("fail:" + de);
			}
			
	});
}

function toClient(msg,response) {
	response.writeHead(200, { 'Content-Type': 'text-plain' });
	response.write('<head><meta charset="utf-8"/></head>');
	response.end(msg);
}

var WHITE_IPS = new Set(["192.168.1.198","127.0.0.1"]);

function isValidIP(ip){
	ip = ip.split("f:")[1];
	console.log("IP = " + ip);
	return WHITE_IPS.has(ip);
}

var lastReqIP = ""

async function responseToClient(request, response){
	let config = URL.parse(request.url,true);
	if(config.pathname == "/"){
		let IP = get_client_ip(request);
		console.log("[" + Date.now() + "] get request from " + JSON.stringify(URL.parse(request.url,true)) + get_client_ip(request));
		if(isValidIP(IP)){
			toClient("正在努力创建APK，请稍等......",response);	
			
			if(!on_building){
				await build();
				console.log("finish");
			}	
				
		}else{
			toClient("非法用户......",response);	
		}
		
	}

}


http.createServer(responseToClient).listen(8124);
