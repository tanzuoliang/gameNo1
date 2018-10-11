# coding=utf-8
__author__ = 'tzl'

import os, shutil
from xml.dom.minidom import Document
from xml.dom.minidom import parse
import sys
from python.copyFile import Copy

reload(sys)
sys.setdefaultencoding('utf-8')


"""
/Users/osx/Documents/maple/projects/冒险大乱斗/newHope
"""

class Icon:
    """docstring for Icon"""
    def __init__(self):
        self.copy = Copy()
        self.main = '/Users/osx/Downloads/out/'
        self.mainback = '/Users/osx/Documents/maple/projects/冒险大乱斗/newHope/frameworks/runtime-src/'

    """
    将下载的out文件删除
    """    
    def removeoutdir(self):
        self.copy.removeDir(self.main)

    def start(self,p,p_n=''):
        print "start to copy icons"
        if p == "android":
            self.root =  self.main + 'android/'
            self.backRoot =  self.mainback + 'proj.android/platform/'
        elif p == "ios":
            self.root = self.main +  'ios/'
            self.backRoot = self.mainback + 'proj.ios_mac/ios/'
        else:
            raise("平台参数错误")     

        filterList = ['.DS_Store']    
        print os.listdir(self.root)    
        for searchDir in os.listdir(self.root):
            if searchDir in filterList or (not p_n == '' and not p_n == searchDir):
                print "filter dir %s"%searchDir
                continue


            print "dir = ",searchDir 
            if os.path.exists(self.backRoot + searchDir):
                print self.root + searchDir, " =============> ", self.backRoot + searchDir + '/res'
                self.copy.copyFiles(self.root + searchDir,self.backRoot + searchDir + '/res') 
                self.copy.removeDir(self.backRoot + searchDir + '/res/max')
            else:
                print "dir %s can't be find......."%(self.backRoot + searchDir)           
        
        self.removeoutdir()

    # def copyIos(self):
    #     for searchDir in os.listdir(self.root):
    #         print "dir = ",searchDir 
    #         self.copy.copyFiles(self.root + searchDir,self.backRoot + searchDir + '/res')

    # def copyAndroid(self):
    #     for searchDir in os.listdir(self.root):
    #         print "dir = ",searchDir 
    #         self.copy.copyFiles(self.root + searchDir,self.backRoot + searchDir + '/res')  

""" p_n  如果有值说明只想复制一个平台 """
if __name__ == '__main__':
    
    downlaodPath = "/Users/osx/Downloads"
    zipFile = "%s/out.zip"%downlaodPath
    hasOutDir = os.path.exists("%s/out"%downlaodPath)

    if os.path.exists(zipFile) and not hasOutDir:
        os.system("unzip  %s -d %s"%(zipFile,downlaodPath))
        os.system("rm %s"%zipFile)
	
    hasOutDir = os.path.exists("%s/out"%downlaodPath)
    if not hasOutDir:
        print "没有相关文件"
    else:    
        p_n = ''
        p = "android"
        if len(sys.argv) == 3:
            p = sys.argv[1]
            p_n = sys.argv[1]
        elif len(sys.argv) == 2:
            p_n = sys.argv[1]
        else:
            p_n = ''        

        print "p=%s ,p_n = %s"%(p,p_n)
        Icon().start(p,p_n)
        # p = raw_input('选择平台类型 1:ios 2:android\n')
        #     # print p;
        # if p == '1':
        #     Icon().start('ios',p_n)
        # elif p == '2':
        #     Icon().start('android',p_n)  


