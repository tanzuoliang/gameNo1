# coding=utf-8
__author__ = 'tzl'

import os, shutil
from xml.dom.minidom import Document
from xml.dom.minidom import parse
import sys,re
from python.createXML import CreateXML
from python.plugin import Plugin
from python.copyFile import Assets,Copy
from python.createAndroidMk import CreateAndroidMk
import json
from python.tools import Tools

import Tkinter
import tkMessageBox
toBaseDir = "frameworks/runtime-src/proj.android/"

fromBaseDir_pxiel = "frameworks/runtime-src/proj.android/platform/%s/"

fromBaseDir = ""

"""   推送名字  """
pushPlatformCode = 0
pushPlatform = "null"
"""   平台名字  """
platform = ""
platformCode = 0
"""   功能操作模式  """
operationCode = 2


compentWidth=30

btnDict = {}

selectList = []

copy = Copy()
top = Tkinter.Tk()
top.wm_title('希望之光android平台')


# def getNum(num,max,default):
#     if num > max:
#         return default
#     return num

logPath = 'python/log.txt'

jsonString =  copy.getFileData("python/platform.txt")
jsonDic = json.loads(jsonString)
nameMap = jsonDic['code']

showLabel = '0'
btnStatus = None
btnStatuslist = {"0":"测试模式（ 名字）","1":"正式模式（名字）"}



def getNameCodeByName(name):
    for (code , _name) in nameMap.items():
        if _name == name:
            return code

    return -1;        

def alert(info):
    # tkMessageBox.showinfo("通知",info)
    saySome(info)

def initParmas():
    global pushPlatformCode,pushPlatform,platform,platformCode,operationCode,fromBaseDir
    pushPlatformCode = '1'
    pushPlatform = "null"
    """   平台名字  """
    platform = "maple"
    platformCode = '6'
    """   功能操作模式  """
    operationCode = 2

    # fromBaseDir = "frameworks/runtime-src/proj.android/platform/" + platform + "/"
    fromBaseDir = fromBaseDir_pxiel%platform


def selectOperationCode(code):
    def callback():
        global operationCode
        operationCode = int(code)
        print "operationCode = ",operationCode
    
    return callback

def showOperationBtn():
    # label = Tkinter.label(top,text="------------------选择操作模式－－－－－－－－－－－－－－－－")
    list = {"1":"发布应用（下面会有选择游戏平台和推送平台）","2":"开发者调试","3":"母包"}

    count = 1;
    label = Tkinter.Label(top,text="--------- ---------").grid(row=0,column=0)
    for name in list:
        btn = Tkinter.Button(top,text=list[name],command= selectOperationCode(name),width=compentWidth)
        btn.grid(row=count,column=0)
        count = count + 1;

# platformInputDesc = '请输入操作模式  1:发布应用（下面会有选择游戏平台和推送平台） \n\t\t2:开发者调试（当前模式不编译cpp，只负责把相关平台和推送包放入 android 项目中，需要用eclipse 打开项目，记住一定要清理一下项目，一次不行多清理几次就行了）\n\t\t3:母包(故名思义 就是没有任何平台包的游戏包了，当前模式一条命令就可以完成操作)\n'

# operationCode = input(platformInputDesc)

# if operationCode == 0:
#     copy.saveDataToFile(logPath,'')
#     operationCode = input(platformInputDesc)

# operationCode = getNum(operationCode,3,3)

#nameMap = {"0":"null","1":"mi","2":"uc","3":"qihu","4":"baidu","5":"oppo"}

# if operationCode == 3:
#     platformCode = 0
# else:
#     platformCode = input(jsonDic['desc'])
#platformCode = getNum(platformCode,5,0)


def checkButton(name):
    if not name in selectList:
        selectList.append(name)
        btnDict[name]["text"] = name + "      :      TURE"
    else:
        selectList.remove(name)
        btnDict[name]["text"] = name + "      :      FALSE"    


selectTip = " －－－－－当前选择平台是：%s －－－－－－"

var = Tkinter.StringVar()
var.set(selectTip%copy.getFileData(logPath).split('_')[0])
selectPlatformTipLabel = Tkinter.Label(top,textvariable=var,width=30).grid(row=0,column=1)

def createPlatformData(code):
    global fromBaseDir,platform,platformCode,nameMap
    platform = nameMap[code]
    platformCode = code
    # fromBaseDir = "frameworks/runtime-src/proj.android/platform/" + platform + "/"
    fromBaseDir = fromBaseDir_pxiel%platform

