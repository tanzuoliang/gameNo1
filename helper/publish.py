# coding=utf-8
__author__ = 'wbsifan'

import os, shutil

fromBaseDir = "../"
toBaseDir = "../frameworks/runtime-src/proj.win32/Debug.win32/"


# 获取所有目录列表
def walkFiles(resPath):
	tree = []
	for item in os.walk(resPath):
		if item[2]:
			for file in item[2]:
				tree.append(os.path.join(item[0], file))
	return tree

# 复制单个文件
def copyFile(fromFile, toFile):
	toDir = os.path.dirname(toFile)
	# 创建目录
	if not os.path.exists(toDir):
		os.makedirs(toDir)
	print "Copy:", fromFile, " ==> ", toFile
	shutil.copy(fromFile, toFile)
	# 读文件
	# data = open(fromFile).read()
	# 保存文件
	# open(toFile, 'wb+').write(data)

# 批量处理文件
def copyNewFiles(fromPath, toPath):
	for item in os.walk(fromPath):
		# 不存在
		if not item[2]:
			continue

		# 批处理文件
		for file in item[2]:
			fromFile = os.path.join(item[0], file)
			toFile = fromFile.replace(fromPath, toPath)

			# 不存在目标文件
			if not os.path.exists(toFile):
				copyFile(fromFile, toFile)
				continue

			# 比目标文件新
			if os.path.getmtime(fromFile) > os.path.getmtime(toFile):
				copyFile(fromFile, toFile)
				continue




# res
copyNewFiles(fromBaseDir + "res", toBaseDir + "res")

# src
copyNewFiles(fromBaseDir + "src", toBaseDir + "src")

# main.js
copyFile(fromBaseDir + "main.js", toBaseDir + "main.js")

# project.json
copyFile(fromBaseDir + "project.json", toBaseDir + "project.json")
