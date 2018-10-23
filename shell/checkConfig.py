#!/usr/bin/python
#encoding=utf-8

import json,re,os
import glob,sys
reload(sys)
sys.setdefaultencoding("utf-8")

def getFile(p):
	with open(p,"r") as f:
		return f.read()

def isInvalid(s):
	s = s.strip()
	return s == "" or s == "0"

def ifNotContains(key,config,errls = [],errMsg = ""):
	
	if not isInvalid(key) and not key in config:
		errls.append(errMsg)
		
	return errls	

#from myutil.utils
def getFrames(p):
	ret = []
	with open(p,"r") as f:
		for line in f.readlines():
			if ".png</key>" in line:
				line = line.strip()
				line = line.replace("<key>","").replace(".png</key>","")
				ret.append(line)
	return ret
		
def printArr(arr,log=""):
	if len(arr) == 0:
		return
	print ""
	print ""
	print ""
	
	print "\t------ start ",log," ----------"
	print json.dumps(arr,indent=2,ensure_ascii = False)
	print "\t------- end ",log," -----------"
	
	print ""
	print ""
	print ""


def cutLetter(s):
	startIndex = s.find('"intro":"')
	count = 0
	while not startIndex == -1:
		count = 0
		i = startIndex + 9
		c = s[i:i+1]
		while True and  count < 500:
			if c == '"':
				break
			else:
				i = i + 1
				c = s[i:i+1]
				print c
			count = count + 1	
		i = i + 2
		s = s[:startIndex] + s[i:]
		startIndex = s.find('"intro":"')
		print startIndex
		
	return s	
		
os.system("svn up ../src/cube/gameConfig/gameConfig.js")
os.system("svn up ../res")
config = {}
#with open("../src/cube/gameConfig/gameConfig.js","rb") as f:
with open("../src/cube/gameConfig/gameConfig.js","rb") as f:
	
	
	datas = f.read().replace("var gameConfig = gameConfig || {};","")
	ls = datas.split(";")
	for item in ls:
		if item:
			ns = item.split("=")
			n = ns[0].strip().split(".")[1]	
			value = ns[1].strip()
			if n == "cubewar_skill_info" or n == "cubewar_lang_cn":
				value = ""
				for i in range(1,len(ns)):
					value = value + ns[i].strip()
			try:
				config[n] = json.loads(u"%s"%value)
			except Exception as e:
				print n , "  " ,e , "  ",item	
	

def dector(log):
	def wrapper(fun):
		def h():
			print "------------------------ start ",log ," ---------------------"
			fun()
			print "------------------------ end ",log ," -----------------------"
			print ""
			
		return h	
	return wrapper	
			
def getEffectFrames(eff):
	frames = 0
	p = os.path.join("../res/skill", eff + ".plist")
	if not os.path.exists(p):
		p = os.path.join("../res/new/res/skill",eff + ".plist") 
		
	if os.path.exists(p):
		with open(p,"rb") as f:
			for line in f.readlines():
				if "png</key>" in line:
					line = line.strip().replace("<key>","").replace("</key>","")
					frames = frames + 1
					ls = line.split("_")
					index = ls[len(ls) - 1].split(".png")[0]
					if index == "00000":
						print eff, " need start at 1  path = ",p
#					if "/" in line:
#						print eff, " has error sprite named ",line
							
	else:
		print "can not find the file ",p
		pass				
					
	return frames				
									
@dector("eff")
def checkEffectConfig():
	effConfig = config["cubewar_eff_config"]
	
	checkList = []
	
	errls = []
	
	for key in effConfig:
		effTextureList = str(effConfig[key]["effTexture"]).split("|")	
		if len(effTextureList) > 1:
			for i in xrange(1,len(effTextureList)):
				if not effTextureList[i] in effConfig:
					print "[error] can not find the id " + effTextureList[i] + " , in effectConfig with effectId " + key + " , on effTexture"
#			print "find effect ",key," has more than one effect ",effConfig[key]["effTexture"]		
					
		else:
			for i in xrange(0,1):
				eid = effTextureList[i]
				if eid == "":
					errls.append("[error1] effect %s  eid = %s"%(key,eid))
					continue
				if key in checkList:
					continue
				configNum = effConfig[key]["num"]
				plistNum = getEffectFrames(eid)
				_dir = effConfig[key]["dir"]
