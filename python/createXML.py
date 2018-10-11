# coding=utf-8
__author__ = 'tzl'

import os, shutil
from xml.dom.minidom import Document
from xml.dom.minidom import parse
import sys
from copyFile import Assets,Copy

reload(sys)
sys.setdefaultencoding('utf-8')

class CreateXML:

    platfom_pxiel =  ''
    
    mainXmlDoc = ""

    baseXmlPath = ""
    storeXMLpath = ""
    
    rootpath = ""
    
    platformCode = 0
    
    push_platform = ""
    
    log_platform = ""

    def setPushPlatform(self,pn):
        self.push_platform = pn
    
    def setLogPlatform(self,pn):
        self.log_platform = pn
    
    def __init__(self,_rootpath,platform,platformCode):
        self.platfom_pxiel = platform
        self.storeXMLpath = "platform/" + platform + "/AndroidManifest.xml"
        self.baseXmlPath =  "platform/AndroidManifest.xml"
        self.rootpath = _rootpath
        self.platformCode = platformCode

        print "check %s manifest.xml"%platform
        """  妈的有些平台的启动要用平台方的 所以这边要分析处理下 """
        platformBaseManiDir = self.rootpath + 'base/manifest/' + platform
        if os.path.exists(platformBaseManiDir):
            self.baseXmlPath = 'base/manifest/' + platform +  '/AndroidManifest.xml'

        """ 操 ，有些名字就是要特殊处理 """    
        # self.nameMap = {"mi":"android.mi","meizu":"mz","haima":"android.haima"}    
        self.nameMap = {"meizu":"mz","haima":"android.haima"}  

        print "base  %s "%platformBaseManiDir    

    def getPackTailName(self,name):
        if name in self.nameMap:
            return self.nameMap[name]

        return name        

    #获取xml 根结点
    def getXmlDoc(self,path):
        path = self.rootpath + path
        print "getXML Path ====>",path
        xmlDoc = parse(path)
        xmlDoc = xmlDoc.documentElement
        return xmlDoc

    def openFileByWrite(self,path,info):
        path = self.rootpath + path
        f = open(path,'w')
        f.write(info)
        f.close()
    
    def saveUnionXML(self,xml):
        result = xml.toxml()
        result = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" + result
        self.openFileByWrite(self.storeXMLpath,result)

    def hasPermissionInMainXMLNode(self,name):
        for node in self.mainXmlDoc.getElementsByTagName("uses-permission"):
            if node.getAttribute("android:name") == name:
                return 1
        return 0


    def unionXML(self,unionPath):




        unionDoc = self.getXmlDoc(unionPath)
        mainApplicationNode = self.mainXmlDoc.getElementsByTagName("application")[0]
        applicationCfgList = unionDoc.getElementsByTagName("applicationCfg")


        if len(applicationCfgList) > 0 :
            applicationCfg = applicationCfgList[0]
        
            for node in applicationCfg.getElementsByTagName("activity"):
                mainApplicationNode.appendChild(node)
        
            for node in applicationCfg.getElementsByTagName("meta-data"):
                mainApplicationNode.appendChild(node)
        
            for node in applicationCfg.getElementsByTagName("receiver"):
                    mainApplicationNode.appendChild(node)
        
            for node in applicationCfg.getElementsByTagName("service"):
                mainApplicationNode.appendChild(node)

        permissionCfgList = unionDoc.getElementsByTagName("permissionCfg")
        if len(permissionCfgList) > 0:
            permissionCfg = unionDoc.getElementsByTagName("permissionCfg")[0]
            for node in permissionCfg.getElementsByTagName("uses-permission"):
                if  self.hasPermissionInMainXMLNode(node.getAttribute("android:name")) == 0:
                    self.mainXmlDoc.appendChild(node)
        

        supportsscreens = unionDoc.getElementsByTagName("supports-screens")
        mainHas = self.mainXmlDoc.getElementsByTagName("supports-screens")
        if supportsscreens and not mainHas:
            self.mainXmlDoc.appendChild(supportsscreens)



    def updateOperationMode(self,xmlPath,showLabel):
        data = open(xmlPath,'rb').read()
        if showLabel == '1':
            data.replace('冒险大乱斗_.+?\"','冒险大乱斗\"')
        elif showLabel == '0':
            str = '冒险大乱斗' + Copy().getFileData('python.log').split('_')[0] + '\"'
            data.replace('冒险大乱斗.*?\"',str)


    def readVersion(self):
        filename = "python/version.txt"
        f = open(filename,"rw")
        version = f.read()
        f.close()
        i = int(version)
        i = str(i + 1)
        f = open(filename,"w")
        f.write(i)
        f.close()
        return version          
            
    def start(self,showLabel,all=True):
        self.mainXmlDoc = self.getXmlDoc(self.baseXmlPath)
        
        packName = self.mainXmlDoc.getAttribute("package")
        
        """  包名   这里到时候还是要修改一下的 """
        # if not self.platfom_pxiel == 'maple' and not self.platfom_pxiel == "null":
        if  not self.platfom_pxiel == "null":
            # if self.platfom_pxiel == "mi":
            #     packName = "com.maple.hope.android.mi"
            # elif self.platfom_pxiel == "meizu":
            #     packName = packName  + ".mz"
            # else:
            #     packName = packName  + "." + self.platfom_pxiel   
            unneedAddTail = ["anysdk","isdk"]
            # if not self.platfom_pxiel == "anysdk":
            if not self.platfom_pxiel in unneedAddTail:
                packName = packName + "." +  self.getPackTailName(self.platfom_pxiel)

            otherPackName = {"tencent":"com.tencent.tmgp.mxdld_v3","xunlei":"com.xwzg.xunlei.niux","tailand":"com.nutsplay.dreamerworld.thailand"}
            if self.platfom_pxiel in otherPackName:
                packName = otherPackName[self.platfom_pxiel]
            # if self.platfom_pxiel == "tencent":
            #     packName = "com.tencent.tmgp.hope"


            # if self.platformCode > 0:
            #     if self.platformCode == 5:#妈的oppo平台就是这样不同
            #         packName = packName  + ".nearme.gamecenter"
            #     else:
            #         packName = packName  + "." + self.platfom_pxiel
            self.mainXmlDoc.setAttribute("package",packName)
            versionCode = self.readVersion()
            self.mainXmlDoc.setAttribute("android:versionCode",versionCode)
        print "current package =====> ",packName
        
        # """  修改应用显示名  这个最后不要修改"""
        # if showLabel == '0' or not all:
        #     applocationLabel = self.mainXmlDoc.getElementsByTagName("application")[0].getAttribute("android:label")
        #     self.mainXmlDoc.getElementsByTagName("application")[0].setAttribute("android:label",applocationLabel + "_" + self.platfom_pxiel)
        #     tempNode = self.mainXmlDoc.getElementsByTagName("application")[0].getElementsByTagName("activity")[0]
        #     tempNode.setAttribute("android:label",tempNode.getAttribute("android:label") + "_" + self.platfom_pxiel)

        self.unionXML("platform/" + self.platfom_pxiel + "/ForManifest.xml")

