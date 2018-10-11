#coding=utf-8

import os,sys,shutil,json,time
import Tkinter
import tkMessageBox

class Command(object):
	"""docstring for Command"""

	def execCommand(self,command):
		print 'command ==>',command
		os.system(command)


class packAndroid:

	def __init__(self, projectDir,androidJar,outDir,apkname='tank',install=True,versionCode=''):
		self.command = Command()
		self.androidJar = androidJar
		self.outDir = outDir + '/' + apkname.split('_')[-1]
		self.install = install

		self.checkDir('apks')
		self.checkDir('apks/sign')
		self.apkname = 'apks/%s.apk'%apkname
		self.signname = 'apks/sign/%s.apk'%apkname
		self.zipname = "apks/sign/%s_align_%s_%s.apk"%(apkname,time.strftime('%m_%d_%H_%M_%S',time.localtime(time.time())),versionCode)

		# os.environp['ANDROID_SDK_ROOT'] = '/Users/yons/Documents/tan/android/adt-bundle-mac-x86_64-20140702/sdk'
		print 'projectDir = ',projectDir , '  androidJar = ',androidJar , '  outDir = ',outDir
		#/Users/yons/Documents/tan/android/adt-bundle-mac-x86_64-20140702/sdk'
		#/Users/yons/Documents/tan/android/adt-bundle-mac-x86_64-20140702/sdk/build-tools/21.0.0
		self.android_sdk_root = os.environ['ANDROID_SDK_ROOT'] + '/build-tools/21.0.0/'
		self.sdklib = os.environ['ANDROID_SDK_ROOT'] + "/tools/lib/sdklib.jar"
		self.aapt = self.android_sdk_root + 'aapt'
		#jdk1.8.0_65.jdk
		if 'tencent' in apkname:
			self.javac = '/Library/Java/JavaVirtualMachines/jdk1.7.0_79.jdk/Contents/Home/bin/javac'
			self.java = '/Library/Java/JavaVirtualMachines/jdk1.7.0_79.jdk/Contents/Home/bin/java'
			self.jdkTarget = '1.7'
		else:
			self.javac = '/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home/bin/javac'
			self.java = '/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home/bin/java'
			self.jdkTarget = '1.6'
				

		self.dx = self.android_sdk_root + 'dx'
		self.apkbuilder = self.android_sdk_root + 'apkbuilder.bat'

		self.keyfile = 'apks/tianyi.keystore'

		self.res = projectDir + '/res'
		self.src = projectDir + '/src'
		self.libs = projectDir + '/libs'
		self.assets = projectDir + '/assets'
		self.bin = projectDir + "/bin"
		self.AndroidManifest = projectDir + '/AndroidManifest.xml'
		self.gen = projectDir + '/gen'
		self.cocos2dLibSrc = projectDir + '../../js-bindings/cocos2d-x/cocos/platform/android/java/src'
		self.cocos2dLibGen = projectDir + '../../js-bindings/cocos2d-x/cocos/platform/android/java/gen'

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
#		list = self.getFileList(self.gen,'.java') + self.getFileList(self.src,'.java') + self.getFileList(self.cocos2dLibSrc,'.java') + self.getFileList(self.cocos2dLibGen,'.java')
		list = self.getFileList(self.gen,'.java') + self.getFileList(self.src,'.java')
		print list
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
		self.command.execCommand('%s -encoding UTF-8 -target %s -bootclasspath %s -d %s %s -classpath %s'%(self.javac, self.jdkTarget, self.androidJar,self.outDir + '/classes',self.getJavaFileList(),self.getFileList(self.libs,'.jar',split=':')))	
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
		self.command.execCommand('%s package -f -S %s -I %s -A %s -M %s -F %s/tank.ap_'%(self.aapt,self.res,self.androidJar,self.assets,self.AndroidManifest,self.outDir))	

	def generateapk(self):
		command = 'java -cp %s com.android.sdklib.build.ApkBuilderMain %s -v -u -z %s/tank.ap_ -f %s/classes.dex -rf %s -nf %s -rj %s'%(self.sdklib,self.apkname,self.outDir,self.outDir,self.src,self.libs,self.libs)
		self.command.execCommand(command)

	def addDexToApk(self):



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
		command = 'jarsigner -verify tank.ap'
		self.command.execCommand(command)

	def signAPK(self):		
		command = 'jarsigner -verbose -keystore %s -storepass tianyi2016 -digestalg SHA1 -sigalg MD5withRSA -signedjar %s %s tianyi'%(self.keyfile,self.signname,self.apkname)
		if 'downjoy' in self.apkname:
			command = 'jarsigner -verbose -keystore apks/downjoy_21270_Rw4tCDXY5qLXeuv.keystore -storepass downjoy_21270 -digestalg SHA1 -sigalg MD5withRSA -signedjar %s %s 21270 -keypass downjoy_21270'%(self.signname,self.apkname)
		self.command.execCommand(command)

		removeUnSignApk = 'rm %s'%self.apkname
		self.command.execCommand(removeUnSignApk)

	def zipApk(self):
		
		if os.path.exists(self.zipname):
			self.command.execCommand('rm %s'%self.zipname)
		command = "zipalign -v 4 %s %s"%(self.signname,self.zipname)

		self.command.execCommand(command)
		removeSignApk = 'rm %s'%self.signname
		self.command.execCommand(removeSignApk)	

	def installapk(self):
		cmd = 'adb install %s'%(self.zipname)	
		self.command.execCommand(cmd)

	def start(self):
		# return
		if os.path.exists(self.outDir):
			shutil.rmtree(self.outDir)


		""" need remove gen dir """	
		if os.path.exists(self.gen):
			shutil.rmtree(self.gen)

		""" need remove gen dir """	
		if os.path.exists(self.bin):
			shutil.rmtree(self.bin)	

		os.makedirs(self.gen)	

		self.generateRJava()
		self.generateJavaToClass()
		self.generateClassToJar()
		self.generateDex()
		self.generateap_()
		self.generateapk()
		self.generatkeystore()
		self.signAPK()
		self.zipApk()
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
				packAndroid(self.projectDir,self.androidJar,self.outDir,apkname="tank_" + name,install=False)

	def build(self,name,versionCode):
		packAndroid(self.projectDir,self.androidJar,self.outDir,apkname="tank_" + name,install=False,versionCode=versionCode).start()
				


class Pack(object):

	def __init__(self,androidJar,outDir,projectDir):
		self.androidJar = androidJar
		self.outDir = outDir
		self.projectDir = projectDir
		self.top = Tkinter.Tk()
		self.top.wm_title('坦克android平台')
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
    			packAndroid(self.projectDir,self.androidJar,self.outDir,apkname="tank_" + name)	

        def showGrid(self):
    		jsonDic = json.loads(open('python/platform.txt','r').read())
    		for (k,name) in jsonDic['code'].items():
			self.btnDict[name] = self.addBtn(name + "      :FALSE",self.checkButton(name),int(k),0)

		self.addBtn("start",self.start,0,1)
		self.top.mainloop()		


if __name__ == '__main__':
	
	androidJar = os.environ['ANDROID_SDK_ROOT'] + '/platforms/android-22/android.jar'
	outDir = 'outapk'

	projectDir = os.getcwd()

	if len(sys.argv) == 2:
		projectDir = projectDir + sys.argv[1]
	elif len(sys.argv) == 1:
			projectDir = projectDir + '/frameworks/runtime-src/proj.android'

	if not os.path.exists(outDir):
		os.makedirs(outDir)
	
	Pack(androidJar,outDir,projectDir)	

