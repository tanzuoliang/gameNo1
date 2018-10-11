#coding=utf-8

import os,sys,shutil,json
import Tkinter
import tkMessageBox

class Command(object):
	"""docstring for Command"""

	def execCommand(self,command):
		print 'command ==>\n',command
		os.system(command)


class packAndroid:

	def __init__(self, projectDir,androidJar,outDir,apkname='hope',install=True):
		self.command = Command()
		self.androidJar = androidJar
		self.outDir = outDir
		self.install = install

		self.checkDir('apks')
		self.checkDir('apks/sign')
		self.apkname = 'apks/%s.apk'%apkname
		self.signname = 'apks/sign/%s.apk'%apkname

		# os.environp['ANDROID_SDK_ROOT'] = '/Users/yons/Documents/tan/android/adt-bundle-mac-x86_64-20140702/sdk'
		print 'projectDir = ',projectDir , '  androidJar = ',androidJar , '  outDir = ',outDir
		#/Users/yons/Documents/tan/android/adt-bundle-mac-x86_64-20140702/sdk'
		#/Users/yons/Documents/tan/android/adt-bundle-mac-x86_64-20140702/sdk/build-tools/21.0.0
		self.android_sdk_root = os.environ['ANDROID_SDK_ROOT'] + '/build-tools/21.0.0/'
		self.sdklib = os.environ['ANDROID_SDK_ROOT'] + "/tools/lib/sdklib.jar"
		self.aapt = self.android_sdk_root + 'aapt'
		self.javac = '/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home/bin/javac'
		self.java = '/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home/bin/java'
		self.dx = self.android_sdk_root + 'dx'
		self.apkbuilder = self.android_sdk_root + 'apkbuilder.bat'

		self.keyfile = 'apks/apksign.keystore'

		self.res = projectDir + '/res'
		self.src = projectDir + '/src'
		self.libs = projectDir + '/libs'
		self.assets = projectDir + '/assets'
		self.bin = projectDir + "/bin"
		self.AndroidManifest = projectDir + '/AndroidManifest.xml'
		self.gen = projectDir + '/gen'
		self.cocos2dLibSrc = projectDir + '../../js-bindings/cocos2d-x/cocos/platform/android/java/src'
		self.cocos2dLibGen = projectDir + '../../js-bindings/cocos2d-x/cocos/platform/android/java/gen'



	def generateAssets(self):
				
	"""  生成R.java文件 """	
	def generateRJava(self):
		self.command.execCommand('%s p -f -m -J %s -S %s -I %s -M %s'%(self.aapt,self.gen,self.res,self.androidJar,self.AndroidManifest))


	def getFileList(self,dir,ext,split=' '):
		list = ''

		for item in os.walk(dir):
			if not item[2]:
				continue

			for file in item[2]:
				if os.path.splitext(file)[1] == ext:
					list = list + os.path.join(item[0],file) + split

		return list			
					
	def getJavaFileList(self):
		list = self.getFileList(self.gen,'.java') + self.getFileList(self.src,'.java') + self.getFileList(self.cocos2dLibSrc,'.java') + self.getFileList(self.cocos2dLibGen,'.java')
		return list			


	def getFileArray(sef,dir,ext):
		list = []

		for item in os.walk(dir):
			if not item[2]:
				continue

			for file in item[2]:
				if os.path.splitext(file)[1] == ext:
					list.append(os.path.join(item[0],file))

		return list	
		

	def checkDir(self,dir):
		if not os.path.exists(dir):
			os.makedirs(dir)	
	"""    """	
	def generateJavaToClass(self):
		# GBK
		self.checkDir(self.outDir + '/classes')
		self.command.execCommand('%s -encoding UTF-8 -target 1.6 -bootclasspath %s -d %s %s -classpath %s'%(self.javac,self.androidJar,self.outDir + '/classes',self.getJavaFileList(),self.getFileList(self.libs,'.jar',split=':')))	
		# self.command.execCommand('%s -encoding UTF-8 -target 1.8 -bootclasspath %s -d %s %s'%(self.javac,self.androidJar,self.outDir,self.getJavaFileList()))

	def generateClassToJar(self):
		path = os.getcwd()
		os.chdir(self.outDir + '/classes')
		self.command.execCommand('jar cvf ../game.jar *')	
		os.chdir(path)

	def generateDex(self):
		# self.command.execCommand('%s --dex --output=%s/classes.dex %s/classes'%(self.dx,self.outDir,self.outDir))
		jarList = self.outDir + '/game.jar '+self.getFileList(self.libs,'.jar',split=' ')	
		self.command.execCommand('%s --dex --output=%s/classes.dex %s'%(self.dx,self.outDir,jarList))		

	def generateap_(self):
		self.command.execCommand('%s package -f -S %s -I %s -A %s -M %s -F %s/hope.ap_'%(self.aapt,self.res,self.androidJar,self.assets,self.AndroidManifest,self.outDir))	

	def generateapk(self):
		# self.command.execCommand('chmod 777 %s'%self.apkbuilder)
		# self.command.execCommand('%s %s/apk/hope.apk -v -u -z %s/out.ap_ -f %s/classes.dex -rf %s -nf %s -rj %s'%(self.apkbuilder,self.outDir,self.outDir,self.outDir,self.src,self.libs,self.libs))	
		command = 'java -cp %s com.android.sdklib.build.ApkBuilderMain %s -v -u -z %s/hope.ap_ -f %s/classes.dex -rf %s -nf %s -rj %s'%(self.sdklib,self.apkname,self.outDir,self.outDir,self.src,self.libs,self.libs)
		self.command.execCommand(command)

	def addDexToApk(self):

		# shutil.copy(self.outDir + '/classes.dex','classes.dex')
		# self.command.execCommand('%s a %s/hope.apk classes.dex'%(self.aapt,self.outDir))	



		for so in self.getFileArray(self.libs + '/armeabi','.so'):
			newRes =  'lib/armeabi/' + os.path.split(so)[1]
			if not os.path.exists('lib/armeabi'):
				os.makedirs('lib/armeabi')
			shutil.copy(so,newRes)
			self.command.execCommand('%s a %s %s'%(self.aapt,self.apkname,newRes))	

	def generatkeystore(self):
		if not os.path.exists(self.keyfile):
			command = 'keytool -genkey -keystore %s -keyalg RSA -validity 10000 -alias yan'%(self.keyfile)	
			self.command.execCommand(command)

	def checksign(self,apk):
		command = 'jarsigner -verify hope.ap'
		self.command.execCommand(command)

	def signAPK(self):		
		command = 'jarsigner -verbose -keystore %s -storepass maple1988 -digestalg SHA1 -sigalg MD5withRSA -signedjar %s %s yan'%(self.keyfile,self.signname,self.apkname)
		self.command.execCommand(command)

	def installapk(self):
		command = 'adb install %s'%(self.signname)	
		self.command.execCommand(command)

	def start(self):
		self.generateap_()
		self.generateapk()
		self.generatkeystore()
		self.signAPK()
		print "self.install = ",self.install;
		if self.install:
			self.installapk()

		print "create % successful"%self.apkname	



