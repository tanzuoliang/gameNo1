#!/usr/bin/python

import os

fr = "/Users/tianyi/Documents/yince/branches/branch20170724/cubeWar/res/CN/ui/module"
to = "/Users/tianyi/Documents/yince/branches/branch20180523/cubeWar/res/CN/ui/module"

fr = "/Users/tianyi/Documents/yince/branches/branch20170724/cubeWar/res/uiEffect"
to = "/Users/tianyi/Documents/yince/branches/branch20180523/cubeWar/res/uiEffect"

ress = ["baoxiangO"]

for res in ress:
	os.system("cp %s.png %s.png"%(os.path.join(fr, res),os.path.join(to, res)))
	os.system("cp %s.plist %s.plist"%(os.path.join(fr, res),os.path.join(to, res)))
	
os.chdir(to)
os.system("svn st  | awk '{if ( $1 == \"?\") { print $2}}' | xargs svn add")
os.system("svn ci -m ''")	