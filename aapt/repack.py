#coding=utf-8

import os,sys,shutil,json
import Tkinter
import tkMessageBox
from optparse import OptionParser
from xml.dom.minidom import parse
import re,shutil

class Command(object):
	"""docstring for Command"""

	def execCommand(self,command):
		print 'command ==>\n',command
		os.system(command)


class packAndroid:

	def __init__(self, projectDir,androidJar,outDir,apkname='mx',install=True,kPath = ""):
		self.command = Command()
		self.androidJar = androidJar
		self.outDir = outDir
		self.install = install

		self.apkname = '%s/unsign%s.apk'%(outDir,apkname)
		self.signname = '%s/%s.apk'%(outDir,apkname)

		# os.environp['ANDROID_SDK_ROOT'] = '/Users/yons/Documents/tan/android/adt-bundle-mac-x86_64-20140702/sdk'
		print 'projectDir = ',projectDir , '  androidJar = ',androidJar , '  outDir = ',outDir
		#/Users/yons/Documents/tan/android/adt-bundle-mac-x86_64-20140702/sdk'
		#/Users/yons/Documents/tan/android/adt-bundle-mac-x86_64-20140702/sdk/build-tools/21.0.0
		self.android_sdk_root = os.environ['ANDROID_SDK_ROOT'] + '/build-tools/21.0.0/'
		self.sdklib = os.environ['ANDROID_SDK_ROOT'] + "/tools/lib/sdklib.jar"
		self.aapt = self.android_sdk_root + 'aapt'
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

		self.keyfile = kPath +  '/../apks/apksign.keystore'
		self.dkeyFile = kPath + '/../apks/downjoy_21270_Rw4tCDXY5qLXeuv.keystore'

		self.res = projectDir + '/res'
		self.src = projectDir + '/src'
		self.libs = projectDir + '/lib'
		self.assets = projectDir + '/assets'
		self.bin = projectDir + "/bin"
		self.AndroidManifest = projectDir + '/AndroidManifest.xml'
		self.gen = projectDir + '/gen'
		self.dex = projectDir  + '/classes.dex'
		self.cocos2dLibSrc = projectDir + '../../js-bindings/cocos2d-x/cocos/platform/android/java/src'
		self.cocos2dLibGen = projectDir + '../../js-bindings/cocos2d-x/cocos/platform/android/java/gen'


	def generateap_(self):
		self.command.execCommand('%s package -f -S %s -I %s -A %s -M %s -F %s/mx.ap_'%(self.aapt,self.res,self.androidJar,self.assets,self.AndroidManifest,self.outDir))	
		# self.command.execCommand('%s package -f  -I %s -A %s -F %s/mx.ap_'%(self.aapt,self.androidJar,self.assets,self.outDir))

	def generateapk(self):

		command = 'java -cp %s com.android.sdklib.build.ApkBuilderMain %s -v -u -z %s/mx.ap_ -f %s -rf %s -nf %s -rj %s'%(self.sdklib,self.apkname,self.outDir,self.dex,self.src,self.libs,self.libs)
		self.command.execCommand(command)

	def addData(self):

		cmd1 = "aapt a %s"%(self)

	def generatkeystore(self):
		if not os.path.exists(self.keyfile):
			command = 'keytool -genkey -keystore %s -keyalg RSA -validity 10000 -alias yan'%(self.keyfile)	
			self.command.execCommand(command)

	def checksign(self,apk):
		command = 'jarsigner -verify mx.ap'
		self.command.execCommand(command)

	def signAPK(self):		
		command = 'jarsigner -verbose -keystore %s -storepass maple1988 -digestalg SHA1 -sigalg MD5withRSA -signedjar %s %s yan'%(self.keyfile,self.signname,self.apkname)
		if 'downjoy' in self.apkname:
			
			command = 'jarsigner -verbose -keystore %s -storepass downjoy_21270 -digestalg SHA1 -sigalg MD5withRSA -signedjar %s %s 21270 -keypass downjoy_21270'%(self.dkeyFile,self.signname,self.apkname)
		self.command.execCommand(command)

		# removeUnSignApk = 'rm %s'%self.apkname
		# self.command.execCommand(removeUnSignApk)

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

		print "create %s successful"%self.apkname	



class APKBuilder(object):

	def __init__(self,project,dest):
		# /Users/user-pc/Documents/maple/android/adt-bundle-mac-x86_64-20140702/sdk/platforms
		self.androidJar = os.environ['ANDROID_SDK_ROOT'] + '/platforms/android-22/android.jar'
		self.outDir = dest
		self.projectDir = project


	def build(self,name,filename):
		packAndroid(self.projectDir,self.androidJar,self.outDir,apkname="mx_%s"%name,install=False,kPath = filename).start()


def command(cmd):
	print cmd
	os.system(cmd)

def mkCmd(dir):
	if not os.path.exists(dir):
		command("mkdir %s"%dir)	

if __name__ == '__main__':
	parser = OptionParser()
	parser.add_option("-a","--apk",dest="apk",help="")
	parser.add_option("-vn","--versionName",dest="versionName",help="")
	parser.add_option("-vc","--versionCode",dest="versionCode",help="")
	# parser.add_option("-n","--name",dest="name",help="")
	(option,args) = parser.parse_args()

	filePath = os.path.dirname(sys.argv[0])

	OK = True
	p = "./"
	if option.apk == None:
		print("没有指定项目")
		OK = False
	else:
		p = option.apk	

	rootDir = os.path.dirname(p)	
	file = os.path.basename(p)
	filename = os.path.splitext(file)[0]

	tempDir = rootDir + "/" + filename+"_explode"

	"""  反编译  """
	mkCmd(tempDir)
	command("apktool.sh d -f %s -o %s"%(p,tempDir))

	"""  change xml """
	f = open("%s/AndroidManifest.xml"%tempDir,"r")
	data = f.read();
	print data
	f.close()
	"""   platformBuildVersionCode="22" platformBuildVersionName="5.1-1756733"> 
		android:versionCode="3" android:versionName="3.0"	

	"""
	data=data.replace('platformBuildVersionCode="22"','android:versionCode="%s"'%option.versionCode)
	print data
	# data.replace('platformBuildVersionName="\.*?"','android:versionName=3.0')
	data = re.sub('platformBuildVersionName="\d+\.\d+-\d+"', 'android:versionName="%s"'%option.versionName, data)
	f = open("%s/AndroidManifest.xml"%tempDir,"w")
	f.write(data)
	f.close()
	print data



	""" unzip apk """
	unzipDir = rootDir + "/" + filename + "_unzip"
	mkCmd(unzipDir)
	command("cp %s %s/%s.zip"%(p,rootDir,filename))
	command("unzip %s/%s.zip -d %s"%(rootDir,filename,unzipDir))


	"""  copy res and AndroidManifest.xml to unzip dir """
	# command("cp %s/res %s/res"%(tempDir,unzipDir))
	tp = "%s/res"%unzipDir
	if os.path.exists(tp):
            shutil.rmtree(tp)
	shutil.copytree("%s/res"%tempDir,tp)
	command("cp %s/AndroidManifest.xml %s/AndroidManifest.xml"%(tempDir,unzipDir))

	if OK:
		out = rootDir + "/" + filename + "_out"
		mkCmd(out)
		p = unzipDir
		n = filename
		APKBuilder(p,out).build(n,filePath)

		
		# command("mv %s/%s %s/%s"%(p,file,out,p))
