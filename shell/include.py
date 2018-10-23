#!/usr/bin/python

import os,json

def showInclude():
	p = "../src/cube/module/union/newView"
	ret = ["src/cube/module/union/UnionLayer.js"]
	for(d,_,items) in os.walk(p):
		for item in items:
			if not ".DS_Store" in item:
				ret.append(os.path.join(d,item).replace("../",""))
				
	info = json.dumps(ret,indent=2)
	
	with open("../src/include/module_union.js","w") as f:
		f.write("module.module_union = " + info + ";")		
			
showInclude()	