#				if eid == "1020110":
#					print "---- ",configNum, " ",plistNum
				
				checkList.append(key)
				if configNum > 0 and plistNum > 0 and  not configNum <= plistNum and not (plistNum % configNum == 0):
					print "[error] effect ",key ,"  eid = ",eid,"   config set ",configNum ," frames but only ",plistNum," frames in plist"
					
				if configNum > 0:	
					if _dir == 1 or _dir == "1":
						__n__ = plistNum / configNum
						if __n__ == 1:
							 errls.append("[error] effect %s  eid = %s  配置有方向但资源没带方向 "%(key,eid))
					else:
						__n__ = plistNum / configNum
						if __n__ > 1:
							errls.append("[error] effect %s , eid = %s 配置没有方向但资源带方向 "%(key,eid))
#							os.system("say 特效%s又配错了 配置没有方向但资源带方向"%eid) 							
	print json.dumps(errls,indent=2,ensure_ascii=False)
	
@dector("sound")	
def checkGameSound():
	soundConfig = config["cubewar_game_sound"]
	for key in soundConfig:
		sid = soundConfig[key]["sound"]
		if not os.path.exists(os.path.join("../res/music/android",sid + ".mp3")):
				print "can not find sound ",sid
				
	print "------------"
	effCon = config["cubewar_eff_config"]
	errSid = []
	for eid in effCon:
		con = effCon[eid]
		sid = con["sound"]
		if sid:
			ff = "../res/music/android/%s.mp3"%sid
			if not os.path.exists(ff) and not sid in errSid:
				errSid.append(sid)
				print "can not find the music named %s \tin cubewar_eff_config that config by key %s"%(sid,eid)			
				
from PIL import Image	
def printPng(name):
#	print __name__
	with open(name,"r") as f:
		print f.read()

def getMemoryFormat(mem):
	if mem < 1000:
		return str(mem) + "KB"
	else:
		return str(mem * 0.001) + "M"	
@dector("bigImage")					
def checkBigImage():
	for (d,_,items) in os.walk("../res"):
		if items:
			for f in items:
				ext = os.path.splitext(f)[1]
				if ext == ".png" or ext == ".jpg":
					try:
						realyFile = os.path.join(d, f)
						with Image.open(realyFile) as im:
							w,h = im.size
							weight = os.path.getsize(realyFile) / (1024)
							if w >= 1024 and h >= 1024 or weight > 1000:
								print "[%s]\t\t\twidth = %d,height = %d size = %d format = %s,mode = %s memory = %s"%(realyFile,w,h,w * h * 4 / 1024,im.format,im.mode,getMemoryFormat(weight))
									
		
					except Exception as e:
						print e		

def findHinder3D(tex,key):
	p = os.path.join("../res/3d/hinder", tex + ".png")
	if not os.path.exists(p):
		if not findImageReplaceExt(p):
			p = os.path.join("../res/new/res/3d/hinder",tex + ".png") 
			if not os.path.exists(p):
				print key ," can not find the 3d texture",p
			
	d = "../res/3d/hinder"
	dd = "../res/new/res/3d/hinder"
	f = os.path.join(d, "%s.obj"%(tex))
	if not os.path.exists(f):
		f = os.path.join(dd, "%s.obj"%(tex))
		if not os.path.exists(f):
			print key," can not find the 3d model ",f

def findImageReplaceExt(f,ext=".jpg"):
	f = f.replace(".png",ext)
	if os.path.exists(f):
#		print "--------------- find ",f
		return True
	else:
		d = os.path.dirname(f)
		n = os.path.basename(f)
		nf = os.path.join(d, n.split(".")[0] + "01.png")
		if os.path.exists(nf):
			return True	
	return False	

def find3D(tex,ls,key,ext = "c3b"):

	p = os.path.join("../res/3d", tex + ".png")
	if not os.path.exists(p):
		skin = config["cubewar_monster_info"][key]["skin"]
		if not skin == "":