def selectPlatformName(code):
    def callback():
        createPlatformData(code)
        global platform,selectTip
        var.set(selectTip%platform)
        # global fromBaseDir,platform,platformCode,nameMap
        # platform = nameMap[code]
        # platformCode = code
        # fromBaseDir = "frameworks/runtime-src/proj.android/platform/" + platform + "/"
        print "platform = ",platform
        checkButton(platform)
    return callback

def showPlatformBtn():
    count = 1;
    for name in nameMap:
        btn = Tkinter.Button(top,text=nameMap[name],command=selectPlatformName(name),width=compentWidth)
        btn.grid(row=count,column=1)
        btnDict[nameMap[name]] = btn
        count = count + 1;


def selectPushName(code):
    def callback():
        global pushPlatform,pushPlatformCode
        pushPlatformCode = code
        pushPlatform = pushNameMap[code]
        print "pushPlatform =  ",pushPlatform

    return callback
    

pushNameMap = jsonDic['pushCode']

def showPushBtn():
    count = 3;
    label2 = Tkinter.Label(top,text="--------- 选择推送---------",width=compentWidth).grid(row=count ,column=2)
    count = count + 1;
    for name in pushNameMap:
        btn = Tkinter.Button(top,text=pushNameMap[name],command=selectPushName(name),width=compentWidth)
        btn.grid(row=count,column=2)
        count = count + 1;



# if operationCode == 3:
#     pushPlatformCode = 0
# else:
#     pushPlatformCode = input(jsonDic['pushDesc'])
# #pushPlatformCode = getNum(pushPlatformCode,2,0)

# pushPlatform = pushNameMap[str(pushPlatformCode)]



    
plugin = None
def createAndRoidApplication(all = True):
    createXml = CreateXML(toBaseDir,platform,platformCode)
    createXml.setPushPlatform(pushPlatform)
    global showLabel
    createXml.start(showLabel,all=all)

    # createMK = CreateAndroidMk(toBaseDir,platform,platformCode)
    # createMK.setPushPlatform(pushPlatform)
    # createMK.start()
    # if operationCode == 2:
    #     createMK.copySoFilesToAndroid()
    # else:
    #     createMK.copySoFilesToCocos()


    if operationCode == 2:
        """ 这些都是所有平台共用的资源 """
        fList = ["res","src","script","main.js","main.jsc","game_version.json","project.json"]
        Assets().removeAssetsByFilter(toBaseDir + "assets",fList)


    Assets().removeAssetsByFilter(toBaseDir + "res",[])

    global plugin
    plugin = Plugin("")

    print "fromBaseDir = ",fromBaseDir ," toBaseDir = ",toBaseDir
    plugin.registerGamePlatform(fromBaseDir,toBaseDir,platformCode,operationCode,platformname=platform)

    pushDir = pushPlatform
    if platform == "tailand":
        pushDir = "null"
        pushPlatformCode = '0'

    plugin.registerPushPlatform("frameworks/runtime-src/proj.android/push/" + pushDir + "/",toBaseDir,pushPlatformCode,p=platform)


    androidsupportjarlist = []
    androidsupportname = "android-support-v%d.jar"
    maxsupport = 0
    for file in os.listdir(toBaseDir + "libs"):
        if 'android-support-v' in file:
            try:
                curport = int(os.path.splitext(file)[0].split("-")[-1][1:])
                androidsupportjarlist.append(file) 
                # print "file = ",file 
                # print "curport = ",curport
                if curport > maxsupport:
                    maxsupport = curport
            except Exception as e:
                print e        

              

    for jar in androidsupportjarlist:
        applysupportjar = androidsupportname%maxsupport
        # print "jar = ",jar
        if not jar == applysupportjar:
            # print "remove jar ",jar
            copy.removeFile(toBaseDir + "libs/" + jar)   



# def  clearSelectFlag():
#     print "execute clearSelectFlag"
#     operationCode = 0
#     platform = 0
#     pushPlatform = 'null'
#     pushPlatformCode = 0

def checkParma():

    if operationCode == 0:
        tkMessageBox.showinfo("通知",'请选择操作模式')
        return 0

    if platform == "":
        tkMessageBox.showinfo("通知",'请选择平台')
        return 0

    return 1    


def copyPlatformSrc():
    p = copy.getFileData(logPath).split('_')[0]
    _from = toBaseDir + "platform/" + p + "/src"
    _to = toBaseDir + "src"
    print("from = %s to = %s"%(_from,_to))
    copy.copyFiles(_from,_to)
    saySome("代码拷贝完成")

