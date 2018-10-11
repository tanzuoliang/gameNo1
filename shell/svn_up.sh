#!/bin/bash
cd ../src
svn up
cd ../res
svn up
echo "更新脚本和资源"

cd ../frameworks/cocos2d-x/cocos/
svn up

cd ../../runtime-src/Classes
svn up