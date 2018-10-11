#include "base/ccConfig.h"
#ifndef __cocos2dx_ty_h__
#define __cocos2dx_ty_h__

#include "jsapi.h"
#include "jsfriendapi.h"

extern JSClass  *jsb_ty_TYUpgradeManager_class;
extern JSObject *jsb_ty_TYUpgradeManager_prototype;

bool js_cocos2dx_ty_TYUpgradeManager_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_cocos2dx_ty_TYUpgradeManager_finalize(JSContext *cx, JSObject *obj);
void js_register_cocos2dx_ty_TYUpgradeManager(JSContext *cx, JS::HandleObject global);
void register_all_cocos2dx_ty(JSContext* cx, JS::HandleObject obj);
bool js_cocos2dx_ty_TYUpgradeManager_checkUpgrade(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_ty_TYUpgradeManager_deleteUpgrade(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_ty_TYUpgradeManager_onError(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_ty_TYUpgradeManager_onProgress(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_ty_TYUpgradeManager_onSuccess(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_ty_TYUpgradeManager_getValidMemory(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_ty_TYUpgradeManager_initDefault(JSContext *cx, uint32_t argc, jsval *vp);
bool js_cocos2dx_ty_TYUpgradeManager_getInstance(JSContext *cx, uint32_t argc, jsval *vp);

#endif // __cocos2dx_ty_h__
