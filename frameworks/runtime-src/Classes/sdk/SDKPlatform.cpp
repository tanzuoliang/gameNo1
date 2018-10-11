//
//  SDKPlatform.cpp
//  hope_baidu
//
//  Created by yons on 15/8/24.
//
//

#include "SDKPlatform.h"
#include "cocos2d.h"
#include "sdkCompiler.h"

#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
#import "PlatformManager.h"
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include "platform/android/jni/JniHelper.h"
#endif

#include "SDKCallback.h"
//#include "ScriptingCore.h"
#include "jsapi.h"
#include "jsfriendapi.h"
#include "platform/CCCommon.h"

#include "external/json/rapidjson.h"
#include "external/json/document.h"
#include "editor-support/cocostudio/DictionaryHelper.h"

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
//#include "TDCCTalkingDataGA.h"
//#include "TDCCAccount.h"
#endif



#define ANDROID_PLATFROM_JAVA           "org/cocos2dx/javascript/platform/PlatformManager"

using namespace cocos2d;

namespace sdk {
    
    
    SDKPlatform* _instance = nullptr;
    
    SDKPlatform* SDKPlatform::getInstance()
    {
        if(_instance ==  nullptr)
        {
            _instance = new SDKPlatform();
        }
        
        return _instance;
    }
    
    SDKPlatform::SDKPlatform()
    {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        cocos2d::registerCallFromAndroid(SDKCallback::callFromAndroid);
        platform_type = "android";
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        platform_type = "ios";
#endif
        
        platform = new PlatformData();
        rapidjson::Document doc;
        std::string data = cocos2d::FileUtils::getInstance()->getStringFromFile("platform.json");
        doc.Parse<0>(data.c_str());
        if(doc.HasParseError())
        {
            cocos2d::log("%s\n%s"," platform.json",data.c_str());
            CCASSERT(false, "platform.json");
        }
        else
        {
//            platform->platform_name=  cocostudio::DictionaryHelper::getInstance()->getStringValue_json(doc, "platform_name");
//            platform->platform_version=  cocostudio::DictionaryHelper::getInstance()->getStringValue_json(doc, "platform_name");
//            platform->platform_type=  cocostudio::DictionaryHelper::getInstance()->getIntValue_json(doc, "platform_type");
//            platform->platform_desc=  cocostudio::DictionaryHelper::getInstance()->getStringValue_json(doc, "platform_desc");
//            platform->talkingData_channel=  cocostudio::DictionaryHelper::getInstance()->getStringValue_json(doc, "talkingData_channel");
//            platform->game_code_version=  cocostudio::DictionaryHelper::getInstance()->getStringValue_json(doc, "game_code_version");
//            
//            if(cocostudio::DictionaryHelper::getInstance()->checkObjectExist_json(doc,"crashCode"))
//            {
//                platform->crashCode = cocostudio::DictionaryHelper::getInstance()->getStringValue_json(doc, "crashCode");
//            }
            
        }
        
    }
    
    void SDKPlatform::initPlatform()
    {
//#if CC_TARGET_PLATFORM == CC_PLATFORM_IOS
//        // [PlatformManager getInstance];
//#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
//        [[[PlatformManager getInstance] getPlatform] initPlatform];
//#endif
        CCLOG("----------------------------------SDK INIT SUCCESSFUL-");
    }
    
    

    
    void SDKPlatform::logoutPlatform()
    {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        cocos2d::JniMethodInfo t;
        if (cocos2d::JniHelper::getStaticMethodInfo(t, ANDROID_PLATFROM_JAVA, "logoutPlatform", "()V")) {
            t.env->CallStaticVoidMethod(t.classID, t.methodID);
            t.env->DeleteLocalRef(t.classID);
        }
        
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        [[[PlatformManager getInstance] getPlatform] loginoutPlatform];
#endif
    }
    
    void SDKPlatform::loginPlatform()
    {
        
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        cocos2d::JniMethodInfo t;
        if (cocos2d::JniHelper::getStaticMethodInfo(t, ANDROID_PLATFROM_JAVA, "loginPaltform", "()V")) {
            t.env->CallStaticVoidMethod(t.classID, t.methodID);
            t.env->DeleteLocalRef(t.classID);
        }
        
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        [[[PlatformManager getInstance] getPlatform] loginPlatform];
#endif
        
    }
    
