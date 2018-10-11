//
//  SDKCallback.cpp
//  hope
//
//  Created by yons on 15/8/25.
//
//
#include "SDKPlatform.h"
#include "SDKCallback.h"
#include "cocos2d.h"
#include "external/json/rapidjson.h"
#include "external/json/document.h"
#include "editor-support/cocostudio/DictionaryHelper.h"

#define _didLoginPlatform      10001

#define _didPayment            10002

#define _didLogout             10003

#define _didShowLoginWindow    10004

#define _didHideLoginWindow    10005

#define _didInit               10006

#define _didPaymentButNeedQuery 10007

#define _otherCommand           10008

#define JSON_HELPER             cocostudio::DictionaryHelper::getInstance()

void SDKCallback::callFromAndroid(const char* info)
{
    cocos2d::log("callFromAndroid %s",info);
    rapidjson::Document doc;
    doc.Parse<0>(info);
    if(doc.HasParseError())
    {
//        cocos2d::log("%s\n%s"," platform.json",info);
        CCASSERT(false, "from android info is not json mode");
    }
    else
    {
        int eventCode = JSON_HELPER->getIntValue_json(doc, "code");
        
        switch (eventCode) {
            case _didLoginPlatform:
                sdk::SDKPlatform::getInstance()->didLoginPlatform(JSON_HELPER->getStringValue_json(doc, "data"));
                break;
            case _didPayment:
                sdk::SDKPlatform::getInstance()->didPayment("");
                break;
            case _didLogout:
                sdk::SDKPlatform::getInstance()->didLogout();
                break;
            case _didShowLoginWindow:
                sdk::SDKPlatform::getInstance()->didShowLoginWindow();
                break;
            case _didHideLoginWindow:
                sdk::SDKPlatform::getInstance()->didHideLoginWindow();
                break;
            case _didInit:
                sdk::SDKPlatform::getInstance()->didInit();
                break;
            case _didPaymentButNeedQuery:
            {
                const char* buyOrder = JSON_HELPER->getStringValue_json(doc, "data");
                sdk::SDKPlatform::getInstance()->didPaymentButNeedQuery(buyOrder);
            }
                break;
            default:
                sdk::SDKPlatform::getInstance()->callFromPlatform(info);
                break;
            
        }
        
    }

}
