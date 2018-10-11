//
//  TYUpgradeManager.hpp
//  tank
//
//  Created by 汪晓晔 on 16/11/9.
//
//

#ifndef TYUpgradeManager_hpp
#define TYUpgradeManager_hpp

#include <stdio.h>
#include <string>

namespace ty {
    
    class TYUpgradeManager
    {
    public:
        static TYUpgradeManager * getInstance();
        
        void initDefault();
        
        /**
         开始检测
         */
        void checkUpgrade(const char* packageUrl = nullptr,const char * versionFileUrl= nullptr,const char* storagePath = nullptr);
        
        /**
         删除热更新
         */
        void deleteUpgrade(std::string dir="");
        
        void onError(int code);
        void onProgress(int percent);
        void onSuccess();
        
        /**
         获取可用内存
         */
        int getValidMemory();
    };
    
    
}

#endif /* TYUpgradeManager_hpp */
