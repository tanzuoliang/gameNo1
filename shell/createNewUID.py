#!/usr/bin/python

import requests
import random
from contextlib import closing
import json
import sys
reload(sys)
sys.setdefaultencoding("utf-8")

"""
http://192.168.1.240:8020/?m=open
http://192.168.1.240:8889/gateway.php?platform=tianYi&username=1218&token=f9e34a5d4d5e5801f1fa666f174cb192&a=sdkLogin&m=Login
http://192.168.1.240:8889/gateway.php?accid=581&token=90cfa8f74cc480cf37e39bb42154964e&a=enter&m=Login
http://192.168.1.240:8889/gateway.php?uid=0&a=getAllServer&m=login&sid=tpc41gdgdm8hag2181l1gpu524
http://192.168.1.240:8889/gateway.php?rolename=tianYi1326&uid=0&a=create&m=Login&sid=tpc41gdgdm8hag2181l1gpu524
"""


uid = 0
sid = ""

OUT_NET = False

HOST = "http://192.168.1.240"
rootURL = "%s:8889/gateway.php"%HOST

if OUT_NET:
	HOST = "http://118.89.106.189"
	rootURL = "%s:9999/gateway.php"%HOST

def getRandomUserName():
	uid = random.randint(1000,10000)
	return "yingce" + str(uid)

def getRandomPlayerName():
	uid = random.randint(1000,10000)
	return "player" + str(uid)	
	
def getRandomUserPass():
	return str(random.randint(0,9)) + str(random.randint(0,9)) + str(random.randint(0,9)) + str(random.randint(0,9)) + str(random.randint(0,9)) + str(random.randint(0,9))

def queryData(data):
	ret = ""
	for key in data:
		if not ret == "":
			ret = ret + "&"
			
		ret = ret + key + "=" + str(data[key])	
	return ret	

def reg(url):
	print "request ",url
	with closing(requests.get(url, stream=True)) as response:
		print response.text	
		return json.loads(response.text)

def createUID(sid):
	url = "%s?rolename=%s&uid=0&a=create&m=Login&sid=%s"%(rootURL,getRandomPlayerName(),sid)
	data = reg(url)["data"]

def getAllServer(sid):
	url = "%s?uid=0&a=getAllServer&m=login&sid=%s"%(rootURL,sid)	
	data = reg(url)["data"]
	createUID(sid)
	
		
def enterGame(accid,token):
	url = "%s?accid=%s&token=%s&a=enter&m=Login"%(rootURL,accid,token)
	data = reg(url)["data"]
	
	global sid
	sid = data["sid"]
	createUID(sid)		
		
def SDKLogin(uid,token):
	url = "%s?platform=and_yingce&username=%s&token=%s&a=sdkLogin&m=Login"%(rootURL,uid,token)
	data = reg(url)["data"]
	enterGame(data["accid"],data["token"])				

def registerPlayer():
	un = getRandomUserName()
	ps = getRandomUserPass()
	url = "%s:8020/gateway.php?m=Open&a=reg&"%(HOST) + queryData({"clientId":0,"username":un,"password":ps,"mobile":""})
	
	if OUT_NET:
		url = "%s:8030/gateway.php?m=Open&a=reg&"%(HOST) + queryData({"clientId":0,"username":un,"password":ps,"mobile":""})
	
	data = reg(url)["data"]
	SDKLogin(data["openid"],data["token"])
	
	with open("recorde.txt","a") as f:
		f.write(un+":" + ps + "\n")
	
registerPlayer()	