#			print "skin = ",skin
			p = os.path.join("../res/3d/skin", skin + ".png")
		else:
			if not findImageReplaceExt(p):
				p = os.path.join("../res/new/res/3d",tex + ".png") 
			
				if not os.path.exists(p):
					print key ," can not find the 3d texture",p
		
	d = "../res/3d"
	dd = "../res/new/res/3d"
	for n in ls:
		f = os.path.join(d, "%s_%s.%s"%(tex,n,ext))
		if not os.path.exists(f):
			f = os.path.join(dd, "%s_%s.%s"%(tex,n,ext))
			if not os.path.exists(f):
				print key," can not find the 3d model ",f
							
			


@dector("3d")
def check3D():
	p = "../res/new/res/3d"						
	monster_effect = config["cubewar_monster_info"]
	for key in monster_effect:
		texture = monster_effect[key]["texture"]
		tp = monster_effect[key]["type"]
		if tp == 1:
			if  monster_effect[key]["is_anim"]:
				find3D(texture, ["idle"],key)
			else:
				findHinder3D(texture,key)	
		elif tp == 2 or tp == 3:
			ls = ["attack","chuchang","die","idle","move"]
			if monster_effect[key]["skill_point"]:
				ls.append("skill")
				
			if monster_effect[key]["run_point"]:
				ls.append("run_attack")
				
			if monster_effect[key]["is_run"]:
				ls.append("run")
				
			if monster_effect[key]["bao_point"]:
				ls.append("bao")			
				
			find3D(texture, ls,key)
		elif tp == 4:
			find3D(texture, ["D_idle","D_attack","U_idle","U_attack","L_idle","L_attack","R_idle","R_attack"],key)
		elif tp == 5:
			find3D(texture, ["idle"],key)
		
	modeldic = {}	
	for model in glob.glob(os.path.join(p,"*.c3b")):
			basename = os.path.basename(model)
			ls = basename.split("_")
			if len(ls) == 1:
				print "[error] ",model," 命名不对呀"
				continue
			heroName = ls[0]
			if not heroName in modeldic:
				modeldic[heroName] = []
					
			actionName = ls[1].split(".")[0]
			modeldic[heroName].append(actionName)
			
#	print json.dumps(modeldic,indent=2)	
	normalAction = ["attack","chuchang","die","idle","move","skill","run","run_attack","bao"]
	for m in modeldic:
		for action in modeldic[m]:
			if not action in normalAction:
				print "[error] ",m," 动作组不规范 ",modeldic[m]
				break			
						
@dector("buff")
def checkBuff():
	buff_effect = config["cubewar_state_config"]
	effConfig = config["cubewar_eff_config"]
	for bid in buff_effect:
		con = buff_effect[bid]
		eid = str(con["eff"])
		if not eid == "0":
			if not eid in effConfig:
				print "buff ",bid, " 配置的特效",eid," 在特效配置表中找不到"
		if not con["time"] * con["num"] == 0:
			print "buff ",bid," time or num 不能同时拥有参数"
		

@dector("monster")
def checkMonster():
	
	hiconLs = getFrames("../res/new/res/icon/heroHeadIcon.plist")
	middleIcon = getFrames("../res/new/res/icon/heroCardIcon.plist")
	errHicon = []
	errPic = []
	errDetail = []
	errSkill = []
	
	def checkSelfHero(con):
		icon = "hicon_" + str(con["icon"])
		if not icon in hiconLs:
			errHicon.append("[error] can not find monster %s the headIcon in heroHeadIcon"%str(con["id"]))
			
		icon = str(con["icon"]) + "_pic"
		if not icon in middleIcon:
			errPic.append("[error] can not find monster %s the  headCard in heroCardIcon"%str(con["id"]))	
			
		icon = "heroDetail_" + str(con["icon"]) + ".jpg"
		filename = os.path.join("../res/CN/new_ui/module/hero_record/heroBg", icon)
		if con["have"] == 0 and str(con["id"]).startswith("10") and not os.path.exists(filename):
			errDetail.append("[error] can not find monster %s the  pic named %s %s"%(str(con["id"]),filename,con["have"]))
	
	mconfig = config["cubewar_monster_info"]
#	skillConfig = config["cubewar_skill_info"]
	for key in mconfig:
		iconStr = str(mconfig[key]["icon"])
		
		if len(str(mconfig[key]["id"])) == 5 and mconfig[key]["have"] == 0:
			checkSelfHero(mconfig[key])
			
		if not len(iconStr) == 5:
			print "[error] ",key ," icon contains space letter"
			
		skillStr = str(mconfig[key]["skill"])
		if not skillStr == "":
			ls = skillStr.split("|")
			for item in ls:
				if ' ' in item:
					print "[error] ",key ," skill contains space letter ",skillStr, " ",len(skillStr)
