#!/usr/bin/python

from myutil.utils import copyDir,copyFile
import os

print os.getcwd()

"""
cubeWar-ahteuyawqnksliahfvgarrnmskun
"""
frRoot = "../"
toRoot = "/Users/tianyi/Library/Developer/Xcode/DerivedData/cubeWar-ahteuyawqnksliahfvgarrnmskun/Build/Products/Debug/cubeWar-desktop copy.app/Contents/Resources"



copyDir(os.path.join(frRoot, "src"), os.path.join(toRoot, "src"))
copyDir(os.path.join(frRoot, "res"), os.path.join(toRoot, "res"))
copyFile(os.path.join(frRoot, "main.js"), os.path.join(toRoot, "main.js"))
copyFile(os.path.join(frRoot, "platform.json"), os.path.join(toRoot, "platform.json"))
copyDir(os.path.join(frRoot, "frameworks/cocos2d-x/cocos/scripting/js-bindings/script"), os.path.join(toRoot, "script"))

os.system("open -n /Users/tianyi/Library/Developer/Xcode/DerivedData/cubeWar-ahteuyawqnksliahfvgarrnmskun/Build/Products/Debug/cubeWar-desktop\ copy.app")
