# coding=utf-8
__author__ = 'tzl'

import os, shutil
from xml.dom.minidom import Document
from xml.dom.minidom import parse
import sys
from copyFile import Copy
import tkMessageBox

reload(sys)
sys.setdefaultencoding('utf-8')

class CreateAndroidMk:

    platfom_pxiel =  ''
    
    mainmk = ""

    mainmkPath = ""
    storeMkPath = ""
    
    rootpath = ""
    
    platformCode = 0
    
    push_platform = ""
    
    log_platform = ""
    
    copy = ""
    
    changeMK = False
    
    def setPushPlatform(self,pn):
        self.push_platform = pn
    
    def setLogPlatform(self,pn):
        self.log_platform = pn
    
    def __init__(self,_rootpath,platform,platformCode):
        self.platfom_pxiel = platform
        self.rootpath = _rootpath
        self.platformCode = platformCode
    
        self.mainmkPath = _rootpath + "base/mk/Android.mk"
        self.storeMkPath = _rootpath + "jni/Android.mk"
        self.copy = Copy()

    def openFileByWrite(self,path,info):
        path = self.rootpath + path
        f = open(path,'w')
        f.write(info)
        f.close()
    #读取文件内容
    def getFileData(self,path):
        f = open(path,'r')
        str = f.read()
        f.close()
        return str
    
    def saveFile(self,path,info):
        f = open(path,'w')
        f.write(info)
        f.close()
    
    #替换文件内容
    #fromStr 源内容
    #flagStr 替换标记
    #replaceStr 替换后内容
    def replaceData(self,fromStr,flagStr,replaceStr):
        #print "flagStr == ",flagStr ,"  replaceStr == ",replaceStr
        return fromStr.replace(flagStr,replaceStr)

    def start(self):
        self.mainmk = self.getFileData(self.mainmkPath)
        
        platform_mk = self.rootpath + "platform/" + self.platfom_pxiel + "/mk/Android.mk"
        
        if os.path.exists(platform_mk):
            platform_mk_str = self.getFileData(platform_mk)
            self.mainmk = self.replaceData(self.mainmk,"#platform_so",platform_mk_str)
                #print "current mk info = \n",self.mainmk
#------------------------- push platform ------------------------------------------------------------

        if self.push_platform.strip():
            pushmkPath = self.rootpath + "push/" + self.push_platform + "/mk/Android.mk"
            #print "pushmkPath = ",pushmkPath
            if os.path.exists(pushmkPath):
                pushmk_str = self.getFileData(pushmkPath)
                self.mainmk = self.replaceData(self.mainmk,"#push_so",pushmk_str)

# print "current mk info = \n",self.mainmk
#-------------------------- end push platform ---------------------------------------------------------


#-------------------------- start Log platform --------------------------------------------------------
        if self.log_platform.strip():
            logmkPath = self.rootpath + "log/" + self.log_platform + "/mk/Android.mk"
            if os.path.exists(logmkPath):
                loghmk_str = self.getFileData(logmkPath)
                self.mainmk = self.replaceData(self.mainmk,"#log_so",loghmk_str)
        
    

#-------------------------- end log platform ----------------------------------------------------------
        oldMkInfo = self.getFileData(self.storeMkPath)
        if not cmp(oldMkInfo,self.mainmk) == 0:
            tkMessageBox.showinfo("警告","mk  文件修改了 这下编译so文件的时候又得重新编了")
            self.saveFile(self.storeMkPath,self.mainmk)
        else:
            print "mk文件没变"
            self.changeMK = True

    def __copySoFiles__(self,fromDir,toDir):
        if os.path.exists(fromDir):
            self.copy.copyFiles(fromDir,toDir)
    
    
    def copySoFilesToCocos(self):
        toDir = self.rootpath + "jni/prebuild"
        if not self.changeMK:
            return
        #print "copySoFilesToCocos(self):"
        
        platfor_prebuild_path = self.rootpath + "platform/" + self.platfom_pxiel + "/prebuild"
        self.__copySoFiles__(platfor_prebuild_path,toDir)

        push_prebuild_path = self.rootpath + "push/" + self.push_platform + "/prebuild"
        self.__copySoFiles__(push_prebuild_path,toDir)

        log_prebuild_path = self.rootpath + "log/" + self.push_platform + "/prebuild"
        self.__copySoFiles__(log_prebuild_path,toDir)

    #这个是不编译cpp的处理方式
    def copySoFilesToAndroid(self):
        toDir = self.rootpath + "libs/armeabi"
        self.copy.removeFileByFilter(toDir,['libcocos2djs.so','gdb.setup','gdbserver'])
        
        platfor_prebuild_path = self.rootpath + "platform/" + self.platfom_pxiel + "/prebuild"
        self.__copySoFiles__(platfor_prebuild_path,toDir)
        
        push_prebuild_path = self.rootpath + "push/" + self.push_platform + "/prebuild"
        self.__copySoFiles__(push_prebuild_path,toDir)
        
        log_prebuild_path = self.rootpath + "log/" + self.log_platform + "/prebuild"
        self.__copySoFiles__(log_prebuild_path,toDir)







