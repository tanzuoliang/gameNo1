#!/usr/bin/python
#coding=utf-8
import os,json,sys
from myutil.utils import copyFile,removeFile

reload(sys)
sys.setdefaultencoding("utf-8")

root = "../src"

def getIncludeList():
	ret = []
	d = os.path.join(root, "include")
	reInclude = []
	
	checkFiles = os.listdir(d)
	checkFiles.append("../../project.json")
	
	for f in checkFiles:
		ff = os.path.join(d,f)
		lines = 1
		with open(ff,"rb") as t:
			for l in t.readlines():
				if "src/" in l:
					tt = l.strip().replace('"','').replace(',','')
					if not tt in ret:
						ret.append(tt)
					else:
						reInclude.append("%s at file %s line %s"%(tt,ff,lines))
				lines = lines + 1		
	if len(reInclude) > 0:
		print "----------------------- 下面是重复引用的代码文件 --------------------"
		print json.dumps(reInclude,indent=2)					 	
	return ret				
					

def getUnseCodeFiles():
	l = getIncludeList()
	
	ret = []
	for f in l:
		f = f.replace("src",root)
		if not os.path.exists(f):
			ret.append(f)
	if len(ret) > 0:
		print "--------------------------------- 以下是引用了却找不以到的文件 --------------------------"
		print json.dumps(ret,indent=2)		
	
	ret = []
	for (r,_,items) in os.walk(root):
		if items:
			for f in items:
				if "DS_Store" in f:
					continue
				ff = os.path.join(r, f).replace(root, "src")
				if ff == "src/module.js" or "src/include/module" in ff:
					continue
				if not ff in l:
					 ret.append(ff)
	if len(ret) > 0:
		dd = "../unuse-src"
		if not os.path.exists(dd):
			os.mkdir(dd)
		print "-------------------------  下面是没有引用到游戏内的代码 -----------------------------------------"				
		print json.dumps(ret,indent=2)
		
		for f in ret:
			copyFile(f.replace("src", root), f.replace("src",dd))
			removeFile(f.replace("src", root))
			
		
#	ret = []	
#	for f in l:
#		f = f.replace("src",root)
#		if os.path.exists(f):
#			with open(f,"rb") as t:
#				lines = 1
#				for l in t.readlines():
##					if ("ccui.ImageView" in l or "cc.Sprite.create" in l or "cc.Sprite(" in l )and not "//" in l:
#					if ('.png")' in l or '.jpg")' in l)and not "//" in l:
#						if "(" in l:
#							li = l.strip().split("(")
#							l = li[len(li) - 1]
#						if ")" in l:
#							l = l.split(")")[0]
#						ret.append("%s at file %s on line %d"%(l,f,lines))
#					lines = lines + 1	
#	if len(ret) > 0:
#		print "-------------------------  以下是程序中显示调用的资源 -----------------------------------------"				
#		print json.dumps(ret,indent=2)						
	
import glob	
def remoeNullDir():
	for(d,c,i) in os.walk(root):
		if not c and not i:
			print d,glob.glob(os.path.join(d,"*.*"))
			os.removedirs(d)
		
	
getUnseCodeFiles()	
remoeNullDir()				
							 					
