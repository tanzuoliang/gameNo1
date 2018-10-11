#coding=utf-8

import os,sys,json
from copyFile import Copy
from optparse import OptionParser

class CreatePlatformJson(object):

	def __init__(self,code_version='3.0',platform_type = 2,platform="android",pList=['default']):
		# self.platformList = ['qihoo','m4399','anzhi','baidu','downjoy','mi','nearme.gamecenter','uc']
		# self.talking_channel_list = ['000023','000108','000005','110000','000003','000066','000020','000255']

		# self.platformList = ['tencent','lenovo','huawei','youku','pps','kkk','wdj','mumayi']
		# self.talking_channel_list = ['000550','000016','000054','000466','000442','010001','010002','000008']
		# self.platformList = ['7659']
		# self.talking_channel_list = ['007659']

		# self.platformList = ['am']
		# self.talking_channel_list = ['000084']
		# self.platformList = ['shoumeng',"xunlei"]
		# self.talking_channel_list = ['shoumeng',"xunlei"]

		# yq
		# self.platformList = ['tailand']
		# self.talking_channel_list = ['tailand']
		self.platformList = pList
		self.talking_channel_list = ["%s_android"%n for n  in pList]
		print(self.platformList)
		print("-----------------")
		print(self.talking_channel_list)

		# self.platformList = ['coolpad',"haima","m7659","maple","meizu","test","null","vivo"]
		# self.talking_channel_list = ['000078',"001104","007659","maple","000014","test","null","000368"]

		self.code_version = code_version
		self.platform_type = platform_type
		self.copy = Copy()

		if platform == "android":
			self.loginUrl = 'http://and.mx.maple-game.com/gateway.php'
		elif platform == "ios":
			self.loginUrl = ""
		else:
			raise Exception,"你输入的平台有误 只能接受android 和ios"	

		self.root = 'frameworks/runtime-src/proj.android/platform/'
		self.storePath = "frameworks/runtime-src/proj.android/platform/%s/platform.json"
		self.template = 'frameworks/runtime-src/proj.android/template/'
		# self.storePath = "%s.json"


	def copyF(self,f,t):
		print "copy   ", f ,"  =================>  ",t
		if not os.path.exists(t):

			self.copy.copyFile(f,t)

	def copyD(self,f,t):
		for item in os.walk(f):
			if not item[2]:
				continue
			# print "f = ",f," t = ",t	
			for file in item[2]:
				f_ = os.path.join(item[0],file)
				# print 'f_',"   ===   > ",f_  ,"   file  ",file
				t_ = f_.replace(f,t)
				# print 't_',"   ===   > ",t_
				self.copyF(f_,t_);
					
		# if not os.path.exists(t):
		# 	self.copy.copyFiles(f,t)			

	def start(self):
		cnt = len(self.platformList)

		for i in range(cnt):
			platform = self.platformList[i]
			channel_id = self.talking_channel_list[i]
			# self.copy.copyFiles(self.template + 'src',self.root + platform + '/src')

			self.createDirFiles(platform)

			path = self.storePath%platform 
			jsonInfo = {}
			jsonInfo["game_loginUrl"] = self.loginUrl
			jsonInfo["platform_name"] = platform
			jsonInfo["platform_version"] = self.code_version
			jsonInfo["platform_type"] = self.platform_type
			jsonInfo["platform_desc"] = platform
			jsonInfo["talkingData_channel"] = channel_id
			jsonInfo["game_code_version"] ='' + self.code_version
			jsonInfo["exit_model"] = 0
			jsonInfo["crashCode"] = "1"
			jsonInfo["use_yaya_sdk"] = 1
			exit_model_desc = "0:  使用游戏内退出方式  1:使用sdk的退出"
			jsonInfo["exit_model_desc"] = exit_model_desc

			f = open(path,'w')
			f.write(json.dumps(jsonInfo,indent=2,ensure_ascii=False))
			f.close()

			# print "handler ",path,"\nvalue:\n",json.dumps(jsonInfo)

		print "successfull"	
			

	def createDirFiles(self,platform):
		path = self.root + platform
		# self.copy.removeDir(path)
		self.copy.createDir(path)

		self.copy.createDir(path + '/libs')
		self.copy.createDir(path + '/assets')
		self.copy.createDir(path + '/res')
		self.copy.createDir(path + '/src/org/cocos2dx/javascript/platform')
		self.copyF(self.template + 'ForManifest.xml',path + '/ForManifest.xml')
		self.copyD(self.template + 'src',self.root + platform + '/src')
						


if __name__ == '__main__':

	if len(sys.argv) > 1:
		# parser = OptionParser()
		# parser.add_option("-p","--platform",dest="platform")
		# parser.add_option("-v","--code_version",dest="code_version")
		# parser.add_option("-t","--platform_type",dest="platform_type")
		# (opts,args) = parser.parse_args()
		# print opts,"\n",args
		# p = "android"
		# t = '3'
		# v = '3.0'
		# if opts.get("platform"):
		# 	p = opts["platform"]

		# if opts.get("code_version"):
		# 	v = opts["code_version"]

		# if opts.get("platform_type"):
		# 	t = opts["platform_type"]

		# CreatePlatformJson().start(code_version=v,platform_type=t,platform=p)			
		# CreatePlatformJson().start()
		pList = sys.argv[1:]
		CreatePlatformJson(pList=pList).start()
	else:
		CreatePlatformJson(pList=['']).start()	


			
		