/****************************************************************************
Copyright (c) 2010-2012 cocos2d-x.org
Copyright (c) 2013-2014 Chukong Technologies Inc.

http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
#include <stdlib.h>
#include <jni.h>
#include <android/log.h>
#include <string>
#include "platform/android/jni/JniHelper.h"
#include "platform/android/jni/Java_org_cocos2dx_lib_SdkHelper.h"

#include "base/ccUTF8.h"

#define  LOG_TAG    "Java_org_cocos2dx_lib_SdkHelper.cpp"
#define  LOGD(...)  __android_log_print(ANDROID_LOG_DEBUG,LOG_TAG,__VA_ARGS__)

static const std::string className = "org/cocos2dx/javascript/sdk/SdkHelper";

static NativeCallBackMethod _nativeCallback = nullptr;
using namespace cocos2d;
using namespace std;

extern "C" {
    
    JNIEXPORT void JNICALL Java_org_cocos2dx_javascript_platform_PlatformManager_nativeSdkCallback(JNIEnv*  env, jobject thiz,jstring info)
    {
        if(_nativeCallback != nullptr)
        {
            //int code = (int)value;
            string msg = JniHelper::jstring2string(info);
            _nativeCallback(msg.c_str());    
            LOGD("get from android is %s",msg.c_str());
        }
        else{

            LOGD("_nativeCallback is nullptr");
        }
    }
    
}

void setAndroidNativeCallback(NativeCallBackMethod callback)
{
    _nativeCallback = callback;
}
