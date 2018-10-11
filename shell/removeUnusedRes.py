#!/usr/bin/python

import os

herols = []

with open("unuseHero.txt","r") as f:
	for l in f.readlines():
		herols.append(l.strip())
		
print herols		