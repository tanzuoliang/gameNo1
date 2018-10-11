#!/usr/bin/python

ls = []


def changeStr(source,left,right):
	indexLeft   =   left + 1
	indexRight  =   right + 1
	segLeft     =   source[:left]
	ch1         =   source[left:indexLeft]
	segCen      =   source[indexLeft:right]
	ch2         =   source[right:indexRight]
	seqRight    =   source[indexRight:]
	return segLeft + ch2 + segCen + ch1 + seqRight
		
def encodeData(data):
	if len(data) < 240:
		return data
	if not data[0] == '1':
		return data
		
	data = data[1:]	

	list = [[0,39],[1,79],[2,199],[3,248]]
	for arr in list:
		data = changeStr(data,arr[0],arr[1])
	return data
	
def readData(d):
	with open(d,"r") as f:
		return f.read()
def writeData(d,data):
	with open(d,"w") as f:
		f.write(data)			
	
for f in ls:
	writeData(f, encodeData(readData(f)))
		
