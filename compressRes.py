#!/usr/bin/python
from helper.respack import PackRes
import os


def rename():
    for f in ["res","src"]:
        oldname = f
        newname = "%s-new"%f
    
        _n = "__n"
    
        os.rename(oldname,_n)
        os.rename(newname,oldname)
        os.rename(_n,newname)

def checkDir(fr,to):
	ls = []
	for item in os.walk(fr):
		if not item[2]:
			continue
		for f in item[2]:
			if not ".DS" in f:
				ls.append(os.path.join(item[0], f))
	for f in ls:
		ff = f.replace(fr,to)
		if not os.path.exists(ff):
			print	"lose file ",ff		

def handr_res():
	p = PackRes("res","res-new")
	cmd = input("1:compress 2:uncompress\n")
	if cmd == 1:
		p.run()
		checkDir("res-new","res")
        rename()
	elif cmd == 2:
		p.resBackToNormal()
        rename()
			
#handr_res()
