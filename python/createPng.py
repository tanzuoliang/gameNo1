#encoding=utf-8

from optparse import OptionParser
import os,sys
from copyFile import Copy




commandMerge = "java MergePng %s %s %s"
commandResize = "java TestResizeImage %s %s %s"

def run(command):
	print "command = " + command
	os.system(command)

def assignToAndroidPlatform(f,source):
	pPath = "../frameworks/runtime-src/proj.android/res"
	if os.path.exists(pPath):
		Copy().copyFiles(f,pPath)
	else:
		print "项目中不存在渠道%s"%source

#def assignToAndroidPlatform(f,source):
#	pPath = "../frameworks/runtime-src/proj.android/platform/%s/"%source
#	if os.path.exists(pPath):
#		path = "../frameworks/runtime-src/proj.android/platform/%s/res"%source
#		print "path = %s"%path
#		Copy().copyFiles(f,path)
#	else:
#		print "项目中不存在渠道%s"%source	

def assignToIOSPlatform(f,source):
	pPath = "../frameworks/runtime-src/proj.ios_mac/ios/%s/"%source
	if os.path.exists(pPath):
		path = "../frameworks/runtime-src/proj.ios_mac/ios/%s/res"%source
		print "path = %s"%path
		Copy().copyFiles(f,path)
	else:
		print "项目中不存在渠道%s"%source	


def mePng(platform,source):
	pa = os.getcwd() + "/icons/%s/"%platform + source
	if not os.path.exists(pa):
		print "你输入的%s平台%s不存在"%(platform,pa)
		return False,False

	icon = os.getcwd() + '/icons/icon.png'
	out =  os.getcwd() + '/icons/%s/'%platform + source
	sortname = out + '/icon.png'
	water = os.getcwd() + '/icons/%s/'%platform + source + '/water.png'
	if os.path.exists(water):
		run(commandMerge%(icon,water,sortname))
	else:
		run('cp %s %s'%(icon,sortname))	

	out = out + "/out"
	if not os.path.exists(out):
		print "makedirs %s/%s"%(os.getcwd(),out)
		os.makedirs(out)

	return sortname,out	


def android(source):
	(sortname,out) = mePng('android',source)
	if sortname == False:
		return

	run(commandResize%(sortname,out + "/drawable/icon.png",48))
	# run(commandResize%(sortname,out + "/drawable/icon.png",96))
	run(commandResize%(sortname,out + "/drawable-hdpi/icon.png",72))
	run(commandResize%(sortname,out + "/drawable-mdpi/icon.png",48))
	run(commandResize%(sortname,out + "/drawable-ldpi/icon.png",36))
	run(commandResize%(sortname,out + "/drawable-xhdpi/icon.png",96))
	run(commandResize%(sortname,out + "/drawable-xxhdpi/icon.png",144))

	assignToAndroidPlatform(out,source)

def ios(source):
	(sortname,out) = mePng('ios',source)
	if sortname == False:
		return

	list = [29,40,50,57,58,72,76,80,100,114,120,144,152,175,180,512]
	for si in list:
		run(commandResize%(sortname,out + "/Icon-%s.png"%si,si))
	assignToIOSPlatform(out,source)







if __name__ == '__main__':
	# main()

	parser = OptionParser();
	# parser.add_option("-s" , "--source", dest='icon' ,help="")
	# parser.add_option('-w',"--water",dest='water',help="")
	parser.add_option('-p','--platform', dest='platform' ,help="平台 android ios")
	parser.add_option('-s','--source', dest='source' ,help="渠道")

	(options,args) = parser.parse_args();
	print sys.argv
	(rootPath,b) = os.path.split(sys.argv[0])
	print "rootPath = " + rootPath
	if not cmp(os.getcwd(),rootPath) == 0 and not cmp('',rootPath) == 0:
		cdCmd = 'cd %s'%rootPath
		pyCmd = 'python %s -p %s -s %s'%(b,options.platform,options.source)
		run('%s && %s'%(cdCmd,pyCmd))
	else:	

		if options.platform:
			if options.platform == 'android':
				android(options.source)
			elif options.platform == 'ios':
				ios(options.source)	
		else:
			print('你没有选择平台')				