#				else:
#					if not item in skillConfig:
#						errSkill.append("[error] %s cannot find the skill %s item in cubewar_skill_info with %s"%(key,item,skillStr))
#						break		
					
		showEff = str(mconfig[key]["show_eff"])
		effConfig = config["cubewar_eff_config"]
		if not showEff == '0':
			if not showEff in effConfig:
				print "[error] ",key," can not find the showEff ",showEff," in effectConfig"
				
		selfEff = mconfig[key]["eff"]
		if selfEff:
			selfEff = str(selfEff)
			ls = selfEff.split("|")
			for item in ls:
				if not item in effConfig:
					print "[error] ",key," can not find the eff ",selfEff," in effectConfig"
					
					
		
		
		skillConfig = config["cubewar_skill_info"]
		skillList = str(mconfig[key]["skill"]).split("|")
		for skill in skillList:
			if not isInvalid(skill) and  not skill in skillConfig:
				errSkill.append("[error] %s cannot find the skill %s item in cubewar_skill_info with %s"%(key,skill,str(mconfig[key]["skill"])))
#				print "[error] ",key," owner skill ",skill ," can not find in cubewar_skill_info"
	printArr(errHicon,"找不到头像")										
	printArr(errPic,"找不到卡牌")										
	printArr(errDetail,"找不到原画")										
	printArr(errSkill,"找不到技能")										


@dector("skill")
def checkSkill():
	sconfig = config["cubewar_skill_info"]
	eConfig = config["cubewar_eff_config"]
	lConfig = config["cubewar_lang_cn"]
	
	buffConfig = config["cubewar_state_config"]
	iconPlist = getFile("../res/new/res/icon/skillIcon.plist")
	errLs = []
	effErr = []
	buffErr = []
	for key in sconfig:
		item = sconfig[key]
		eff = str(item["eff"]).split("|")
		for e in eff:
			if not isInvalid(e) and not e in eConfig:
				effErr.append("[error] %s can not find the skill eff %s in cubewar_eff_config %s"%(key,e,item["eff"]))
#				print "[error] ",key," can not find the skill eff ",e," in cubewar_eff_config ",item["eff"]
		if key.startswith("10"):		
			n = item["name"]
			if not isInvalid(n) and "skillname" in n and not n in lConfig:
				errLs.append("[error] skill %s  can not find the  %s in cubewar_lang_cn"%(key,n))

			intro = item["intro"]
			if not isInvalid(intro) and "skillinfo" in intro and not intro in lConfig:
				errLs.append("[error] skill %s  can not find the  %s in cubewar_lang_cn"%(key,intro))
			
			
		icon = str(item["oid"])
#		print item["oid"]
		if icon.startswith("10") and not icon in iconPlist:
			print "[error] ",key," can not find the icon named skill_" + icon + ".png in skillIcon.plist "
			
		add_state = str(item["add_state"])
		if not isInvalid(add_state) and not add_state in buffConfig:
			buffErr.append("[error] %s can not find the buff state %s in cubewar_state_config"%(key,add_state))
#			print "----------- buff error"	
			
	printArr(errLs,"lose in cubewar_lang_cn")		
	printArr(effErr,"lose in cubewar_eff_config")		
	printArr(buffErr,"lose state in cubewar_state_config")		
	
@dector("checkMultiSpriteframe")
def checkSpriteFrame():
	
	def contains(ls,n):
		for tu in ls:
			if tu[0] == n:
				return tu
		return None		
	
			
	
#	root = "../res/new/res/icon/*.plist"
	roots = ["../res/new/res/icon/*.plist","../res/icon/*.plist","../res/new/res/skill/*.plist","../res/new/res/uiEffect/*.plist"]
	files = []
	for root in roots:
		for f in glob.glob(root):
			files.append(f)
	
	ret = []
	err = []
	for f in files:
		r = getFrames(f)
#		print "------------------- ",f," --------------------"
		for n in r:
			checkRet = contains(ret,n)
			if not checkRet:
