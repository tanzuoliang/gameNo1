#!/usr/bin/python
#encoding=utf-8

"""
{
	"game_loginUrl":"http://192.168.1.240:8000/gateway.php",
	"platform_name":"tianyi",
	"platform_type":0,
	"platform_desc":"无信息"
}
"""


import json,shutil,re

with open("platform.json","r") as f:
	data = f.read()

SERVER_IN = 	'http://192.168.1.240:'
SERVER_OUT = 'http://182.254.155.127:'
sel = input("0:内网\n1:外网\n")
replaceStr	 = SERVER_IN if sel == 0 else SERVER_OUT
data = re.sub(r'http://.+?:',replaceStr,data)
print data
with open('platform.json',"w") as f:
	f.write(data)


shutil.copy("platform.json", "frameworks/runtime-src/proj.ios_mac/platform.json")
