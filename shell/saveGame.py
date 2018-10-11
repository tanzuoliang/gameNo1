#!/usr/bin/python

from myutil.utils import copyFile,copyDir
import os

project = "../"
targetDir = "/Users/tianyi/Documents/study/project/gameNo1"

syncTarget = [
	"aapt",
	"helper",
	"python",
	"shell",
	"frameworks/cocos2d-html5",
	"frameworks/cocos2dx",
	"frameworks/cocos2d-x/cocos",
	"frameworks/runtime-src/Classes",
	"frameworks/runtime-src/proj.android/src",
	"frameworks/runtime-src/proj.android/jni",
	"frameworks/runtime-src/proj.ios_mac/ios/app",
	"frameworks/runtime-src/proj.ios_mac/ios/net",
	"frameworks/runtime-src/proj.ios_mac/ios/utils",
	"src/core",
	"src/include"
]

syncFiles = [
	"cocosAndroid.py",
	"compressRes.py",
	"create.py",
	"checkImage.py",
	"hot_res.py",
	"platform.py",
	"publish/android/justRun.py",
	"frameworks/runtime-src/proj.ios_mac/ios/AppController.h",
	"frameworks/runtime-src/proj.ios_mac/ios/AppController.mm",
	"frameworks/runtime-src/proj.ios_mac/ios/RootViewController.h",
	"frameworks/runtime-src/proj.ios_mac/ios/RootViewController.mm",
	"frameworks/runtime-src/proj.ios_mac/ios/Info.plist",
	"main.js",
	"src/module.js",
	"src/cube/uicore/ui/NewRichText.js"
]

for target in syncTarget:
#	print os.path.join(project,target), os.path.join(targetDir,target)
	copyDir(os.path.join(project,target), os.path.join(targetDir,target))
	
for f in syncFiles:
#	print os.path.join(project,f), os.path.join(targetDir,f)
	copyFile(os.path.join(project,f), os.path.join(targetDir,f))	