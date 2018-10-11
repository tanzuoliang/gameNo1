#encoding=utf-8

import os

from optparse import OptionParser

def execCommand(cmd):
	print cmd
	os.system(cmd)

"""
	apkfile: 要处理的apk文件 
	destfile: 要替换的文件
	sourcefile: 新文件
"""
def main(apkfile,destfile,sourcefile):
	aapt = os.environ['ANDROID_SDK_ROOT'] + '/build-tools/21.0.0/aapt'

	execCommand('%s r %s %s'%(aapt,apkfile,destfile))
	execCommand('%s a %s %s'%(aapt,apkfile,sourcefile))
	print "----------------------------- successfully d = %s s = %s"%(destfile,sourcefile)


if __name__ == '__main__':
	parser = OptionParser()
	parser.add_option("-a","--apkfile",dest="apkfile",help="")
	parser.add_option("-d","--destfile",dest="destfile",help="")
	parser.add_option("-s","--sourcefile",dest="sourcefile",help="")
	
	(option,args) = parser.parse_args()
	main(option.apkfile,option.destfile,option.sourcefile)