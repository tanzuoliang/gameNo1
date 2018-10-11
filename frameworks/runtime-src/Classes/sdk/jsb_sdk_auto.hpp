//
//  jsb_sdk_auto.h
//  hope_baidu
//
//  Created by yons on 15/8/24.
//
//

#ifndef __hope_baidu__jsb_sdk_auto__
#define __hope_baidu__jsb_sdk_auto__

#include <stdio.h>
#include "jsapi.h"
#include "jsfriendapi.h"

extern JSClass  *jsb_maple_sdk_class;
extern JSObject *jsb_maple_sdk_prototype;

void js_jsb_maple_auto_sdk_finalize(JSFreeOp *cx, JSObject *obj);
void js_register_jsb_maple_auto_sdk(JSContext *cx, JS::HandleObject global);

bool js_jsb_maple_auto_sdk_initPlatform(JSContext *cx, uint32_t argc, jsval *vp);
bool js_jsb_maple_auto_sdk_loginPlatform(JSContext *cx, uint32_t argc, jsval *vp);
bool js_jsb_maple_auto_sdk_loginoutPlatform(JSContext *cx, uint32_t argc, jsval *vp);
bool js_jsb_maple_auto_sdk_payfor(JSContext *cx, uint32_t argc, jsval *vp);
bool js_jsb_maple_auto_sdk_resume(JSContext *cx, uint32_t argc, jsval *vp);
bool js_jsb_maple_auto_sdk_pause(JSContext *cx, uint32_t argc, jsval *vp);
bool js_jsb_maple_auto_sdk_loadExtraData(JSContext *cx, uint32_t argc, jsval *vp);
bool js_jsb_maple_auto_sdk_callJavaMethod(JSContext *cx, uint32_t argc, jsval *vp);

bool js_jsb_maple_auto_sdk_addListener(JSContext *cx, uint32_t argc, jsval *vp);

bool js_jsb_maple_auto_sdk_getInstance(JSContext *cx, uint32_t argc, jsval *vp);

bool  js_jsb_maple_auto_sdk_createDelay(JSContext *cx, uint32_t argc, jsval *vp);
bool  js_jsb_maple_auto_sdk_breakDelay(JSContext *cx, uint32_t argc, jsval *vp);

bool js_jsb_maple_auto_sdk_initPushWithAccout(JSContext *cx, uint32_t argc, jsval *vp);

bool js_jsb_maple_auto_sdk_getGameVersion(JSContext *cx, uint32_t argc, jsval *vp);



//---------------------- about talkingData -------------------------
bool js_jsb_maple_auto_sdk_recorderUserInfo(JSContext *cx, uint32_t argc, jsval *vp);

bool js_jsb_maple_auto_sdk_recorderUserLevel(JSContext *cx, uint32_t argc, jsval *vp);

//---------------------- about talkingData -------------------------

#endif /* defined(__hope_baidu__jsb_sdk_auto__) */
