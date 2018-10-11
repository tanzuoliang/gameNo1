# coding=utf-8
__author__ = 'tzl'

import os, shutil
from xml.dom.minidom import Document
from xml.dom.minidom import parse
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

class CreateXML:

    platfom_pxiel =  ''
    
    mainXmlDoc = ""

    baseXmlPath = ""
    storeXMLpath = ""
    
    rootpath = ""
    
    def __init__(self,_rootpath,platform):
        self.platfom_pxiel = platform
        self.storeXMLpath = "platform/" + platform + "/AndroidManifest.xml"
        self.baseXmlPath =  "platform/AndroidManifest.xml"
        self.rootpath = _rootpath

    #获取xml 根结点
    def getXmlDoc(self,path):
        path = self.rootpath + path
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
    

    def start(self):
        self.mainXmlDoc = self.getXmlDoc(self.baseXmlPath)
        packName = self.mainXmlDoc.getAttribute("package")
        print "current package =====> ",packName
        self.mainXmlDoc.setAttribute("package",packName + "." + self.platfom_pxiel)
        applocationLabel = self.mainXmlDoc.getElementsByTagName("application")[0].getAttribute("android:label")
        self.mainXmlDoc.getElementsByTagName("application")[0].setAttribute("android:label",applocationLabel + "_" + self.platfom_pxiel)
        tempNode = self.mainXmlDoc.getElementsByTagName("application")[0].getElementsByTagName("activity")[0]
        tempNode.setAttribute("android:label",tempNode.getAttribute("android:label") + "_" + self.platfom_pxiel)

        self.unionXML("platform/" + self.platfom_pxiel + "/ForManifest.xml")

        xgXmlDoc = self.getXmlDoc("platform/xgManifest.xml")
        xgPackageNameNode = xgXmlDoc.getElementsByTagName("applicationCfg")[0]
        xgPackageNameNode = xgPackageNameNode.getElementsByTagName("service")[1]
        xgPackageNameNode = xgPackageNameNode.getElementsByTagName("intent-filter")[0]
        xgPackageNameNode = xgPackageNameNode.getElementsByTagName("action")[0]

        xgPackageNameNode.setAttribute("android:name",packName + "." + self.platfom_pxiel + ".PUSH_ACTION")

        self.openFileByWrite("platform/xgManifest.xml",xgXmlDoc.toxml())

        self.unionXML("platform/xgManifest.xml")

        self.saveUnionXML(self.mainXmlDoc)


def startXml(path):
    xml = CreateXML(path)
    xml.start()


