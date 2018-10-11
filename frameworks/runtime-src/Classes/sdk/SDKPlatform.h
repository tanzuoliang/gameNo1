//
//  SDKPlatform.h
//  hope_baidu
//
//  Created by yons on 15/8/24.
//
//

#ifndef __hope_baidu__SDKPlatform__
#define __hope_baidu__SDKPlatform__

#include <stdio.h>
#include <string>
#include <thread>

namespace sdk {
    
    class PlatformData
    {
        public:
        std::string crashCode = "0";
        std::string platform_name = "";
        std::string platform_version = "";
        int platform_type = 1;
        std::string platform_desc = "";
        std::string talkingData_channel = "";
        std::string game_code_version = "";
    };
    
    class SDKPlatform
    {
        private:
        std::string platform_type;
        std::string _extraData;
        
        bool hasDelay = false;
        
        bool isSuccessFlag = false;
        
        
        PlatformData* platform;
        
        public:
        
        //std::function<void(char*)> listener = nullptr;
        
        static SDKPlatform* getInstance();
        
        SDKPlatform();
        
        void createDelay(std::function<void()>& fun,float time){
            this->hasDelay = true;
//            auto thread = new std::thread([fun,this,time](){
//                while(this->hasDelay){
//                    usleep(time * 1000);
//                    //fun();
//                }
//            });
//            thread->detach();
        }
        
        void breakDelay(){
            this->hasDelay = false;
        }
        
        //请求初始化平台（目前这个不用调，游戏初始平台自己执行）
        void initPlatform();
        
        //请求登入平台
        void loginPlatform();
        
        //请求退出平台
        void logoutPlatform();
        
        //获取游戏版本号
        const char* getGameVersion();
        
        //支付
        void payfor(std::string info);
        
        //
        void resume();
        
        //
        void pause();
        
        //提交额外信息给平台
        void loadExtraData(std::string jsonStr);
        
        /**
         {"code":"",data:{}}
         **/
        void callJavaMethod(std::string jsonStr);
        
        void callFromPlatform(const char* info);
        
        //初始化平台完成
        void didInit();
        
        //退出平台完成
        void didLogout();
        
        //登入平台成功
        void didLoginPlatform(const char* jsonStr);
        
        //登入游戏成功
        void didLogin(const char* info);
        
        //支付完成
        void didPayment(const char* info);
        
        void didPaymentButNeedQuery(const char* info);
        
        //显示通讯动
        void showRequestAnimation();
        //删除通讯动画
        void hideRequestAnimation();
        
        void didShowLoginWindow();
        
        void didHideLoginWindow();
        
        
        void setPlatformType(int type);
        
        void lowMemory();
        
        /**
         ** 获取注册数据统计聚道
         */
        const char* getTalkingDataChannel();
        const char* getTalkDataKey();
        std::string getPlatformName();
        //是否接入崩溃插件
        std::string getCrashCode();
        //记录玩家等级（升级时）
        void recorderUserLevel(int level);
        void recorderUserInfo(const char* info);
        //-------------- about push ------------------------------------------
        /**
         使用push
         **/
        void initPushWithAccout(std::string accout);
        //应用支运行时获得推送消息
        void didGetPushNotifition(const char* info);
        private:
        void sendCustom(std::string type,std::string info = "");
        
        const char* intToString(int i);
        
    
    
    };
    
    
    
}

#endif /* defined(__hope_baidu__SDKPlatform__) */
