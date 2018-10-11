# coding=utf-8
__author__ = 'tzl'

import os, shutil

def changeDirName(dirL,dirR):
    if os.path.exists(dirL) and os.path.exists(dirR):
        os.rename(dirL,dirL + "-tmp")
        os.rename(dirR,dirL)
        os.rename(dirL + "-tmp",dirR)

path = "../res"

if os.path.exists(path + "/encode.txt"):
    changeDirName("../res","../res-new")