    void SDKPlatform::payfor(std::string info)
    {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        cocos2d::JniMethodInfo t;
        if (cocos2d::JniHelper::getStaticMethodInfo(t, ANDROID_PLATFROM_JAVA, "payfor", "(Ljava/lang/String;)V")) {
            jstring stringArg1 = t.env->NewStringUTF(info.c_str());
            t.env->CallStaticVoidMethod(t.classID, t.methodID, stringArg1);
            t.env->DeleteLocalRef(stringArg1);
            t.env->DeleteLocalRef(t.classID);
        }
        
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        [[[PlatformManager getInstance] getPlatform] payfor:[NSString stringWithCString:info.c_str() encoding:NSUTF8StringEncoding]];
#endif
        
        
    }
    
    void SDKPlatform::resume()
    {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        cocos2d::JniMethodInfo t;
        if (cocos2d::JniHelper::getStaticMethodInfo(t, ANDROID_PLATFROM_JAVA, "resume", "()V")) {
            t.env->CallStaticVoidMethod(t.classID, t.methodID);
            t.env->DeleteLocalRef(t.classID);
        }
        
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        [[[PlatformManager getInstance] getPlatform] resume];
#endif
    }
    
    void SDKPlatform::pause()
    {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        cocos2d::JniMethodInfo t;
        if (cocos2d::JniHelper::getStaticMethodInfo(t, ANDROID_PLATFROM_JAVA, "pause", "()V")) {
            t.env->CallStaticVoidMethod(t.classID, t.methodID);
            t.env->DeleteLocalRef(t.classID);
        }
        
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        [[[PlatformManager getInstance] getPlatform] pause];
#endif
    }
    
    void SDKPlatform::loadExtraData(std::string jsonStr)
    {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        cocos2d::JniMethodInfo t;
        if (cocos2d::JniHelper::getStaticMethodInfo(t, ANDROID_PLATFROM_JAVA, "submitExtendData", "(Ljava/lang/String;)V")) {
            jstring stringArg1 = t.env->NewStringUTF(jsonStr.c_str());
            t.env->CallStaticVoidMethod(t.classID, t.methodID, stringArg1);
            t.env->DeleteLocalRef(stringArg1);
            t.env->DeleteLocalRef(t.classID);
        }
        
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        
        [[[PlatformManager getInstance] getPlatform] loadExtra:[[NSString alloc] initWithCString:jsonStr.c_str() encoding:NSUTF8StringEncoding]];
#endif
    }
    
    /**
     {"code":"",data:{}}
     **/
    void SDKPlatform::callJavaMethod(std::string jsonStr)
    {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        cocos2d::JniMethodInfo t;
        if (cocos2d::JniHelper::getStaticMethodInfo(t, ANDROID_PLATFROM_JAVA, "util", "(Ljava/lang/String;)V")) {
            jstring stringArg1 = t.env->NewStringUTF(jsonStr.c_str());
            t.env->CallStaticVoidMethod(t.classID, t.methodID, stringArg1);
            t.env->DeleteLocalRef(stringArg1);
            t.env->DeleteLocalRef(t.classID);
        }
#endif
        
    }
    
    
    //获取游戏版本号
    const char* SDKPlatform::getGameVersion()
    {
        return platform->game_code_version.c_str();
    }
    
    void SDKPlatform::didLogout()
    {
        isSuccessFlag = false;
        this->sendCustom("didLogout");
    }
    
    void SDKPlatform::callFromPlatform(const char* info){
        this->sendCustom("callFromPlatform",info);
    }
    
    
    void SDKPlatform::didLogin(const char* info)
    {
        
        this->sendCustom("didLogin",info);
    }
    
    void SDKPlatform::didLoginPlatform(const char* jsonStr)
    {
        if(isSuccessFlag == false)
        {
            isSuccessFlag = true;
            this->sendCustom("didLoginPlatform",jsonStr);
        }else
        {
            this->sendCustom("didLoginPlatformSecond",jsonStr);
        }
    }
    
    
    void SDKPlatform::didPaymentButNeedQuery(const char* info)
    {
        this->sendCustom("buyQuery",info);
    }
    
    void SDKPlatform::didPayment(const char* info)
    {
        
        this->sendCustom("didPayment",info);
    }
    
