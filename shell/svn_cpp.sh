#!/bin/bash
cd ../frameworks/cocos2d-x/cocos
svn up
svn ci -m ""

cd ../../runtime-src/Classes
svn up
svn ci -m ""
echo "C++和库更新到最新......"