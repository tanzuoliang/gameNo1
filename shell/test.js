var EX = require("express");
let app = EX();
var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: false }));

app.get("/index.html",(req,res)=>{
	res.send(`<html>
	<body>
	<form action="http://127.0.0.1:8080/process_post" method="POST">
	First Name: <input type="text" name="first_name">  <br>
	 
	Last Name: <input type="text" name="last_name">
	<input type="submit" value="Submit">
	</form>
	</body>
	</html>`)	
});

app.post("/process_post",(req,res)=>{
	console.log(req.body);
//	var response = {
//			 "first_name":req.body.first_name,
//			 "last_name":req.body.last_name
//		};
//		console.log(response);
//		res.end(JSON.stringify(response));
		res.send("爹妈");
});

let server = app.listen(8080,()=>{
	var host = server.address().address;
	var port = server.address().port;
	 
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
});