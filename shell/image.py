#!/usr/bin/python

import os
from PIL import Image
import json

root = "../res"

store = "../src/png.js"

def getExportJsonPngs(d):
	with open(d,"r") as f:
		dic = json.load(f)
		return dic["config_png_path"]

def createPng():
	recode = {}
	errpng = []
	for (d,_,items) in os.walk(root):
		if items:
			for item in items:
				f = os.path.join(d, item)
				ext = os.path.splitext(f)[1]
				if ext == ".png" or ext == ".jpg":
					try:
						im = Image.open(f)
						n = f.replace("../","").replace("res/new/","")
						if ext == ".png":
							size = (im.width * im.height * 4) / 1024
							recode[n] = size
							recode[n.replace(".png",".plist")] = size
#							if os.path.exists(f.replace(".png",".plist")):
#								recode[n.replace(".png",".plist")] = size
#							else:
#								recode[n] = size	
							
						elif ext == ".jpg":
							size = (im.width * im.height * 3) / 1024
							recode[n] = size		
							
					except Exception as e:
						errpng.append(f)
						pass
				elif ext == ".ExportJson":
					baseDir = os.path.dirname(f)
					toto = 0
					for p in getExportJsonPngs(f):
						try:
							im = Image.open(os.path.join(baseDir, p))
							toto = toto + (im.width * im.height * 4) / 1024
						except Exception as e:
							pass
					n = f.replace("../","").replace("res/new/","")		
					recode[n] = toto
											
					
					

	with open(store,"w") as f:
		data = "var resourceSize = " + json.dumps(recode,indent=2)
		f.write(data)
		
	print json.dumps(errpng,indent=2)	
		
		
def readPng():
	dic = None
	with open (store,"r") as f:
		data = f.read().replace("var resourceSize = ","")
		dic = json.loads(data)
		ls =  ["res/skill/6212025.plist","res/skill/103045010.plist","res/skill/101044111.plist","res/skill/102014010.plist","res/icon/heroCardIcon.plist","res/skill/102047011.plist","res/skill/6712019.plist","res/skill/6112025.plist","res/skill/killEffect.plist","res/skill/6312025.plist","res/uiEffect/characterskill_show.ExportJson","res/skill/101034110.plist","res/skill/103043010.plist","res/skill/102025010.plist","res/uiEffect/characterskill_available.ExportJson","res/skill/6000098.plist","res/skill/6612019.plist","res/skill/60130.plist","res/icon/commonTexture.plist","res/skill/101023130.plist","res/icon/heroHeadIcon.plist","res/skill/101033010.plist","res/icon/skillIcon.plist","res/icon/toolIcon.plist","res/skill/1020110.plist","res/icon/futaiIcon.plist","res/skill/6003.plist","res/skill/6112034.plist","res/skill/tu.plist","res/skill/101026010.plist","res/skill/102045030.plist","res/skill/102043030.plist","res/skill/102047010.plist","res/skill/102033030.plist","res/skill/4010061.plist","res/skill/101034010.plist","res/icon/heroChip.plist","res/skill/60150.plist","res/skill/zhanchangchuansong.plist","res/skill/bing.plist","res/skill/104073030.plist","res/skill/101044110.plist","res/skill/701001.plist","res/skill/103043030.plist","res/skill/1030130.plist","res/skill/103045030.plist","res/skill/4010060.plist","res/skill/102044030.plist","res/skill/60152.plist","res/icon/equipIcon.plist","res/icon/heroHeadFrame.plist","res/skill/102025030.plist","res/icon/skyIcon.plist","res/skill/bdxg.plist","res/uiEffect/cost_low0.plist","res/icon/buffIcon.plist"]
		
		
#		ls = ["res/uiEffect/zhucheng_wujinshouwei.ExportJson","res/uiEffect/zhucheng_chouka.ExportJson","res/uiEffect/zhucheng_kuangdong.ExportJson","res/uiEffect/zhucheng_jjc.ExportJson","res/uiEffect/zhucheng_fuben.ExportJson","res/uiEffect/zhucheng_wuzi.ExportJson"]
		
		total = 0
		for l in ls:
			try:
				print l,"   ", dic[l]
				ext = os.path.splitext(l)[1]
				total += dic[l]
#				print getExportJsonPngs(os.path.join("../res/new", l))
			except Exception as e:
#				print e
				pass
		print "total = ",total			
		
		
#readPng()	
createPng()		
					

	