class APKBuilder(object):

	def __init__(self,list=[]):
		# /Users/user-pc/Documents/maple/android/adt-bundle-mac-x86_64-20140702/sdk/platforms
		self.androidJar = os.environ['ANDROID_SDK_ROOT'] + '/platforms/android-22/android.jar'
		self.outDir = "outapk"
		self.projectDir = os.getcwd() + '/frameworks/runtime-src/proj.android'

		if len(list) > 0:
			for name in list:
				packAndroid(self.projectDir,self.androidJar,self.outDir,apkname="hope_" + name,install=False)

	def build(self,name):
		packAndroid(self.projectDir,self.androidJar,self.outDir,apkname="hope_" + name,install=False).start()
				


class Pack(object):

	def __init__(self,androidJar,outDir,projectDir):
		self.androidJar = androidJar
		self.outDir = outDir
		self.projectDir = projectDir
		self.top = Tkinter.Tk()
		self.top.wm_title('希望之光android平台')
		self.selectList = [];
		self.btnDict = {}

		self.showGrid()

	def addBtn(self,title,fun,r,c,h=1):
		btn = Tkinter.Button(self.top,text=title,command=fun,width=30,height=h)
		btn.grid(row=r,column=c)
		return btn	

	def checkButton(self,name):
    	
    		def callback():
    			if not name in self.selectList:
    				self.selectList.append(name)
    				self.btnDict[name]["text"] = name + "      :TRUE"
    				self.btnDict[name]["background"] = "red"
    			else:
    				self.selectList.remove(name)
    				self.btnDict[name]["text"] = name + "      :FALSE"
    				self.btnDict[name]["background"] = "white"


    		return callback; 	

    	def start(self):
    		print self.selectList
    		return
    		for name in sef.selectList:
    			packAndroid(self.projectDir,self.androidJar,self.outDir,apkname="hope_" + name)	

        def showGrid(self):
    		jsonDic = json.loads(open('python/platform.txt','r').read())
    		for (k,name) in jsonDic['code'].items():
			self.btnDict[name] = self.addBtn(name + "      :FALSE",self.checkButton(name),int(k),0)

		self.addBtn("start",self.start,0,1)
		self.top.mainloop()		


if __name__ == '__main__':
	
	androidJar = os.environ['ANDROID_SDK_ROOT'] + '/platforms/android-22/android.jar'
	outDir = 'outapk'
	# projectDir = '/Users/yons/Documents/tan/projects/trunk/hope/'
	projectDir = os.getcwd()
	# if not projectDir.split('/') == "hope":
	# 	return

	if len(sys.argv) == 2:
		projectDir = projectDir + sys.argv[1]
	elif len(sys.argv) == 1:
			projectDir = projectDir + '/frameworks/runtime-src/proj.android'

	if not os.path.exists(outDir):
		os.makedirs(outDir)

	
	Pack(androidJar,outDir,projectDir)	
	# p = packAndroid(projectDir,androidJar,outDir,apkname='hope_null')	
	# p.start()	