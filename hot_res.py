#!/usr/bin/python
#encoding=utf-8
from myutil.utils import readFile,writeToFile,copyFile,repalceDirName
import os,zipfile
from helper.respack import PackRes

def compilejs(f,t):
	os.system("cocos jscompile -s %s -d %s"%(f,t))
	repalceDirName(f,t)	

"""
去除语言分类重复和资源
"""
def handle_res(root):
	lang_path = "res/language_img/lang_chs"
	_dir = os.path.join(root,lang_path)
	"""
		如果不存在就不做处理
	"""
	if not os.path.exists(_dir):
		return
	for(_d,_,items) in os.walk(_dir):
		if items:
			for f in items:
#				ff = os.path.join(_d,f).replace(_dir + "/","")
				ff = os.path.join(_d,f).replace(lang_path + "/","")
				if os.path.exists(ff):
					os.remove(ff)
					print "remove file  ==== ",ff
	

def handleMainjs():
	if not os.path.exists("mainjs"):
		os.makedirs("mainjs")
	if not os.path.exists("mainjs/main.js") or os.path.getmtime("mainjs/main.js") < os.path.getmtime("main.js"):
		os.system("cp ./main.js ./mainjs/main.js")
		os.system('cocos jscompile -s ./mainjs  -d ./mainjs')

def hortPack2(projectroot,dirlist,staticfilelist,f,t,store):
	retlist = []
	for d in dirlist:
		dd = os.path.join(projectroot, d)
		if not os.path.exists(dd) or not os.path.isdir(dd):
			print "%s is not exits or is not a dir"%dd
		ret = os.popen("svn diff %s -r r%s:%s --summarize"%(dd,f,t)).readlines()
		
		for l in ret:
			change = l[1:].strip()
			if os.path.exists(change):
				retlist.append(change)
			
	savePath = os.path.join(projectroot, store)

	print "savePath = %s"%savePath
	
	for fi in retlist:
		if not os.path.isfile(fi) or not os.path.exists(fi):
			continue
		copyFile(fi,fi.replace(projectroot,savePath))
	for fi in staticfilelist:
		if not os.path.exists(fi):
			print "can not find the staticfilelist file %s"%fi
			continue
		base_name = os.path.basename(fi)	
		copyFile(fi,os.path.join(savePath, base_name))
	
#	game_version_path = os.path.join(store, "game_version.json")				
#	if os.path.exists(game_version_path):
#		changeGameVersion(next_version, game_version_path)
#	else:
#		print "%s is not a file"%game_version_path	
		
	handle_res(store)		
	PackRes(os.path.join(savePath, "res"),os.path.join(savePath, "res-new")).run()
	compilejs(os.path.join(savePath,"src"),os.path.join(savePath,"jsc_src"))
	
	z = zipfile.ZipFile(savePath + ".zip","w")
	for f in retlist:
		ff = f.replace(projectroot,savePath)
		tu = os.path.splitext(ff)
		if tu[1] == ".js":
			ff = tu[0] + ".jsc"
		if not os.path.exists(ff):
			continue
		z.write(ff,ff.replace(savePath,""))
		print "write %s to zip"%ff
		
	for f in staticfilelist:
		if not os.path.exists(f):
			continue
		base_name = os.path.basename(f)	
		z.write(os.path.join(savePath,base_name),base_name)
		print "write %s to zip"%os.path.join(savePath,base_name)
	
		
	handleMainjs()
	
	copyFile("mainjs/main.jsc",os.path.join(savePath, "main.jsc"))
	z.write(os.path.join(savePath, "main.jsc"),"main.jsc")
		

curcode = "0"

version_txt = "hot_out/.hot_res_config"
if os.path.exists(version_txt):
	with open(version_txt) as f:
		curcode = f.read()
if not os.path.exists("hot_out"):
	os.makedirs("hot_out")
next_version = str(int(curcode) + 1) 			
writeToFile(version_txt,next_version)

import json

"""
{
	"version":"1.0.0"
}
"""

def changeGameVersion(version,jsonPath):
	di = json.loads(readFile(jsonPath))
	pppp = di['version'].split(".")
	pppp[2] = version
	di['version'] = '.'.join(pppp)
	writeToFile(jsonPath, json.dumps(di,indent=2))
	print "change game_verison.json to ",version


f = raw_input("input the version where you want to collect from:\n")
t = raw_input("input the version where you want to collect to:\n")
st_f = []

game_version = raw_input("select the game_version.json that you want zip in:\n")
if "game_version.json" in game_version:
	st_f.append(game_version.strip())
platform = raw_input("select the platform.json that you want zip in:\n")
if "platform.json" in platform:
	st_f.append(platform.strip())

#hortPack2(os.getcwd(),['res','src'],["platform.json","game_version.json"],f,t,"hot_out/hort_res_%s"%curcode)
hortPack2(os.getcwd(),['res','src'],st_f,f,t,"hot_out/hort_res_%s"%curcode)