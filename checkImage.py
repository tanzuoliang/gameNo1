#!/usr/bin/python

from PIL import Image
import os


def findImage(w,h):
	root = "res-new"
	out = {}
	for item in os.walk(root):
		if not item[2]:
			continue
		for f in item[2]:
			e = os.path.splitext(f)[1]
			if e == ".png" or e == ".jpg":
				ff = os.path.join(item[0],f)
				size = os.path.getsize(ff) * 0.001
				
				if size > 200:
					print ff,"  ",size
#					try:
#						im = Image.open(ff)
##						reSize = (im.width * im.height * 4) / 1024
#						print ff,"  ",size," width = ",im.width," height = ",im.height
#					except Exception as e:
#						print ff,"  ",size	

#	print out

#findImage(2048, 2048)						
				
				
					
	


import os
from PIL import Image
class GameIcon():
	def __init__(self,icon,water,out):
		
		self.android_size = {"drawable":48,"drawable-hdpi":72,"drawable-ldpi":36,"drawable-mdpi":48,"drawable-xhdpi":96,"drawable-xxhdpi":144,"max":512}
		self.ios_size = [29,40,50,57,58,72,76,80,87,100,114,120,144,152,175,180,512]
		self.icon = icon
		self.water = water
		self.outdir = out
		self.create_dir(self.outdir)
	
	def create_dir(self,_dir):
		if not os.path.exists(_dir):
			os.system("mkdir %s && chmod -R 777 %s"%(_dir,_dir))
			print "create ",_dir
	
	def start(self,platform="android"):
		self.megerimage()
			
		if platform == "android":
			for d in self.android_size:
				dd = os.path.join(self.outdir,d)
				self.create_dir(dd)
				self.resize(self.android_size[d], os.path.join(dd, "icon.png"))
		elif platform == "ios":
			for si in self.ios_size:
				self.resize(si, os.path.join(self.outdir, "Icon-%d.png"%si))
				
	
	def megerimage(self):
		if self.water and os.path.exists(self.water):
			with Image.open(self.icon) as icon_im, Image.open(self.water) as water_im:
				self.im = Image.alpha_composite(icon_im, water_im)
		else:
			with Image.open(self.icon) as icon_im:
				self.im = Image.new("RGBA", (icon_im.width,icon_im.height))
				self.im.paste(icon_im)
		
	
	def resize(self,size,f):
		cim = self.im.copy()
		cim.thumbnail((size,size))
		cim.save(f)				
		

#f = "/Users/tanzuoliang/Documents/projects/tank/frameworks/runtime-src/proj.ios_mac/ios/Default-568h@2x.png"
#ff = "/Users/tanzuoliang/Documents/projects/tank/frameworks/runtime-src/proj.ios_mac/ios/Default-Landscape~ipad.png"
#with Image.open(f) as im:
#	im.rotate(90).resize((1024,768)).save(ff)


#GameIcon("./icons/icon.png",None,"./icon_out/android/yince").start()
GameIcon("./icons/icon.png",None,"./icon_out/ios/yince").start(platform="ios")
				
					