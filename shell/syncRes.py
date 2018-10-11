#!/usr/bin/python

import json,os,glob,shutil
from myutil.utils import copyFile


class SyncMachine(object):
	
	configPath = ""
	config  = None
	
	def __init__(self,path = "syncConfig.js"):
		self.configPath = path
		self.loadConfig()
	
	def executSync(self):
		self.syncRes()
		self.commit()
		
	def removeUnuseRes(self):
		if "remove" in self.config:
			removed = self.config["remove"]
			backup = removed["back"]
			res = removed["res"]
			if not os.path.exists(backup):
				os.makedirs(backup)
				
			for f in res:
				if os.path.exists(f):
					shutil.move(f, os.path.join(backup,os.path.basename(f)))
				else:
					print "can not find ",f			
	
	def commit(self):
		if "project" in self.config:
			pro = self.config["project"]
			os.system("svn ci -m '' %s"%pro)
		
	def loadConfig(self):
		if os.path.exists(self.configPath):
			with open(self.configPath,"r") as f:
				self.config = json.load(f)
				
	
	def syncResFromTo(self,_from,to):
		baseFiels = []
		for f in glob.glob(os.path.join(to,"*.*")):
			ext = os.path.splitext(f)[1]
			if ext == ".png" or ext == ".jpg":
				baseFiels.append(os.path.basename(f))
			
		for f in baseFiels:
			left = os.path.join(_from,f)
			if os.path.exists(left):
				right = os.path.join(to, f)
				copyFile(left, right)
			else:
				print "err ",left	
				
			
	
	def linkFile(self,_from,to):
		copyFile(_from,_to)
				
	def syncRes(self):
		resConfig = self.config["res"]
		for item in resConfig:
			self.syncResFromTo(item["from"],item["to"])
			
		linkConfig = self.config["link"];
		for item in linkConfig:
			self.linkFile(item["from"],item["to"])
			

def check(_fr,_to):
	lefts = []
	for f in glob.glob(os.path.join(_fr, "*.*")):
		lefts.append(os.path.basename(f))
	
	same = []	
	for f in glob.glob(os.path.join(_to, "*.*")):
		ba = os.path.basename(f)
		if ba in lefts:
			same.append(ba)	
			
	print json.dumps(same,indent=2)		
			
if __name__ == "__main__":
	print "already"
#	app = SyncMachine()
#	app.removeUnuseRes()
#	check("../res/CN/new_ui/module/main_bottom_menu","../res/CN/new_ui/common/icon")					
			
			
							