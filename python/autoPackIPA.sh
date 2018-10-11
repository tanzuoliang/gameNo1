#!/bin/bash
#Author LuoYangWang
#date 2017/10/23


SCHEMENAME=cubeWar
BRANCHNAME=develop

DATE='date + %Y%m%d_%H%M'
SOURCEPATH=$(cd "$(dirname $0)" && pwd)
IPAPATH=$SOURCEPATH/AutoBuildIPA/$BRANCHNAME/$DATE
IPANAME=$SCHEMENAME_$DATE.ipa




#build cubeWar
xcodebuild \
-workspace $SOURCEPATH/$SCHEMENAME.xcodeproj \
-scheme $SCHEMENAME \
-configuration Debug \
#clean \
build \
-derivedDataPath $IPAPATH


if [-e $IPAPATH]; then
	echo "xcode build Successful"
else
	echo "error: Build Failed!!"
	exit 1
fi 


