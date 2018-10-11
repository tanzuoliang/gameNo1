#!/bin/bash
cd ../src
svn st  | awk '{if ( $1 == "?") { print $2}}' | xargs svn add
svn ci -m ""
cd ../res
svn st  | awk '{if ( $1 == "?") { print $2}}' | xargs svn add
svn ci -m ""

cd ../frameworks/cocos2d-x/cocos/
svn ci -m ""


cd ../../runtime-src/Classes
svn up
svn ci -m ""

echo "脚本和资源"