#------------------------- push platform ------------------------------------------------------------

        if self.push_platform.strip():
            pushXMLPath = "push/" + self.push_platform + "/manifest.xml"
            pushXmlDoc = self.getXmlDoc(pushXMLPath)
            pushPackageNameNode = pushXmlDoc.getElementsByTagName("applicationCfg")[0]
            
            if len(pushPackageNameNode.getElementsByTagName("service")) > 0:
                pushPackageNameNode = pushPackageNameNode.getElementsByTagName("service")[1]
                pushPackageNameNode = pushPackageNameNode.getElementsByTagName("intent-filter")[0]
                pushPackageNameNode = pushPackageNameNode.getElementsByTagName("action")[0]
                pushPackageNameNode.setAttribute("android:name",packName +  ".PUSH_ACTION")
                self.openFileByWrite(pushXMLPath,pushXmlDoc.toxml())
            self.unionXML(pushXMLPath)
#-------------------------- end push platform ---------------------------------------------------------


#-------------------------- start Log platform --------------------------------------------------------
        #if self.log_platform.strip():
            
    

#-------------------------- end log platform ----------------------------------------------------------

        self.saveUnionXML(self.mainXmlDoc)
        print "应用配置生成成功。。。。。。。"


def startXml(path):
    xml = CreateXML(path)
    xml.start()