#				ret.append((n,os.path.basename(f)))
				ret.append((n,f))
#				print n
			else:
#				print "重复的资源 ",n	,"已经存在 ",checkRet[1]," 当前 ",os.path.basename(f)
#				info = "%s      [%s]       %s"%(checkRet[1],n,os.path.basename(f))
				info = "%s      [%s]       %s"%(checkRet[1],n,f)
				err.append(info)
				
	print json.dumps(err,indent=2)			
#	print ret	
						

@dector("checkEquip")
def checkEquip():
	eqconfig = config["cubewar_equip"]
	lConfig = config["cubewar_lang_cn"]
	
	sprites = getFrames("../res/new/res/icon/equipIcon.plist")
	errls = []
	lerr = []
	
	for key in eqconfig:
		ifNotContains(eqconfig[key]["icon"],sprites,errls,"[error] equip %s can not find the equip frame named %s in equipIcon.plist"%(key,eqconfig[key]["icon"]))
		
		ifNotContains(eqconfig[key]["name"],lConfig,lerr,"[error] equip %s can not find the equip name named %s in cubewar_lang_cn"%(key,eqconfig[key]["name"]))
						
	printArr(errls,"lose frames")		
	printArr(lerr,"lose name")		
	
	
	
@dector("------ wwwww-----")
def checkWhat():
	con =  config["cubewar_item_info"]
	ms = config["cubewar_monster_info"]
	
	ids = []
	for _i in ms:
		ids.append(ms[_i]["id"])
	
	for _id in con:
		mid = con[_id]["mid"]
		if con[_id]["type"] == 1 and not mid in ids:
			print "can not find the item mid ",mid,"  in monster_"
											
def startCheck():
	checkEffectConfig()
	checkGameSound()	
	check3D()
	checkBuff()
	checkMonster()
	checkSkill()
	checkEquip()
	checkSpriteFrame()

def findItem(item_id):
	if not item_id in config["cubewar_item_info"]:
		print "err can not find ",item_id
					
startCheck()
#checkGameSound()
#checkWhat();
#check3D()
#checkSkill()
			

#def checkSkill(id):
#	con = config["cubewar_skill_info"][id]
#	print con
#	ls = ["achieve","add_state","area_des","att_type","cd","hp_pro","hurt","key","trigger"]
#	for key in ls:
#		if key in con:
#			print key , " = " , con[key]
#		else:
#			print "can not find the ",key	
			
			
def removeUnusedHeroResource():
	
	
	def removeModel(mo):
		os.system("svn del ../res/3d/%s*.*"%mo)
		
	def removeSkill(sk):
		ls = str(sk).split("|")
		for sid in ls:
			eid = config["cubewar_skill_info"][sid]["eff"]
			if eid:
				els = str(eid).split("|")
				for eeeid in els:
					os.system("svn del ../res/skill/%s.png"%eeeid)
					os.system("svn del ../res/skill/%s.plist"%eeeid)
			
	def removeShowEff(eff):
			if eff:
				os.system("svn del ../res/skill/%s.*"%eff)	
			
	def removeDieEff(eff):
			if eff:
				os.system("svn del ../res/skill/%s.*"%eff)
				
	def removeSKin(skin):
			if skin:
				os.system("svn del ../res/skill/skin/%s.png"%skin)					
	
	herols = []

	with open("unuseHero.txt","r") as f:
		for l in f.readlines():
			herols.append(l.strip())
			
	print herols
	
	con = config["cubewar_monster_info"]
	
	skinLs = []
	for hid in con:
		skin = con[hid]["skin"]
		if skin:
			skinLs.append(skin)
	print skinLs
	for sk in glob.glob("../res/3d/skin/*.png"):
		if not os.path.basename(sk).split(".")[0] in skinLs:
			print sk
			os.system("rm rf %s"%sk)
			
			
	
#	for hid in herols:
#		removeModel(con[hid]["texture"])
#		removeSkill(con[hid]["skill"])
#		removeShowEff(con[hid]["show_eff"])
#		removeDieEff(con[hid]["texture"])
#		removeSKin(con[hid]["skin"])
		
#removeUnusedHeroResource()		
						
										
#checkSkill("102011001")					
#print json.dumps(config["cubewar_lang_cn"],indent=2)							
			

	
	
	
	