def start(all = False):

    curerntOperationCode = platform + "_" + pushPlatform
    lastOperationCode = copy.getFileData(logPath)

    oc = copy.getFileData('python/op.txt',"")
    if oc == "android" and all == False and not curerntOperationCode == lastOperationCode:
        Plugin("").backToPlatform()

    copy.saveDataToFile('python/op.txt',"android")    
    

    print "curerntOperationCode = ",curerntOperationCode , "  lastOperationCode = ",lastOperationCode ,"   operationCode = ",operationCode ,"  platform = ",platform, "  showLabel = ",showLabel
    print "fromBaseDir = ",fromBaseDir

    if checkParma() == 0:
        return
    # if cmp(lastOperationCode,curerntOperationCode) == 0:
    #     print "平台操作没变 不需要重新copy资源"
    # else:
    #     createAndRoidApplication()

    createAndRoidApplication(all=all)
    # if operationCode == 3 or operationCode == 1:
    #     os.system('cocos compile -p android -m release')
    #     if operationCode == 1:
    #         binPath = "frameworks/runtime-src/proj.android/out/" + platform
    #         apkFile = "frameworks/runtime-src/proj.android/bin"
    #         if not os.path.exists("frameworks/runtime-src/proj.android/out"):
    #             os.mkdir("frameworks/runtime-src/proj.android/out")
    #         if not os.path.exists(binPath):
    #             os.mkdir(binPath)
    #         copy.copyFiles(apkFile,binPath)
    #         shutil.rmtree(apkFile)

    var_g.set(getJsonValue(toBaseDir + 'assets/platform.json',"game_loginUrl")) 
    copy.saveDataToFile(logPath,curerntOperationCode)
    if not all:
        alert("项目生成完成")
        Tools.checkPlatformJson(toBaseDir + 'assets/platform.json')
        print "------------ 操作结束 －－－－－－－－－－－－－－－－－－－－－"


    initParmas()



def copyGameSrc(show=True):
    """ src """
    copy.removeDir(toBaseDir + "assets/src")
    # copy.copyDir("src",toBaseDir + "assets/src") 
    copy.copyFiles("src",toBaseDir + "assets/src") 
    if show:
        saySome("游戏js拷贝完成")

def copyGameScript(show=True):
    """ script """
    copy.removeDir(toBaseDir + "assets/script")
    # copy.copyDir("frameworks/js-bindings/bindings/script",toBaseDir + "assets/script") 
    copy.copyFiles("frameworks/cocos2d-x/cocos/scripting/js-bindings/script",toBaseDir + "assets/script") 
    if show:
        alert("游戏库js拷贝完成") 

def copyProjectsJSToOut():
    copy.removeDir("src")
    copy.copyDir(toBaseDir + "assets/src","src") 


def copyAllGameRes():
    copy.removeDir(toBaseDir + "assets/res")
    copy.copyFiles("res",toBaseDir + "assets/res",filterDir=["res/music"]) 
    Tools.checkIOSMusicDir()
    copy.copyDir('music/android',toBaseDir +  'assets/res/music/android')
    saySome("所有游戏资源拷贝完成")

""" 游戏资源 res"""
def copyGameRes(show=True):
    
    """
    这里要修改一下
    要把ios平台用的音效去掉
    """
    copy.removeDir(toBaseDir + "assets/res")
    """ remove IJMassets """

    copy.removeFile(toBaseDir + "base/assets/2.apk")
    copy.removeFile(toBaseDir + "base/assets/cci.bin")
    copy.removeFile(toBaseDir + "base/lib/armeabi/libccgamec.so")

    copy.copyFiles("base/res",toBaseDir + "assets/res",filterDir=["res/music"]) 
    Tools.checkIOSMusicDir()
    # copy.copyDir('music/android',toBaseDir +  'assets/res/music/android')

    if show:
        saySome("游戏资源拷贝完成")
    
def copyGameAssetsSingalJS(show=True):
    copy.copyFile('game_version.json',toBaseDir + 'assets/game_version.json')
    copy.copyFile('main.js',toBaseDir + 'assets/main.js')
    copy.copyFile('project.json',toBaseDir + 'assets/project.json')
    if show:
        saySome("successful")

"""  将游戏中的资源拷贝到 Android 项目中 """
def copyGameAssets():

    copyGameSrc(show=False)
    copyGameScript(show=False)
    copyGameRes(show=False)
    copyGameAssetsSingalJS(show=False)
    alert("资源复制完成")

    # copy.copyFile('game_version.json',toBaseDir + 'assets/game_version.json')
    # copy.copyFile('main.js',toBaseDir + 'assets/main.js')
    # copy.copyFile('project.json',toBaseDir + 'assets/project.json')
    # """ platform.json """
    # copy.copyFile("platform.json",toBaseDir + "assets")



