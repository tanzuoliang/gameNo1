#codeing=utf-8

import os,sys
from copyFile import Copy

class RPV(object):
	"""docstring for RPV"""

	copy = Copy()

	def __init__(self, arg):
		super(RPV, self).__init__()
		self.arg = arg

	def update(self,path,fromV,toV):
		data = self.copy.getFileData(path)
		data = data.replace(fromV,toV)
		print 'data\n',data
		self.copy.saveDataToFile(path,data)
		print '%s update from %s to %s'%(path,fromV,toV)



if __name__ == '__main__':
	prv = RPV('init')
	root = 'frameworks/runtime-src/proj.ios_mac/ios/'

	platformName = sys.argv[1]
	path = root + platformName + '/res/Info.plist'
	fromV = '<string>%s</string>'%sys.argv[2]
	toV = '<string>%s</string>'%sys.argv[3]
	prv.update(path,fromV,toV)
	#nameMap = {"0":"null","1":"baidu","2":"pp","3":"tb","4":"xy" ,"5":"iTools","6":"i4","7":"tb_new"}

	#root = 'frameworks/runtime-src/proj.ios_mac/ios/'
	#for platform in nameMap:
	#	platformName = nameMap[platform]
	#	path = root + platformName + '/res/Info.plist'
	#	prv.update(path,'1.1','1.2')


			
		