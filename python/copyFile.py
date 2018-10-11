# coding=utf-8
__author__ = 'tzl'

import os, shutil,json

class Copy:

    def copyFile(self,fromFile, toFile):
        toDir = os.path.dirname(toFile)
        if fromFile.find("DS_Store") > 0:
            return
        if not os.path.exists(toDir) and toDir.strip():
            os.makedirs(toDir)

        if os.path.exists(fromFile):
            shutil.copy(fromFile,toFile)
            print fromFile, "  ======>  ", toFile
        else:
            print "can't find file ",fromFile
        # print fromFile, "  ======>  ", toFile


    def copyFileCheckFrom(self,f1,f2,t):
        if os.path.exists(f1):
            self.copyFile(f1,t)
        elif os.path.exists(f2):
            self.copyFile(f2,t)
        else:
            print "can't find from file ,so fail"            
        
    def containsDir(self,list,dir):
        for item in list:
            if item in dir:
                return True

        return False            
    """

    filterExt :   过滤后缀名列表
    filterDir :   过滤文件夹列表
    filterFiles : 过滤文件名列表

    """    
    def copyFiles(self,fromPath,toPath,filterExt=[],filterDir=[],filterFiles = [],checkTime=False):
        
        filterExt.append('.svn-base')
        filterExt.append('.DS_Store')

        if not os.path.exists(fromPath):
            print "copy files from ",fromPath,"  to ",toPath + "  fail"
            return
        
        for item in os.walk(fromPath):
            if not item[2]:
                continue

            print item[0],"   filterDir = ",filterDir

            # if item[0] in filterDir:
            if self.containsDir(filterDir,item[0]):
                print "过滤文件夹%s"%item[0]
                continue    

            for file in item[2]:
                if file in filterFiles:
                    print "过滤文件%s"%file
                    continue

                if os.path.splitext(file)[-1] in filterExt:
                    print "过滤文件 通过后缀%s"%file
                    continue      

                fromFile = os.path.join(item[0],file)
                toFile = fromFile.replace(fromPath,toPath,1)

                """
                先检测一下是否是第一次复制 
                不是第一次如果有更新
                """
                newCopy = not os.path.exists(toFile)

                if not checkTime or  newCopy or (os.path.getmtime(toFile) < os.path.getmtime(fromFile)):
                    self.copyFile(fromFile,toFile)
                else:
                    print "当前文件%s不需要复制"%fromFile    
                    # if not os.path.exists(toFile):
                    #self.copyFile(fromFile,toFile)
                    #continue


    def removeFileByFilter(self,fromPath,filterList):
        if not os.path.exists(fromPath):
            return
        for file  in os.listdir(fromPath):
            targetFile = os.path.join(fromPath,file)
            fileName = targetFile.split("/")[-1]
            if os.path.isfile(targetFile) and not fileName in filterList:
                os.remove(targetFile)

    def removeFile(self,filePath):
        if os.path.exists(filePath):
            print "---------------------  remove file %s"%filePath
            os.remove(filePath)

    def copyDir(self,fromDir,toDir,showProgress=False):
        
        if os.path.exists(fromDir):
            self.removeDir(toDir)
            if showProgress:
                self.copyFiles(fromDir,toDir)
            else:
                shutil.copytree(fromDir,toDir)    
            print "copy dir ",fromDir ," ================> ", toDir

    def removeDir(self,fromDir):
        if os.path.exists(fromDir):
            shutil.rmtree(fromDir)

    def getFileData(self,path,default=''):
        info = default
        if os.path.exists(path):
            f = open(path,'r')
            info = f.read()
            f.close()
        else:
            f = open(path,'wb')
            f.write(info)
            f.close()    
        return info

    def createDir(self,dir):
        if not os.path.exists(dir):
            os.makedirs(dir)


    def saveDataToFile(self,path,info):
        if not os.path.exists(path):
            dir = os.path.dirname(path)
            if not os.path.exists(dir) and dir.strip():
                os.makedirs(dir)

        f = open(path,'w')
        f.write(info)
        f.close()


    """
        path: JSON文件名
        key:  要替换的字段
        value 要替换的内容
    """    
    def changeJsonValue(self,path,key,value):
        jsonDic = json.loads(self.getFileData(path))
        print "will change json file is %s and key is %s and replace the value %s to %s"%(path,key,jsonDic[key],value)
        jsonDic[key] = value
        self.saveDataToFile(path,json.dumps(jsonDic,indent=2,ensure_ascii=False))   

class Assets:

    def removeAssetsByFilter(self,dir,list):
        for file in os.listdir(dir):
            targetFile = os.path.join(dir,file)
            fileName = targetFile.split("/")[-1]
            if os.path.isfile(targetFile):
                if not fileName in list:
                    os.remove(targetFile)
            elif os.path.isdir(targetFile):
                if not fileName in list:
                    shutil.rmtree(targetFile)