"""  将修改的平台相关 保存到平中去 """
def backToPlatform():
    Plugin("").backToPlatform()


"""  修改当前的应用名显示规则  """
def updateShowLabelStatus():
    global btnStatus,showLabel,btnStatuslist

    if showLabel == '0':
        showLabel = '1'
    else:
        showLabel = '0'

    btnStatus['text'] = btnStatuslist[showLabel]

    copy.saveDataToFile('python/androidMode.txt',showLabel)
    xmlPath = 'frameworks/runtime-src/proj.android/AndroidManifest.xml'
    f = open(xmlPath,'rb')
    data = f.read()
    f.close()
    if showLabel == '1':
        replace_re = re.compile('希望之光.*?\"')
        data = replace_re.sub('希望之光\"',data)
        # data = data.replace('希望之光_.+?\"','希望之光\"')
    elif showLabel == '0':
        str = '希望之光_' + Copy().getFileData('python/log.txt').split('_')[0] + '\"'
        replace_re = re.compile('希望之光.*?\"')
        data = replace_re.sub(str,data)

        # data = data.replace('希望之光.*?$',str)

    f = open(xmlPath,'wb')    
    f.write(data)
    f.close()


def addBtn(title,fun,r,c,h=1):
    btn = Tkinter.Button(top,text=title,command=fun,width=compentWidth,height=h)
    btn.grid(row=r,column=c)
    return btn

def addLable(title,r,c):
    label = Tkinter.Label(top,text=title,width=compentWidth).grid(row=r,column=c) 
    return label   

"""
编译so文件
"""
def buildNativeSo():
    cmd = 'python %sbuild_native.py -b release -n NDK_LIBS_OUT=%s'%(os.getcwd()+"/" + toBaseDir,'../../../libso')
    print "cmd=%s"%cmd
    os.system(cmd)
    zipSo()
    assignSoToProjects()
    alert("编译so文件成功")


createSofilePath = 'libso/armeabi/libcocos2djs.so'
    
def assignSoToProjects():
    filePath = 'frameworks/runtime-src/proj.android/libs/armeabi/libcocos2djs.so'
    baseSoPath = 'frameworks/runtime-src/proj.android/base/libs/armeabi/libcocos2djs.so'
    copy.copyFile(createSofilePath,filePath)
    copy.copyFile(createSofilePath,baseSoPath)

def zipSo():

    zipName = 'armeabi.zip'
    copy.removeFile(zipName)

    # filePath = 'frameworks/runtime-src/proj.android/libs/armeabi/libcocos2djs.so'
    # filePath = 'libso/armeabi/libcocos2djs.so'
    copy.createDir('armeabi')
    copy.copyFile(createSofilePath,'armeabi/libcocos2djs.so')
    os.system('zip -r %s armeabi'%zipName)
    copy.removeDir('armeabi')

    path = 'frameworks/runtime-src/proj.android/obj/local/armeabi/'
    curPath = os.getcwd()
    os.chdir(path)

    soName = "libcocos2djs"
    copy.removeFile(soName + '.zip')
    command =  'zip %s.so.zip %s.so'%(soName,soName)
    print "execute so command is %s"%command
    os.system(command)
    os.chdir(curPath)

""" 将本地的android平台音效拷贝到项目中 """
def addMusicToProject():
    copy.removeDir(toBaseDir +  'assets/res/music')
    copy.copyDir('music/android',toBaseDir +  'assets/res/music/android')

"""  从svn中档下来的资源 存到本地 """
def saveMusicToLocal():
    copy.removeDir('music')
    copy.copyDir('res/music','music')   
    copy.removeDir('res/music/android') 


game_loginUrl = ''
game_loginUrl_label = None

game_loginUrl_local = 'http://192.168.1.240:8006/gateway.php'
game_loginUrl_test = 'http://test.mx.maple-game.com/gateway.php'
game_loginUrl_online = 'http://and.mx.maple-game.com/gateway.php'
"""官方包的线上地址"""
game_loginUrl_online_maple = 'http://and.mx.maple-game.com/gateway.php'

game_loginUrl_DEV = 'http://dev.mx.maple-game.com/gateway.php'

game_loginUrl_OFFICEAL = 'http://and.mx.maple-game.com/gateway.php'

game_loginUrl_TENCENT= 'http://tencent.mx.maple-game.com/gateway.php'

var_g = Tkinter.StringVar()



