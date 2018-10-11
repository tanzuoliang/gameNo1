#!/bin/bash
cd ../src
svn st  | awk '{if ( $1 == "!") { print $2}}' | xargs svn del
cd ../res
svn st  | awk '{if ( $1 == "!") { print $2}}' | xargs svn del
echo "删除不需要的脚本和资源"