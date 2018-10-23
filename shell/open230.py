#!/usr/bin/python
#encoding=utf-8
import os
"""
smb://192.168.1.230/D/游戏包/android
"""
print os.system("open smb://192.168.1.230/D/游戏包/android")


def showInclude():
	p = "../src/cube/module/union/newView"
	for(d,_,items) in os.walk(p):
		for item in items:
			if not ".DS_Store" in item:
				print '"' + os.path.join(d,item).replace("../","") + '",'
			
#showInclude()			