def applyGameUrl(code):
    global game_loginUrl
    if code == 1:
        game_loginUrl = game_loginUrl_local
    elif code == 2:
        game_loginUrl = game_loginUrl_test
    elif code == 3:
        game_loginUrl = game_loginUrl_online  
    elif code == 4:
        game_loginUrl = game_loginUrl_DEV
    elif code == 5:
        game_loginUrl = game_loginUrl_OFFICEAL
    elif code == 6:
        game_loginUrl = game_loginUrl_TENCENT               


    print "update game_loginUrl %s"%game_loginUrl    
    var_g.set(game_loginUrl)
    changeJsonValue(toBaseDir + 'assets/platform.json',"game_loginUrl",game_loginUrl,p=copy.getFileData(logPath).split('_')[0])     

def applyLocalUrl():
    applyGameUrl(1) 
""" 商务测试服 """
def applyTestUrl():
    applyGameUrl(2) 
""" android 渠道正式服 """
def appyOnlineUrl():
    applyGameUrl(3)

"""  开发测试服 """
def appDevUrl():
    # if platform == "null":
    applyGameUrl(4)

""" 官方包地址 """
def appOfficalUrl():
    if platform == "maple":
        applyGameUrl(5) 


""" 应用宝独服"""
def appTencentURl():
    if platform == "tencent":
        applyGameUrl(6)           

def changeJsonValue(path,key,value,all=False,p='maple'):
    """因为官方包有些不一样 所以要特殊处理一下"""
    if key == 'game_loginUrl':
        if 'and' in value:
            if p == 'maple':
                value = game_loginUrl_online_maple
            else:
                value = game_loginUrl_online

    print 'p = %s  change json value key = %s,  value = %s'%(p,key,value)               
    jsonDic = json.loads(copy.getFileData(path))
    jsonDic[key] = value
    copy.saveDataToFile(path,json.dumps(jsonDic,indent=2,ensure_ascii=False))   
    # if not all:
    #     alert("apply %s = %s"%(key,value)) 

def getJsonValue(path,key):
    if not os.path.exists(path):
        return "null"
    d = copy.getFileData(path)
    try:
        jsonDic = json.loads(d)
        return jsonDic[key] 
    except Exception as e:
        print d
       
    return "can't find it"   

def openApks():
    os.system('open apks/sign')


def say(info):
    os.system('osascript -e %s'%(info))


def rename(resPath,newPath):
    if os.path.exists(resPath) and os.path.exists(newPath):
        os.rename(resPath,'../res_temp')
        os.rename(newPath,resPath)
        os.rename('../res_temp',newPath)
        print 'renmae successful'
    else:
        print 'renmae fail beacuse no find path'

def __decodeJS__(DIR):
    command = 'cocos jscompile -s' + DIR + ' -d ' + DIR + '_new'
    os.system(command)
    rename(DIR,DIR + '_new')
    copy.removeDir(DIR + '_new')


def checkJSoRjsc():

    path = toBaseDir + 'assets/src/app.jsc'
    if not os.path.exists(path):
        __decodeJS__(toBaseDir + 'assets/src')

    path1 = toBaseDir + 'assets/script/jsb.jsc'
    if not os.path.exists(path1):
        __decodeJS__(toBaseDir + 'assets/script')    



def saySome(some):
    os.system('say %s'%some)

""" 检查main.js 文件 """
def checkMainJS(name):
    copy.copyFileCheckFrom(toBaseDir + 'platform/' + name + '/js/main.js',toBaseDir + 'base/js/main.js',toBaseDir + 'assets/main.js')

from aapt.packAndroid import APKBuilder
def createOfficalApk():
    copyGameSrc()
    copyAllGameRes()
    APKBuilder().build("offical","1")
    say('\'say "Dum dum dum dum dum dum dum he he he ho ho ho fa lah lah lah lah lah lah fa lah full hoo hoo hoo" using "Cellos"\'')

def createApk():
    if len(selectList) == 0:
        alert("耍我了，什么平台都不选")
        return
    versionCode = "vc_%s"%open("python/version.txt","r").read()
    checkJSoRjsc()
    Plugin("").backToPlatform()
    for name in selectList:
        checkMainJS(name)
        createPlatformData(getNameCodeByName(name))
        start(True)    
        APKBuilder().build(name,versionCode)
    openApks()    
    # os.system('./python/alert.sh "所选平台发布成功，请查收"')
    # say("预备，开始唱")
    say('\'say "Dum dum dum dum dum dum dum he he he ho ho ho fa lah lah lah lah lah lah fa lah full hoo hoo hoo" using "Cellos"\'')
    # alert("所选平台发布成功，请查收")    

    """
        看下有没有打官方包
    """
    if "maple" in selectList:
        copyMaplePackage()
