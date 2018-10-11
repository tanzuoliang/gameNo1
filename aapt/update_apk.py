#encoding=utf-8

import os,sys
from optparse import OptionParser


def signAPK(apkname,aapt=""):       
    keyfile = '%s/apks/apksign.keystore'%os.path.dirname(aapt)
    os.path.dirname
    d = os.path.dirname(apkname)
    fAllName = os.path.basename(apkname)
    (f,ext) = os.path.splitext(fAllName)

    signname = d + "/" + f + "sing" + ext;

    command = 'jarsigner -verbose -keystore %s -storepass maple1988 -digestalg SHA1 -sigalg MD5withRSA -signedjar %s %s yan'%(keyfile,signname,apkname)
    os.system(command)

    # zipP = d + "/t.zip"
    # signname1 = d + "/" + f + "sing__" + ext;
    # cmd = "cp %s %s && mv %s %s && unzip -d tt %s && rm %s"%(signname,signname1,signname1,zipP,zipP,zipP)
    # os.system(cmd)

def changeFiles(apk,source,aapt="../../aapt"):
	print os.getcwd()
	for item in os.walk(source):
		if not item[2]:
			continue

		for file in item[2]:
			
			path = os.path.join(item[0],file)
			# print path
			path = path.replace(os.path.dirname(source) + "/","")
			if path.find(".DS_Store") > -1:
				continue
			
			# print "path = %s date = %s"%(path,open(os.path.join(item[0],file),"r").read())
			os.system('python %s/changeAPK.py -a %s -d %s -s %s'%(aapt,apk,path,path))

			


if __name__ == '__main__':
	parser = OptionParser()
	parser.add_option("-f","--apkfile",dest="apkfile",help="")
	parser.add_option("-s","--source",dest="source",help="")
	parser.add_option("-o","--out",dest="out",help="")
	parser.add_option("-p","--aapt",dest="aapt",help="")
	

	(option,args) = parser.parse_args()

	OK = True
	if option.apkfile == None:
		print("没有APK文件")
		OK = False
	if option.source == None:
		print("没有要替换文件夹")
		OK = False

	if OK:
		if os.path.isdir(option.source):
			cwd = os.getcwd()
			aD = os.path.dirname(option.apkfile)
			# print "cwd = %s source = %s %s"%(cwd,aD,sys.argv[0])
			if not cwd == os.path.dirname(option.apkfile):
				# os.system("chdir %s"%aD)
				os.chdir(aD)
				# print "cwd = %s"%os.getcwd()
				cmd =  "python %s -f %s -s %s -p %s"%(sys.argv[0],option.apkfile,option.source,os.path.dirname(sys.argv[0]))
				# print "cmd = %s"%cmd
				os.system(cmd)
				# print "again"
			else:
				a = option.aapt
				changeFiles(option.apkfile,option.source,aapt=a)
				signAPK(option.apkfile,aapt=a)