#encoding=utf-8
from copyFile import Copy
import os,sys,json


copy = Copy()

#findFile = ''
ctn = 0;
def main():
	global ctn
	data = copy.getFileData('platform.txt');
	print data
	for (n,p) in json.loads(data)['code'].items():
		file = '../frameworks/runtime-src/proj.android/platform/%s/src/org/cocos2dx/javascript/MyApplication.java'%p
		if os.path.exists(file):
			os.system('open %s'%file)
			print "open platform =  %s \t\tfile = %s"%(p,file)
			ctn = ctn + 1;

	baseFile = 	'frameworks/runtime-src/proj.android/base/src/org/cocos2dx/javascript/MyApplication.java'		
	os.system('open %s'%baseFile)		
	print "total open %s files"%ctn		

if __name__ == '__main__':
	main()