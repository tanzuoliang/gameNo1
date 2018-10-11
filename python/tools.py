# coding=utf-8
__author__ = 'tzl'

import os, shutil,tkMessageBox,json,time
from copyFile import Assets,Copy
from xml.dom.minidom import Document
from xml.dom.minidom import parse

import sys
reload(sys)
sys.setdefaultencoding( "utf-8" )

class Tools(object):

	log = None
	alertTestInfo = '测试信息，请忽略'

	@staticmethod
	def getXML(path):
		xmlDoc = parse(path)
		xmlDoc = xmlDoc.documentElement
		return xmlDoc

	@staticmethod
	def getXMLProperty(path,pro):
		xmlDoc = Tools.getXML(path)
		if xmlDoc:
			return xmlDoc.getAttribute(pro)

		return None  	  


	@staticmethod
	def alert(info):
		# tkMessageBox.showinfo('提示',info)
		os.system('say %s'%info)

	@staticmethod
	def sysAlert(info):
		os.system('./python/alert.sh %s'%info)	
		# os.system('./alert.sh %s'%info)	


	@staticmethod
	def writeLog(info):
		info = info + ":" + time.strftime("%Y-%m-%d  %H:%M:%S")
		if not Tools.log:
			Tools.log = open('python/tools_log.txt','a+')
		print("remove : " + info)	
		Tools.log.write(info + '\n')		
		
	"""
		检查是否忘了处理音效
	"""	
	@staticmethod
	def checkIOSMusicDir():
		print "-----------------------"
		path = 'res/music/android'
		copy = Copy()

		if os.path.exists(path):
			copy.removeDir('music')
			copy.copyDir('res/music','music')
			copy.removeDir('res/music/android')
		else:
			print "can't fin res/music/android"		

	@staticmethod	
	def checkPlatformJson(path):
		jsonDic = json.loads(Copy().getFileData(path))
		url = jsonDic["game_loginUrl"]
		if '192' in url:
			Tools.alert("当前的是本地环境 地址是%s"%url)
		elif 'test' in url:
			Tools.alert("当前的是测试环境 地址是%s"%url)
		else:
			Tools.alert("当前的正式以布环境 地址是%s"%url)		


	"""
	将checkpath中有而path中没有的文件去掉(处理checkpath中的文件，保证checkpath里的文件 path中都有)
	"""		
	@staticmethod
	def compareTowDir(path,checkPath):

		copy = Copy()

		for item in os.walk(checkPath):

			if item[0]:
				resDir = item[0].replace(checkPath,path)
				if not os.path.exists(resDir):
					copy.removeDir(item[0])
					Tools.writeLog('remove dir = %s from %s'%(item[0],checkPath))
					continue

			if not item[2]:
				continue

			for file in item[2]:

				# print os.path.splitext(file)[-1]
				if os.path.splitext(file)[-1] == ".DS_Store":
					continue

				fullpath = os.path.join(item[0],file)
				resfullpath = fullpath.replace(checkPath,path)
				if not os.path.exists(resfullpath):
					try:
						os.remove(fullpath)
						Tools.writeLog('remove file = %s from %s'%(file,fullpath))
					except Exception ,e:
						print e	



	@staticmethod
	def rename(oldName,newName):
		if os.path.exists(oldName) and os.path.exists(newName):
			os.rename(oldName,'temp_name')
			os.rename(newName,oldName)
			os.rename('temp_name',newName)
			print 'rename from %s to %s successful'%(oldName,newName)
			return True
		else:
			print 'renam fail beacuse no find file or dic'
			return False


	@staticmethod
	def jscompile(path,remove = False):
		newPath = path + '_new'
		command = 'cocos jscompile -s %s -d %s'%(path,newPath)
		os.system(command)
		Tools.rename(path,newPath) 
		if remove:
			shutil.rmtree(newPath)


	@staticmethod
	def compileJSToJSC():
		corePath = "frameworks/js-bindings/bindings/script"
		if not os.path.exists(corePath + '/jsb.jsc'):
			Tools.jscompile(corePath)

		srcPath = 'src'
		if not os.path.exists(srcPath + '/app.jsc'):
			Tools.jscompile(srcPath)

		Tools.alert("编译js完成")	


	@staticmethod 
	def JSCToJS():
		copy = Copy()

		corePath = "frameworks/js-bindings/bindings/script"
		if Tools.rename(corePath,corePath + '_new'):
			copy.removeDir(corePath + '_new')

		if Tools.rename('src','src_new'):
			copy.removeDir('src_new')

		# Tools.alert("编译js完成")	


	@staticmethod
	def getdirsize(dir):
		size = 0L
		if os.path.exists(dir):
			for root,dirs,files in os.walk(dir):
				size += sum([ os.path.getsize(os.path.join(root,name)) for name in files])

		return size		

	@staticmethod
	def uncompressRes():
		if Tools.getdirsize('res-new') > Tools.getdirsize('res'):
			Tools.rename('res','res-new')
		else:
			Tools.alert("当前已经是解压状态")	

	@staticmethod
	def compressRes():
		if Tools.getdirsize('res') > Tools.getdirsize('res-new'):
			path = os.getcwd()

			Tools.compareTowDir('res','res-new')

			os.chdir(path + '/helper')
			os.system('python respack.py')
			os.chdir(path)
			Tools.rename('res','res-new')
			Tools.checkIOSMusicDir();	

			Tools.alert("压缩资源完成")
		else:
			Tools.alert("压缩资源失败 当前已经是压缩状态")		


	@staticmethod
	def openTerminal():
		os.system('open -n /Applications/Utilities/Terminal.app')		


	@staticmethod
	def changeJsonValue(path,key,value):
		jsonDic = json.loads(Copy().getFileData(path))
		if key in jsonDic:
			jsonDic[key] = value
			copy.saveDataToFile(path,json.dumps(jsonDic,indent=2,ensure_ascii=False))
		else:
			print "can't find key %s in json %s"%(key,path)

	"""
		 给一个json对象加一个字段
	"""		
	@staticmethod
	def addDataToJson(path,key,value):
		jsonDic = json.loads(Copy().getFileData(path))
		if not key in jsonDic:
			jsonDic[key] = value
			print "path = %s"%(path)
			print json.dumps(jsonDic);

			Copy().saveDataToFile(path,json.dumps(jsonDic,indent=2,ensure_ascii=False))
		else:
			print "当前对象已经有字段 %s"%(key)					

	
		