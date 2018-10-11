# coding=utf-8
__author__ = 'tzl'

import os, shutil

from copyFile import Copy
from copyFile import Assets
import json
import tkMessageBox

class Plugin:

    _rootPath = ""
    copy = ""
    
    platform_assets = "platform_assets"
    currentPlatform = ""
    
    def __init__(self,rootPath):
        self._rootPath = rootPath
        self.copy = Copy()


    """
    将临时资源拷贝到项目中
    """  
    def tempAssetsToAndroidProject(self):
        self.copy.copyFiles(self.platform_assets,self.fromDir + "assets")


    def registerGamePlatform(self,fromBaseDir,toBaseDir,platformCode,operationCode,platformname="default"):
        if os.path.exists(self.platform_assets):
            shutil.rmtree(self.platform_assets)

        os.mkdir(self.platform_assets)
        
        self.fromDir = fromBaseDir
        self.toDir = toBaseDir

        """
        平台的assets
        """
        if operationCode == 1:
            self.copy.copyFiles(fromBaseDir + "assets",self.platform_assets)
        elif operationCode == 2:
            self.copy.copyFiles(fromBaseDir + "assets",toBaseDir + "assets")

        self.copy.copyFiles(toBaseDir + "base/assets",toBaseDir + "assets")    
        
        """ 复制 android res """
        Assets().removeAssetsByFilter(toBaseDir + "res",[])
        self.copy.copyFiles(toBaseDir + "base/res",toBaseDir + "res")
        print "copy ",fromBaseDir ," res"
        self.copy.copyFiles(fromBaseDir + "res",toBaseDir + "res")
        
        mainJsPath = "main.js"
            #if os.path.exists("frameworks/runtime-src/proj.android/platform/main.jsc"):
            #mainJsPath = "main.jsc"

        #if platformCode == 0:
        #self.copy.copyFile(fromBaseDir + mainJsPath, mainJsPath)
        #else:
        # self.copy.copyFile("frameworks/runtime-src/proj.android/platform/" + mainJsPath, mainJsPath)
        
        
            
        # self.copy.removeFileByFilter(toBaseDir + "libs",[])
        """  复制libs """
        # libsList = ["armeabi","armeabi-v7a","mips","x86"]
        self.copy.removeDir(toBaseDir + "libs")
       
        self.copy.copyFiles(toBaseDir + "base/libs",toBaseDir + "libs")
        self.copy.copyFiles(fromBaseDir + "libs",toBaseDir + "libs")        


        # for name in libsList:
        #     ppath = fromBaseDir + 'libs/' + name
        #     if not os.path.exists(ppath):
        #         print "remove unused"
        #         self.copy.removeDir(toBaseDir + 'libs/' + name)

        

        appPath = 'src/org/cocos2dx/javascript/MyApplication.java'
        self.copy.copyFile(toBaseDir + 'base/' + appPath,toBaseDir + appPath)

        myActivity = 'src/org/cocos2dx/javascript/AppActivity.java'
        self.copy.copyFile(toBaseDir + 'base/' + myActivity,toBaseDir + myActivity)


        """  复制平台代码 """
        Assets().removeAssetsByFilter(toBaseDir + "src/org/cocos2dx/javascript/platform",['base','PlatformManager.java'])
        # Assets().removeAssetsByFilter(toBaseDir + "src/com/maple/hope/",[])
        Assets().removeAssetsByFilter(toBaseDir + "src/com/",["android"])
        # self.copy.removeDir(toBaseDir + "src")
        # self.copy.copyFiles(toBaseDir + "base/src",toBaseDir + "src")
        self.copy.copyFiles(toBaseDir + "base/src",toBaseDir + "src")
        self.copy.copyFiles(fromBaseDir + "src",toBaseDir + "src")


        self.copy.copyFile(fromBaseDir + "AndroidManifest.xml", toBaseDir + "AndroidManifest.xml")

        """ 复制平台配置 """
        platformJson = "platform.json"
        self.copy.copyFile(fromBaseDir + platformJson, platformJson)
        self.copy.copyFile(fromBaseDir + platformJson, toBaseDir + 'assets/' + platformJson)

        # #-------------------------------   clear platform code ---------------------------------------
        # #baidu
        # self.copy.removeFileByFilter(toBaseDir + "src/org/cocos2dx/javascript/platform/baidu",[])
        # #oppo
        # self.copy.removeDir(toBaseDir + "src/com/nearme/gamecenter/open/api")
        
        # #-------------------------------   clear platform code ---------------------------------------
        
        # #-------------------------------   add platform code -----------------------------------------
        # # baidu_platform
        # if platformCode == 4:
        #     self.refisterBaidu(fromBaseDir,toBaseDir)
        # elif platformCode == 5:
        #     self.registerOppo(fromBaseDir,toBaseDir)
        #-------------------------------   add platform code ----------------------------------------

    def backFileToPlatfrom(self,f,t,t2=""):
        if os.path.exists(t):
            self.copy.copyFile(f,t)
        elif os.path.exists(t2):
            self.copy.copyFile(f,t2)    
            

    """  将在项目中修改的平台代码保存到平台中去 """    
    def backToPlatform(self):

        """  平台相关 src  """
        tailPath = 'src/org/cocos2dx/javascript/platform'
        info =  self.copy.getFileData('python/log.txt')
        if info == "":
            return
        recoderList = info.split('_')
        platformname = recoderList[0]

        print "将当前项目中修改数据回退到平台%s"%platformname


        # curPlatJsonPath = "frameworks/runtime-src/proj.android/assets/platform.json"
        # jsonData = json.loads(self.copy.getFileData(curPlatJsonPath))
        # if not jsonData['platform_name'] == platformname:
        #     tkMessageBox.showinfo("通知","平台不当 保存的是%s,而当前是%s"%(platformname,jsonData['platform_name']))
        #     return

        headPath = 'frameworks/runtime-src/proj.android/'
        fromDir = headPath + tailPath
        toDir = headPath + 'platform/' + platformname + '/' + tailPath

        print "fromDir = ",fromDir,"  toDir = ",toDir
        for item in os.walk(fromDir):
            # print 'javascript/platform/base    ',item[0] ,'javascript/platform/base' in item[0]
            if not item[2] or 'javascript/platform/base' in item[0]:
                print "filter file%s"%item[0]
                continue

            filterList = ['.DS_Store','PlatformManager.java']    
            for file in item[2]:
                if file in filterList:
                    continue
                fromPath = os.path.join(item[0],file)
                toPath = fromPath.replace(fromDir,toDir)
                # print fromPath , " ======> ",toPath 
                self.copy.copyFile(fromPath,toPath)    

        """ handler MyApplication """

        backFiles = ["src/org/cocos2dx/javascript/MyApplication.java","src/org/cocos2dx/javascript/AppActivity.java","src/org/cocos2dx/javascript/LoadingActivity.java"]
        for file in backFiles:
            self.backFileToPlatfrom(headPath + file,headPath + 'platform/' + platformname + '/' + file,headPath + 'base/' + file)

        """      back to push   """        
        pushname = recoderList[1]
        pushPath = headPath + 'src/org/cocos2dx/javascript/push'
        self.copy.copyFiles(pushPath,headPath + 'push/' + pushname + '/src')   

        """  项目配置 """
        self.copy.copyFile(headPath + 'assets/platform.json',headPath + 'platform/' + platformname + '/platform.json') 
        self.copy.copyFile(headPath + 'assets/main.js','main.js') 

        """  about com dir"""
        for item in os.walk(headPath + "src/com"):
            if not item[2]:
                continue

            for file in item[2]:
                fromFile = os.path.join(item[0],file)
                toFile = fromFile.replace(headPath + "src/com",headPath + "platform/" + platformname + "/src/com",1)
                if os.path.exists(toFile):
                    self.copy.copyFile(fromFile,toFile)    

    def registerPushPlatform(self,fromBaseDir,toBaseDir,pushCode,p=None):

        javaDir = toBaseDir + "src/org/cocos2dx/javascript/push"
        self.copy.removeDir(javaDir)
        self.copy.copyFiles(fromBaseDir + 'src',javaDir)



        """
             tt平台需要用自己的android-support-v4.jar 而这个版本比push里的高，只能特殊处理下了  
        """
        # if not p == "tencent":
        #     self.copy.copyFiles(fromBaseDir + "assets",toBaseDir + "assets")
        #     if not p =="tt":
        #         self.copy.copyFiles(fromBaseDir + "libs",toBaseDir + "libs")
        #     else:
        #         self.copy.copyFiles(fromBaseDir + "libs",toBaseDir + "libs",filterFiles=['android-support-v4.jar'])
        filterList = ["tt","yeshen"]
        self.copy.copyFiles(fromBaseDir + "assets",toBaseDir + "assets")
        if not p in filterList:
            self.copy.copyFiles(fromBaseDir + "libs",toBaseDir + "libs")
        else:
            self.copy.copyFiles(fromBaseDir + "libs",toBaseDir + "libs",filterFiles=['android-support-v4.jar'])
        self.currentPlatform = p




    def registerLogPlatform(self,fromBaseDir,toBaseDir):
        self.copy.copyFiles(fromBaseDir + "assets",self.platform_assets)
        self.copy.copyFiles(fromBaseDir + "libs",toBaseDir + "libs")
        self.copy.copyFiles(fromBaseDir + "res",toBaseDir + "res")