    void SDKPlatform::didInit()
    {
        
        this->sendCustom("didInit");
    }
    
    void SDKPlatform::showRequestAnimation()
    {
        
        this->sendCustom("showRequestAnimation");
    }
    
    void SDKPlatform::lowMemory(){
        
    }
    
    void SDKPlatform::hideRequestAnimation()
    {
        
        this->sendCustom("hideRequestAnimation");
    }
    
    void SDKPlatform::setPlatformType(int type)
    {
        
        this->sendCustom("setPlatformType",this->intToString(type));
        
    }
    
    void SDKPlatform::didShowLoginWindow()
    {
        
        this->sendCustom("didShowLoginWindow");
        
    }
    
    void SDKPlatform::didHideLoginWindow()
    {
        
        this->sendCustom("didHideLoginWindow");
        
    }
    
    /**
     td key
     **/
    const char* SDKPlatform::getTalkDataKey()
    {
        
#if CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID
        //测试包
        if(platform->platform_name == "null")
        {
            return "2A94A0AA2684B3A4160DF2F69A2CCB59";
        }
        else
        {
            return "30188659B0221683AD3314F20A209F43";
        }
#elif CC_TARGET_PLATFORM == CC_PLATFORM_IOS
        //测试包
        if(platform->platform_name == "null")
        {
            return "2A94A0AA2684B3A4160DF2F69A2CCB59";
        }
        else
        {
            return "7C86191DE76EB96FB06C6A2F4EECD8D8";
        }
#endif
        
        return "";
    }
    
    
    std::string SDKPlatform::getCrashCode()
    {
        return platform->crashCode;
    }
    
    std::string SDKPlatform::getPlatformName()
    {
        return platform->platform_name;
    }
    
    const char* SDKPlatform::getTalkingDataChannel()
    {
        return platform->talkingData_channel.c_str();
    }
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
//    static TDCCAccount* account = nullptr;
#endif
    
    void SDKPlatform::recorderUserLevel(int level)
    {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
//        if(account != nullptr)
//        {
//            account->setLevel(level);
//        }
#endif
    }
    
    void SDKPlatform::recorderUserInfo(const char* info)
    {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
//        rapidjson::Document doc;
//        doc.Parse<0>(info);
//        
//        const char* accountId = cocostudio::DictionaryHelper::getInstance()->getStringValue_json(doc, "accountId");
//        const char* gameServer = cocostudio::DictionaryHelper::getInstance()->getStringValue_json(doc, "gameServer");
//        const char* accountName = cocostudio::DictionaryHelper::getInstance()->getStringValue_json(doc, "accountName");
//        int level = cocostudio::DictionaryHelper::getInstance()->getIntValue_json(doc, "level");
//        account = TDCCAccount::setAccount(accountId);
//        account->setAccountType(TDCCAccount::TDCCAccountType::kAccountAnonymous);
//        account->setLevel(level);
//        account->setAccountName(accountName);
//        account->setGameServer(gameServer);
#endif
        
    }
    
    //----------------------------
    const char* SDKPlatform::intToString(int i)
    {
        std::stringstream stream;
        stream<<i;
        return stream.str().c_str();
    }
    
    void SDKPlatform::sendCustom(std::string type,std::string info)
    {
        if(type == "didLogout")
        {
            cocos2d::Director::getInstance()->getEventDispatcher()->dispatchCustomEvent(type,(void*)info.c_str());
            return;
        }
        
        cocos2d::log("%s\n%s"," sendCustom",info.c_str());
        
        cocos2d::Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]
                                                                                       {
                                                                                           cocos2d::log("%s\n%s"," sendCustom DELAY",info.c_str());
                                                                                           cocos2d::Director::getInstance()->getEventDispatcher()->dispatchCustomEvent(type,(void*)info.c_str());
                                                                                       });
        
    }
    
    
    //-------------- about push ------------------------------------------
    /**
     使用push
     **/
    void SDKPlatform::initPushWithAccout(std::string accout)
    {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        
        
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        [[[PlatformManager getInstance] getPlatform] initPushAlias:[NSString stringWithCString:accout.c_str() encoding:NSUTF8StringEncoding]];
        
#endif
    }
    
    
    //应用支运行时获得推送消息
    void SDKPlatform::didGetPushNotifition(const char* info)
    {
        this->sendCustom("pushNotifition",info);
    }
    
}
