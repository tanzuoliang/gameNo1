# coding=utf-8
__author__ = 'wbsifan'

import json, os, shutil
from myutil.utils import readFile,writeToFile,repalceDirName,getDirsize,getFileListByExt,removeFile
class PackRes(object):
	
	def __init__(self,resPath,newPath):
		self.resPath = resPath
		self.newPath = newPath
		self.blankList = [".ExportJson",".json"]
		self.zipList = [".png"]
		self.hashList = [".png",".jpg"]
		self.noZipDir = []
		self.pngquant = os.path.join(os.path.dirname(__file__),"pngquant")
		pass
	
	def changeStr(self,source,left,right):
		indexLeft   =   left + 1
		indexRight  =   right + 1
		segLeft     =   source[:left]
		ch1         =   source[left:indexLeft]
		segCen      =   source[indexLeft:right]
		ch2         =   source[right:indexRight]
		seqRight    =   source[indexRight:]
		return segLeft + ch2 + segCen + ch1 + seqRight
		
	def encodeData(self,data):
		if len(data) < 240:
			return data
		if data[0] == '1':
			return data

		list = [[0,39],[1,79],[2,199],[3,248]]
		for arr in list:
			data = self.changeStr(data,arr[0],arr[1])
		return '1' + data
		
	def walkFiles(self,resPath):
		tree = []
		for item in os.walk(resPath):
			if item[2]:
				for file in item[2]:
					tree.append(os.path.join(item[0], file))
		return tree
	def encodeDataAndSave(self,path):
		writeToFile(path, self.encodeData(readFile(path,"rb")))		


	def copyfile(self,item,newItem,ti=False):
		with open(item) as r,open(newItem,"wb+") as w:
			if ti:
				w.write(json.dumps(json.loads(r.read()), separators=(',',':')))
				print "去空格: ", newItem
			else:
				w.write(r.read())
	def resBackToNormal(self):
		if os.path.exists(self.newPath) and getDirsize(self.resPath) < getDirsize(self.newPath):
			repalceDirName(self.resPath,self.newPath)
			print "back successfully"
	def remove_unuse(self):
		if getDirsize(self.resPath) < getDirsize(self.newPath):
			return;
		from_list = getFileListByExt(self.resPath)
		to_list = getFileListByExt(self.newPath)
		
		for f in to_list:
			fr = f.replace(self.newPath,self.resPath,1)
			if not os.path.exists(fr):
				removeFile(f)
						
	def run(self):
		
		if getDirsize(self.resPath) < getDirsize(self.newPath):
			print "has pack res"
			repalceDirName(self.resPath,self.newPath)
			return
		
		for item in self.walkFiles(self.resPath):
			newItem = item.replace(self.resPath, self.newPath,1)
			if os.path.exists(newItem) and os.path.getmtime(item) <= os.path.getmtime(newItem):
				continue
			newDir = os.path.dirname(newItem)
			extName = os.path.splitext(newItem)[1]
			if extName in [".DS_Store"]:
				continue
			if not os.path.exists(newDir):
				os.makedirs(newDir)
				
			self.copyfile(item,newItem,extName in self.blankList)
			if extName in self.zipList:
				os.system(self.pngquant + " --speed=1 --ext .png --skip-if-larger --force 256 " + newItem)
				print "压缩: ", newItem
			if extName in self.hashList:
				self.encodeDataAndSave(newItem)
				print "加密: ", newItem
		self.remove_unuse()			
		repalceDirName(self.resPath,self.newPath)

