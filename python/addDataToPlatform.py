
from tools import Tools
from optparse import OptionParser
import json,sys
from copyFile import Copy

def main(key,value):
	nameMap = json.loads(Copy().getFileData('platform.txt'))["code"]
	for (code , _name) in nameMap.items():
		path = "../frameworks/runtime-src/proj.android/platform/%s/platform.json"%_name
		Tools.addDataToJson(path,key,value)

if __name__ == '__main__':
	if len(sys.argv) > 1:
		parser = OptionParser()
		parser.add_option("-k","--key",dest="key")
		parser.add_option("-v","--value",dest="value")
		(opts,args) = parser.parse_args()
		print opts
		main(opts.key,opts.value)
