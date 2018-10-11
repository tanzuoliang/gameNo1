#encoding=utf-8

from optparse import OptionParser
import os

def main(keyfile,signname,apkname='maple'):
	command = 'jarsigner -verbose -keystore %s -storepass maple1988 -digestalg SHA1 -sigalg MD5withRSA -signedjar %s %s yan'%(keyfile,signname,apkname)
	n = '%s'%apkname
	if 'downjoy' in n:
		command = 'jarsigner -verbose -keystore apks/downjoy_21270_Rw4tCDXY5qLXeuv.keystore -storepass downjoy_21270 -digestalg SHA1 -sigalg MD5withRSA -signedjar %s %s 21270 -keypass downjoy_21270'%(signname,apkname)

	print(command)	
	os.system(command)


if __name__ == '__main__':
	# print "qdsaqdas"
	parser = OptionParser()
	parser.add_option("-k","--keystore",dest="keystore",help="")
	parser.add_option("-d","--destfile",dest="destfile",help="")
	parser.add_option("-s","--sourcefile",dest="sourcefile",help="")
	(option,args) = parser.parse_args()

	OK = True
	if option.keystore == None:
		print("没有证书")
		OK = False
	if option.destfile == None:
		print("没有目标文件")
		OK = False

	if option.sourcefile == None:
		print("没有要加密的文件")
		OK = False

	if OK:
		main(option.keystore,option.destfile,option.sourcefile)