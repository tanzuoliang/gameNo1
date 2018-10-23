var WS = require("ws");
var wss = new WS.Server({port:8123});
wss.on('connection',(ws)=>{
	ws.on('message',(msg)=>{
		console.log(msg);
	});
	
	ws.on('close',()=>console.log("client close"));
});