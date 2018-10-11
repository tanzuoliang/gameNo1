# coding=utf-8
__author__ = 'tzl'

import os, shutil,json
from xml.dom.minidom import Document
from xml.dom.minidom import parse
import sys

reload(sys)
sys.setdefaultencoding('utf-8')
#os.system('cd frameworks/runtime-src/proj.android')


class publish:
    
    platform_name = ''
    _rootPath = ''
    
    def __init__(self,rootPath,platform_name):
        self.platform_name = platform_name
        self._rootPath = rootPath

    def start(self):
        androidJar = '../../../../android/adt-bundle-mac-x86_64-20140702/sdk/platforms/android-22/android.jar'

        rootPath = self._rootPath

        os.system('./aapt p -f -m -J ' + rootPath + 'gen -S ' + rootPath + 'res -I ' + androidJar + ' -M ' + rootPath + 'AndroidManifest.xml')
        
        apkStorePath = rootPath + 'bin_out/' + self.platform_name + '/hope.apk'
        if not os.path.exists(rootPath + 'bin_out'):
            os.mkdir(rootPath + 'bin_out')
        if not os.path.exists(rootPath + 'bin_out/' + self.platform_name):
            os.mkdir(rootPath + 'bin_out/' + self.platform_name)
    
        print '请稍后...................'
    
        command = './aapt p -f -S ' + rootPath + 'res -I ' + androidJar + ' -A ' + rootPath + 'assets -M ' + rootPath + 'AndroidManifest.xml -F ' + apkStorePath
        os.system(command)
        print 'pubish anroid application successful and store application into ',apkStorePath


def getFileData(path):
    f = open(path,'r')
    info = f.read()
    f.close()
    return info

jsonString =  getFileData("../python/platform.txt")
jsonDic = json.loads(jsonString)
nameMap = jsonDic['code']

#nameMap = {"1":"mi","2":"uc","3":"qihu","4":"baidu","5":"oppo"}

#maxPlatforCode =

#selectCode = 0
#selectCode = input('选择发布平台。当前发布模式是在不编译cpp的情况，只生成android应用包\n 1:小米 2:九游uc 3:奇虎360 4:百度')

#while selectCode > maxPlatforCode or selectCode == 0:
#   if selectCode > 0:
#       print '输入错误，请重新输入'
#   selectCode = input('选择发布平台。当前发布模式是在不编译cpp的情况，只生成android应用包\n ' + json['desc']+ '\n')

selectCode = input('选择发布平台。当前发布模式是在不编译cpp的情况，只生成android应用包\n ' + jsonDic['desc']+ '\n')
publish('../frameworks/runtime-src/proj.android/',nameMap[str(selectCode)]).start()