"""
 复制官方包到处理文件夹
"""
def copyMaplePackage():
    fromPath = "apks/sign/mx_maple.apk"
    if os.path.exists(fromPath):
        copy.copyFile(fromPath,"cps/assets/mx_maple.apk")
    else:
        print alert("找不到文件 %s"%fromPath)    

# resourceText = None

def updateGameCodeVersion():
    global resourceText
    value = resourceText.get('1.0','1.10')
    print("value is %s"%value)

    for (key,name) in nameMap.items():
        path = fromBaseDir_pxiel%name + 'platform.json'
        print path ,'  ',value
        changeJsonValue(path,"game_code_version",value,all=True,p=name)
        changeJsonValue(path,"platform_version",value,all=True,p=name)

    changeJsonValue(toBaseDir + 'assets/platform.json',"game_code_version",value,all=True,p=copy.getFileData(logPath).split('_')[0])   
    changeJsonValue(toBaseDir + 'assets/platform.json',"platform_version",value,all=True,p=copy.getFileData(logPath).split('_')[0])
    changeJsonValue(toBaseDir + 'assets/game_version.json',"version",value + '.0',all=True)
    changeJsonValue('game_version.json',"version",value + '.0',all=True)   
     

def updateGameLoginUrl():
    for (key,name) in nameMap.items():
        path = fromBaseDir_pxiel%name + 'platform.json'
        print path ,'  ',game_loginUrl
        changeJsonValue(path,"game_loginUrl",game_loginUrl,all=True,p=name)

    changeJsonValue(toBaseDir + 'assets/platform.json',"game_loginUrl",game_loginUrl,all=True,p=copy.getFileData(logPath).split('_')[0])    


def openAndroidDir():
    root = os.getcwd()
    print 'openAndroidDir command :open %s'%(root + '/' + toBaseDir + 'platform')
    os.system('open %s'%(root + '/' + toBaseDir + 'platform'))

def openAndroidSDK():
    os.system('open /Users/osx/Documents/sdk/安卓渠道SDK')    

def openProject():
    root = os.getcwd()
    os.system('open %s'%(root))

def showResBtn():
    count = 6;
    addLable("--------- 资源处理 ---------",count,2)
    count = count + 1
    addBtn('compile JS To JSC',Tools.compileJSToJSC,count,2)
    count = count + 1
    addBtn('JSC To JS',Tools.JSCToJS,count,2)
    count = count + 1
    addBtn('uncompress Res',Tools.uncompressRes,count,2)
    count = count + 1
    addBtn('compress Res',Tools.compressRes,count,2)
    count = count + 1
    addBtn('openTerminal',Tools.openTerminal,count,2)



def recodeAssetsType(type):
    f = open('python/assets.txt','wb')
    f.write(type)
    f.close()

def readAssetsType():
    f = open('python/assets.txt','rb')
    ret = f.read()
    f.close()
    return ret    

def useIJMAssets():
    ret = readAssetsType()
    # if ret == "ijm":
    #     saySome("当前已经是ijm资源了")
    #     return
    ijmRoot = toBaseDir + "ijm_assets/"
    copy = Copy()

    projectAssetsRoot = toBaseDir + "assets/"
    """ copy so  """
    copy.copyFile(ijmRoot + "lib/armeabi/libccgamec.so",toBaseDir + "libs/armeabi/libccgamec.so")
    copy.copyFile(ijmRoot + "lib/armeabi/libccgamec.so",toBaseDir + "base/libs/armeabi/libccgamec.so")

    """ copy assets """
    item = 0
    ijmAssets = ijmRoot + "assets/"
    for o in os.walk(ijmAssets):
        item = o
        break

    print item[1]   

    for file in item[2]:
    	copy.copyFile(ijmAssets + file,projectAssetsRoot + file)
    	copy.copyFile(ijmAssets + file,toBaseDir + "base/assets/" + file)

    for d in item[1]:
        print "使用爱加密处理过的文件夹  %s"%d
        copy.removeDir(projectAssetsRoot + d)
        copy.copyDir(ijmAssets + d,projectAssetsRoot + d,showProgress=True)

    print "已经使用了爱加密处理过的资源了"    
    alert("已经使用了爱加密处理过的资源了")
    recodeAssetsType("ijm")

