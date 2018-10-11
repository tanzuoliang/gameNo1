#!/usr/bin/python
#encoding=utf-8

import os,time,datetime
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

#tag = time.strftime('%Y-%m-%d',time.localtime())
tag = time.strftime('%m-%d',time.localtime())

root = os.path.dirname(__file__) or "."

configP = "%s/.config%s"%(root,tag)

platformJsonPath =  os.path.join(root,"../../platform.json")
network = u"内网"
import json
with open(platformJsonPath,"r") as f:
	di = json.load(f)
	U = di["game_loginUrl"]
	if "118.89.106.189" in U:
		network = u"外网"

n = 1
if os.path.exists(configP):
	with open(configP,"r") as f:
		n = int(f.read())


v_path = "%s/.version.txt"%root
v_s = 2
with open(v_path,"r") as f:
	v_s = int(f.read())

resu = "%s-%s-v1.0.%d"%(network,tag,v_s)

old = "%s/cubeWar-release-signed.apk"%root
new = "%s/cubeWar-%s.apk"%(root,resu)
if os.path.exists(old):
	os.rename(old, new)

	with open(configP,"w") as f:
		f.write(str(n + 1))
	appName = os.path.basename(new)	
	onlineApp = os.path.join("/Volumes/D/游戏包/android",appName)	
	try:
#		os.system("open smb://192.168.1.230/D/游戏包/android")
		os.system("cp %s %s"%(new,onlineApp))
		print "--------------------------   file has post on line -----------------------------------------------"
		os.system("say 新的游戏包已经上传到2 3 0")
#		os.system("killall Finder")
	except Exception as e:
		os.system("say 游戏包上传失败")	
else:
	print u"can not find file %s"%old		
	
