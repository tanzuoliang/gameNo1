#!/usr/bin/python

import os
import glob,json

ret = []

for f in glob.glob("../res/new/res/uiEffect/*.ExportJson"):
	ret.append(f.replace("../res/new/res/uiEffect/","").replace(".ExportJson",""))

print json.dumps(ret,indent=2)	