def removeAssetsFoIJM():
    ijmfiles = ['main.js','platform.json']
    assetsRoot = toBaseDir + 'assets/'
    copy = Copy()
    if not os.path.exists(assetsRoot):
        print "找不到文件夹%s"%assetsRoot

    for item in os.walk(assetsRoot):
        if not item[2]:
            continue

        for file in item[2]:
            if os.path.splitext(file)[-1] == ".DS_Store":
                print "svn file"
                continue
            
            fileRoot = os.path.join(item[0],file)
            relativePath = fileRoot.replace(assetsRoot,'')
            if relativePath in ijmfiles:
                print "get file %s"%relativePath
                toPath = fileRoot.replace('/assets/','/assets_backup/')
                copy.copyFile(fileRoot,toPath)
                copy.removeFile(fileRoot) 


    print "操作结束"            


def signAPK(apkname,signname):       
    keyfile = 'apks/apksign.keystore'
    # apkname = 'apks/%s.apk'%apk
    # signname = 'apks/sign/%s.apk'%apk
    command = 'jarsigner -verbose -keystore %s -storepass maple1988 -digestalg SHA1 -sigalg MD5withRSA -signedjar %s %s yan'%(keyfile,signname,apkname)
    os.system(command)


"""
这是一个因定方法 只是给官方包做渠道分区处理
"""
def updateApkPlatformJson():
    apkName = "assets/hope_maple.apk"
    os.system('python aapt/changeAPK.py -a %s -d assets/platform.json -s assets/platform.json'%(apkName))

def packJD_GF_PACK():
    list = json.loads(copy.getFileData('assets/list.json'))['list']

    path = "assets/platform.json"
    apkName = "assets/mx_maple.apk"
    ret = ""
    for l in list:
        if os.path.exists(path):
            ret = ret + l + " : ";
            copy.changeJsonValue(path,'platform_name','maple_' + l)
            os.system('python aapt/changeAPK.py -a %s -d assets/platform.json -s assets/platform.json'%(apkName))
            toApk = 'assets/gf/mx_.apk'
            os.system('cp %s %s'%(apkName,toApk))
            signAPK(toApk,"assets/gf/mx_maple_%s.apk"%(l))
            os.system('rm %s'%toApk)


    alert("官方包分渠道完成:"+ret)
    os.system('open %s/%s'%(os.getcwd(),'assets/gf'))        


"""
 泰国版本资源
"""
def tailandAssets():
     ret = readAssetsType()
     # if ret == "tailand":
     #    saySome("当前已经是泰国资源")
     #    return
        
     oldAssets = toBaseDir + "assets"
     copy.removeDir(oldAssets + "/res")
     copy.removeDir(oldAssets + "/src")

     fromAssets = "../thailandHope"
     copy.copyDir(fromAssets + "/res",oldAssets + "/res",True)
     copy.copyDir(fromAssets + "/src",oldAssets + "/src",True)

     if not os.path.exists(oldAssets + "/src/files.jsc"):
        __decodeJS__(oldAssets + "/src")

     alert("泰国资源处理成功")
     recodeAssetsType('tailand')

def tailandJSC():
     oldAssets = toBaseDir + "assets"
     copy.removeDir(oldAssets + "/src")
     fromAssets = "../thailandHope"
     copy.copyDir(fromAssets + "/src",oldAssets + "/src",True)

     if not os.path.exists(oldAssets + "/src/files.jsc"):
        __decodeJS__(oldAssets + "/src")


def compressTailandRes():
    os.system('python ../thailandHope/res.py -m compress -t res')


def uncompressTailandRes():
    os.system('python ../thailandHope/res.py -m uncompress -t res')



def createProjects():
    global projectsText
    value = projectsText.get('1.0','1.90')
    print('create projects %s'%value)
    os.system('python python/platformjson.py %s'%value)
    saySome("项目创建成功")    
    projectsText.delete('1.0','10.0')
    projectsText.insert('1.0','default')

def createCPS():
    global cpsText
    value = cpsText.get('1.0','1.90')
    print('create cps %s'%value)
    os.system('php cps/cps.php %s'%value)
    saySome('cps包创建成功')
    cpsText.delete('1.0','1.90')
    cpsText.insert('1.0','default')    

def packTailand():
    os.system("python pack.py")
    saySome("分包完成")    

