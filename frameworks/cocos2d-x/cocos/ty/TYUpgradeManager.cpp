//
//  TYUpgradeManager.cpp
//  tank
//
//  Created by 汪晓晔 on 16/11/9.
//
//

#include "TYUpgradeManager.hpp"
#include "cocos2d.h"
#include "platform/CCCommon.h"
#include "extensions/assets-manager/AssetsManager.h"
#include "extensions/cocos-ext.h"
#include "base/CCEventCustom.h"

using namespace std;
using namespace cocos2d;

namespace ty {
    
    static TYUpgradeManager *  instance = nullptr;
    
    cocos2d::extension::AssetsManager*  manager = nullptr;
    
    void TYUpgradeManager::initDefault()
    {
        
    }
    
    TYUpgradeManager * TYUpgradeManager::getInstance()
    {
        if(!instance)
            instance = new TYUpgradeManager();
        return instance;
    }
    
    void TYUpgradeManager::checkUpgrade(const char* packageUrl,const char * versionFileUrl,const char* storagePath)
    {
        manager = cocos2d::extension::AssetsManager::create(packageUrl,versionFileUrl,storagePath, CC_CALLBACK_1(TYUpgradeManager::onError, this), CC_CALLBACK_1(TYUpgradeManager::onProgress, this), CC_CALLBACK_0(TYUpgradeManager::onSuccess, this));
        manager->setConnectionTimeout(3);
        manager->checkUpdate();
    }
    
    void TYUpgradeManager::onError(int code)
    {
        log("update failed, error code: %d", code);
        cocos2d::Director::getInstance()->
        getScheduler()->
        performFunctionInCocosThread([=]()
                                     {
                                         cocos2d::EventCustom event("tianyi_upgrade_onerror");
                                         event.setUserData(nullptr);
                                         Director::getInstance()->getEventDispatcher()->dispatchEvent(&event);
                                     });

    }
    
    void TYUpgradeManager::onProgress(int percent)
    {
        log("update progress: %d", percent);
        string ps= StringUtils::toString(percent);
        
        cocos2d::Director::getInstance()->
        getScheduler()->
        performFunctionInCocosThread([=]()
                                     {
                                         cocos2d::EventCustom event("tianyi_upgrade_onprogress");
                                         event.setUserData((void *)ps.c_str());
                                         Director::getInstance()->getEventDispatcher()->dispatchEvent(&event);
                                     });

    }
    
    void TYUpgradeManager::onSuccess()
    {
        log("update success!!!");
        cocos2d::Director::getInstance()->
        getScheduler()->
        performFunctionInCocosThread([=]()
                                     {
                                         cocos2d::EventCustom event("tianyi_upgrade_onsuccess");
                                         event.setUserData(nullptr);
                                         Director::getInstance()->getEventDispatcher()->dispatchEvent(&event);
                                     });

    }
    
    void TYUpgradeManager::deleteUpgrade(std::string dir)
    {
        
//        manager->removeFile(dir);
    }
    
    int TYUpgradeManager::getValidMemory()
    {
        return 2;
    }
}