#---------------------------------------- platform --------------------------------------------------------------------
    def refisterBaidu(self,fromBaseDir,toBaseDir):
        self.copy.copyFiles(fromBaseDir + "src",toBaseDir + "src/org/cocos2dx/javascript/platform")
    
    def registerOppo(self,fromBaseDir,toBaseDir):
        dirPath = "src/com/nearme/gamecenter/open/api"
        self.copy.copyFiles(fromBaseDir + dirPath,toBaseDir + dirPath)

#---------------------------------------- push -------------------------------------------------------------------------
    def registerXgPush(self,fromBaseDir,toBaseDir):
        javaPath = toBaseDir + "src/com/qq/xgdemo/receiver/MessageReceiver.java"
        #self.copy.removeFile(javaPath)
        self.copy.copyFile(fromBaseDir + "MessageReceiver.java",javaPath)
            
        javaPath = toBaseDir + "src/com/qq/xgdemo/receiver/XGNotification.java"
        #self.copy.removeFile(javaPath)
        self.copy.copyFile(fromBaseDir + "XGNotification.java",javaPath)

        javaPath = toBaseDir + "src/com/qq/xgdemo/receiver/NotificationService.java"
        #self.copy.removeFile(javaPath)
        self.copy.copyFile(fromBaseDir + "NotificationService.java",javaPath)

        javaPath = toBaseDir + "src/com/qq/xgdemo/receiver/DBOpenHelper.java"
        #self.copy.removeFile(javaPath)
        self.copy.copyFile(fromBaseDir + "DBOpenHelper.java",javaPath)

#------------------------- unit function -------------------------------

    def copyFile(self,fromPath,toPath):
        self.copyFile(fromPath,toPath)




#NotificationService