if __name__ == '__main__':
    
    initParmas()
    # showOperationBtn()
    showPlatformBtn()
    addBtn('openAndroidPlatformDir',openAndroidDir,0,2)
    addBtn('openAndroidSDK',openAndroidSDK,1,2)
    addBtn('openProject',openProject,2,2)
    showPushBtn()
    showResBtn()

    addLable("--------- 功能 ---------",0,3)
    addBtn('开始生成项目',start,1,3)
    addBtn('拷贝资源 src script res',copyGameAssets,2,3)
    addBtn('修改回到平台',backToPlatform,3,3)
    showLabel = copy.getFileData('python/androidMode.txt',default='0')
    btnStatus = addBtn(btnStatuslist[showLabel],updateShowLabelStatus,4,3)
    addBtn('编译so文件',buildNativeSo,5,3)
    addBtn('打包so文件(libcocos2djs.so）',zipSo,6,3)

    
    # Tkinter.Label(top,textvariable=var_g,width=30).grid(row=7,column=3)
    # var_g.set(getJsonValue(toBaseDir + 'assets/platform.json',"game_loginUrl"))  

    # addBtn('applyLocalUrl',applyLocalUrl,8,3)
    # addBtn('applyTestUrl',applyTestUrl,9,3)
    # addBtn('appyOnlineUrl',appyOnlineUrl,10,3)
    addLable("---------------- apk builder -----------------",7,3)
#    addBtn('createApk',createApk,8,3)createOfficalApk
    addBtn('createApk',createOfficalApk,8,3)
    addBtn('openApks',openApks,9,3)
    addBtn('copyProjectsJSToOut',copyProjectsJSToOut,10,3)
    addBtn("copyPlatformSrcToProject",copyPlatformSrc,11,3)
    # addBtn('checkJSoRjsc',checkJSoRjsc,11,3)

    addLable("--------- copy ---------",0,4)    
    addBtn('copyGameSrc',copyGameSrc,1,4)
    addBtn('copyGameScript',copyGameScript,2,4)
    addBtn('copyGameRes',copyGameRes,3,4)    
    # addBtn('copy game_version.json|main.js|project.json',copyGameAssetsSingalJS,4,4,h=1)
    addBtn('copyAllGameRes',copyAllGameRes,4,4)
    addBtn('这个按钮确保音效资源不会重复',saveMusicToLocal,5,4)
    addBtn('addMusicToProject',addMusicToProject,6,4)
    addBtn('使用爱加密处理过的资源',useIJMAssets,7,4)
    addBtn('分包',packTailand,8,4)
    #packJD_GF_PACK  copyMaplePackage updateApkPlatformJson
    # addBtn('你妹的官方包也要做渠道处理',packJD_GF_PACK,9,4)
    # addBtn('copytailandAssets',tailandAssets,10,4)
    # addBtn("just copyTailandJS",tailandJSC,11,4)
    # addLable("-------  handle tailand res  -------",12,4)
    # addBtn('compress tailand res',compressTailandRes,13,4)
    # addBtn('uncompress tailnd res',uncompressTailandRes,14,4)

    col = 5
    addLable(" ------------------------ platform.json ---------------------------",0,col)

    Tkinter.Label(top,textvariable=var_g,width=30).grid(row=1,column=col)
    # global game_loginUrl
    game_loginUrl = getJsonValue(toBaseDir + 'assets/platform.json',"game_loginUrl") 
    var_g.set(game_loginUrl)  

    addBtn('本地测试服',applyLocalUrl,2,col)
    addBtn('商务测试服',applyTestUrl,3,col)
    addBtn('渠道正式服',appyOnlineUrl,4,col)
    addBtn('开发测试服',appDevUrl,5,col)
    addBtn('应用宝独服',appTencentURl,6,col)
    addBtn('官方包地址',appOfficalUrl,7,col)
    addLable("－－－－－－－资源版本号－－－－－－－",8,col)

    global resourceText
    resourceText = Tkinter.Text(top,width=30,height=1)
    resourceText.grid(row=9,column=col)
    resourceText.insert('1.0',getJsonValue(toBaseDir + 'assets/platform.json','game_code_version'))

    addBtn('updateGameCodeVersion',updateGameCodeVersion,10,col)
    addBtn('updateGameLoginUrl',updateGameLoginUrl,11,col)


    addLable('------ create new platform project -----',12,col)

    global projectsText
    projectsText = Tkinter.Text(top,width=40,height=1)
    projectsText.grid(row=13,column=col)
    projectsText.insert('1.0','default')

    addBtn('create projects',createProjects,14,col)

    addLable(" -------  create cps --------------",15,col)
    global cpsText
    cpsText = Tkinter.Text(top,width=40,height=1)
    cpsText.grid(row=16,column=col)
    cpsText.insert('1.0','default')
    addBtn('create cps',createCPS,17,col)



    

    top.mainloop()

