//
//  jsb_sdk_auto.cpp
//  hope_baidu
//
//  Created by yons on 15/8/24.
//
//

#include "jsb_sdk_auto.hpp"
#include "SDKPlatform.h"
#include "scripting/js-bindings/manual/cocos2d_specifics.hpp"
#include "cocos2d.h"

JSClass  *jsb_maple_sdk_class;
JSObject *jsb_maple_sdk_prototype;




static bool js_is_native_obj(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    args.rval().setBoolean(true);
    return true;
}

template<class T>
static bool dummy_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS_ReportError(cx, "Constructor for the requested class is not available, please refer to the API reference.");
    return false;
}

static bool empty_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
    return false;
}


void js_jsb_maple_auto_sdk_finalize(JSFreeOp *cx, JSObject *obj)
{
    CCLOGINFO("jsbindings: finalizing JS object %p (sdk::SDKPlatform)", obj);
}


bool js_jsb_maple_auto_sdk_getGameVersion(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    sdk::SDKPlatform* cobj = (sdk::SDKPlatform *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_jsb_maple_auto_sdk_getGameVersion : Invalid Native Object");
    if (argc == 0) {
        JSB_PRECONDITION2(ok, cx, false, "js_jsb_maple_auto_sdk_getGameVersion : Error processing arguments");
        const char* version = cobj->getGameVersion();
        JSString* str = JS_NewStringCopyZ(cx, version);
        args.rval().setString(str);
        return true;
    }
    
    JS_ReportError(cx, "js_jsb_maple_auto_sdk_getGameVersion : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}



void js_register_jsb_maple_auto_sdk(JSContext *cx, JS::HandleObject global)
{
    jsb_maple_sdk_class = (JSClass *)calloc(1, sizeof(JSClass));
    jsb_maple_sdk_class->name = "SDKPlatform";
    jsb_maple_sdk_class->addProperty = JS_PropertyStub;
    jsb_maple_sdk_class->delProperty = JS_DeletePropertyStub;
    jsb_maple_sdk_class->getProperty = JS_PropertyStub;
    jsb_maple_sdk_class->setProperty = JS_StrictPropertyStub;
    jsb_maple_sdk_class->enumerate = JS_EnumerateStub;
    jsb_maple_sdk_class->resolve = JS_ResolveStub;
    jsb_maple_sdk_class->convert = JS_ConvertStub;
    jsb_maple_sdk_class->finalize = js_jsb_maple_auto_sdk_finalize;
    jsb_maple_sdk_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);
    
    static JSPropertySpec properties[] = {
        JS_PSG("__nativeObj", js_is_native_obj, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_PS_END
    };
    
    //js_jsb_maple_auto_sdk_callJavaMethod
    static JSFunctionSpec funcs[] = {
        JS_FN("initPlatform", js_jsb_maple_auto_sdk_initPlatform, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("loginPlatform", js_jsb_maple_auto_sdk_loginPlatform, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("logoutPlatform", js_jsb_maple_auto_sdk_loginoutPlatform, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("payfor", js_jsb_maple_auto_sdk_payfor, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("pause", js_jsb_maple_auto_sdk_pause, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("resume", js_jsb_maple_auto_sdk_resume, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("loadExtraData", js_jsb_maple_auto_sdk_loadExtraData, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("recorderUserLevel", js_jsb_maple_auto_sdk_recorderUserLevel, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("recorderUserInfo", js_jsb_maple_auto_sdk_recorderUserInfo, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("initPushWithAccout", js_jsb_maple_auto_sdk_initPushWithAccout, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getGameVersion", js_jsb_maple_auto_sdk_getGameVersion, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("callJavaMethod", js_jsb_maple_auto_sdk_callJavaMethod, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("createDelay", js_jsb_maple_auto_sdk_createDelay, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("breakDelay", js_jsb_maple_auto_sdk_breakDelay, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };
    
    JSFunctionSpec st_funcs[] = {
        JS_FN("getInstance", js_jsb_maple_auto_sdk_getInstance, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };
    /**
     JS_InitClass(JSContext *cx, JS::HandleObject obj, JS::HandleObject parent_proto,
     const JSClass *clasp, JSNative constructor, unsigned nargs,
     const JSPropertySpec *ps, const JSFunctionSpec *fs,
     const JSPropertySpec *static_ps, const JSFunctionSpec *static_fs);

     **/
    jsb_maple_sdk_prototype = JS_InitClass(
                                           cx, global,
                                           JS::NullPtr(), // parent proto
                                           jsb_maple_sdk_class,
                                           dummy_constructor<sdk::SDKPlatform>, 0, // no constructor
                                           properties,
                                           funcs,
                                           NULL, // no static properties
                                           st_funcs);
    // make the class enumerable in the registered namespace
    //  bool found;
    //FIXME: Removed in Firefox v27
    //  JS_SetPropertyAttributes(cx, global, "SkillData", JSPROP_ENUMERATE | JSPROP_READONLY, &found);
    
    // add the proto and JSClass to the type->js info hash table
    
    JS::RootedObject proto(cx, jsb_maple_sdk_prototype);
    JS::RootedValue className(cx, std_string_to_jsval(cx, "SDKPlatform"));
    JS_SetProperty(cx, proto, "_className", className);
    JS_SetProperty(cx, proto, "__nativeObj", JS::TrueHandleValue);
    JS_SetProperty(cx, proto, "__is_ref", JS::FalseHandleValue);
    // add the proto and JSClass to the type->js info hash table
    //jsb_register_class<sdk::SDKPlatform>(cx, jsb_maple_sdk_prototype, proto);
    jsb_register_class<sdk::SDKPlatform>(cx, jsb_maple_sdk_class, proto, JS::NullPtr());

}

bool js_jsb_maple_auto_sdk_initPlatform(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    sdk::SDKPlatform* cobj = (sdk::SDKPlatform *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_jsb_maple_auto_sdk_initPlatform : Invalid Native Object");
    if (argc == 0) {
        JSB_PRECONDITION2(ok, cx, false, "js_jsb_maple_auto_sdk_initPlatform : Error processing arguments");
        cobj->initPlatform();
        args.rval().setUndefined();
        return true;
    }
    
    JS_ReportError(cx, "js_jsb_maple_auto_sdk_initPlatform : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
    
}

bool js_jsb_maple_auto_sdk_loginPlatform(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    sdk::SDKPlatform* cobj = (sdk::SDKPlatform *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_jsb_maple_auto_sdk_loginPlatform : Invalid Native Object");
    if (argc == 0) {
        JSB_PRECONDITION2(ok, cx, false, "js_jsb_maple_auto_sdk_loginPlatform : Error processing arguments");
        cobj->loginPlatform();
        args.rval().setUndefined();
        return true;
    }
    
    JS_ReportError(cx, "js_jsb_maple_auto_sdk_loginPlatform : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}

bool js_jsb_maple_auto_sdk_loginoutPlatform(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    sdk::SDKPlatform* cobj = (sdk::SDKPlatform *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_jsb_maple_auto_sdk_loginoutPlatform : Invalid Native Object");
    if (argc == 0) {
        JSB_PRECONDITION2(ok, cx, false, "js_jsb_maple_auto_sdk_loginoutPlatform : Error processing arguments");
        cobj->logoutPlatform();
        args.rval().setUndefined();
        return true;
    }
    
    JS_ReportError(cx, "js_jsb_maple_auto_sdk_loginoutPlatform : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}

bool js_jsb_maple_auto_sdk_payfor(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    sdk::SDKPlatform* cobj = (sdk::SDKPlatform *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_jsb_maple_auto_sdk_payfor : Invalid Native Object");
    if (argc == 1) {
        std::string payinfo;
        ok &= jsval_to_std_string(cx, args.get(0), &payinfo);
        JSB_PRECONDITION2(ok, cx, false, "js_jsb_maple_auto_sdk_payfor : Error processing arguments");
        cobj->payfor(payinfo);
        args.rval().setUndefined();
        return true;
    }
    
    JS_ReportError(cx, "js_jsb_maple_auto_sdk_payfor : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}

bool js_jsb_maple_auto_sdk_callJavaMethod(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    sdk::SDKPlatform* cobj = (sdk::SDKPlatform *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_jsb_maple_auto_sdk_callJavaMethod : Invalid Native Object");
    if (argc == 1) {
        std::string payinfo;
        ok &= jsval_to_std_string(cx, args.get(0), &payinfo);
        JSB_PRECONDITION2(ok, cx, false, "js_jsb_maple_auto_sdk_callJavaMethod : Error processing arguments");
        cobj->callJavaMethod(payinfo);
        args.rval().setUndefined();
        return true;
    }
    
    JS_ReportError(cx, "js_jsb_maple_auto_sdk_callJavaMethod : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}

bool js_jsb_maple_auto_sdk_initPushWithAccout(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    sdk::SDKPlatform* cobj = (sdk::SDKPlatform *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_jsb_maple_auto_sdk_initPushWithAccout : Invalid Native Object");
    if (argc == 1) {
        std::string accout;
        ok &= jsval_to_std_string(cx, args.get(0), &accout);
        JSB_PRECONDITION2(ok, cx, false, "js_jsb_maple_auto_sdk_initPushWithAccout : Error processing arguments");
        cobj->initPushWithAccout(accout);
        args.rval().setUndefined();
        return true;
    }
    
    JS_ReportError(cx, "js_jsb_maple_auto_sdk_initPushWithAccout : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
    
}

bool js_jsb_maple_auto_sdk_resume(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    sdk::SDKPlatform* cobj = (sdk::SDKPlatform *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_jsb_maple_auto_sdk_resume : Invalid Native Object");
    if (argc == 0) {
        JSB_PRECONDITION2(ok, cx, false, "js_jsb_maple_auto_sdk_resume : Error processing arguments");
        cobj->resume();
        args.rval().setUndefined();
        return true;
    }
    
    JS_ReportError(cx, "js_jsb_maple_auto_sdk_resume : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}

bool js_jsb_maple_auto_sdk_pause(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    sdk::SDKPlatform* cobj = (sdk::SDKPlatform *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_jsb_maple_auto_sdk_pause : Invalid Native Object");
    if (argc == 0) {
        JSB_PRECONDITION2(ok, cx, false, "js_jsb_maple_auto_sdk_pause : Error processing arguments");
        cobj->pause();
        args.rval().setUndefined();
        return true;
    }
    
    JS_ReportError(cx, "js_jsb_maple_auto_sdk_pause : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}


bool js_jsb_maple_auto_sdk_getInstance(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    if (argc == 0) {
        
        sdk::SDKPlatform* ret = sdk::SDKPlatform::getInstance();
        jsval jsret = JSVAL_NULL;
        if (ret) {
            jsret = OBJECT_TO_JSVAL(js_get_or_create_jsobject<sdk::SDKPlatform>(cx, (sdk::SDKPlatform*)ret));
        } else {
            jsret = JSVAL_NULL;
        };
        args.rval().set(jsret);
        return true;
    }
    JS_ReportError(cx, "js_jsb_maple_auto_sdk_getInstance : wrong number of arguments");
    return false;
}


bool  js_jsb_maple_auto_sdk_createDelay(JSContext *cx, uint32_t argc, jsval *vp){
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    sdk::SDKPlatform* cobj = (sdk::SDKPlatform *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_jsb_maple_auto_sdk_createDelay");
    if (argc == 2) {
        std::function<void ()> arg0;
        uint32_t time;
        do {
            if(JS_TypeOfValue(cx, args.get(0)) == JSTYPE_FUNCTION)
            {
                JS::RootedObject jstarget(cx, args.thisv().toObjectOrNull());
                std::shared_ptr<JSFunctionWrapper> func(new JSFunctionWrapper(cx, jstarget, args.get(0), args.thisv()));
                auto lambda = [=]() -> void {
                    JSB_AUTOCOMPARTMENT_WITH_GLOBAL_OBJCET
                    JS::RootedValue rval(cx);
                    bool succeed = func->invoke(0, nullptr, &rval);
                    if (!succeed && JS_IsExceptionPending(cx)) {
                        JS_ReportPendingException(cx);
                    }
                };
                arg0 = lambda;
            }
            else
            {
                arg0 = nullptr;
            }
        } while(0)
            ;
        JSB_PRECONDITION2(ok, cx, false, "js_jsb_maple_auto_sdk_createDelay : Error processing arguments fun");
        ok &= jsval_to_uint32(cx, args.get(1), &time);
        JSB_PRECONDITION2(ok, cx, false, "js_jsb_maple_auto_sdk_createDelay : Error processing arguments time");
        
        cobj->createDelay(arg0,time);
        args.rval().setUndefined();
        return true;
    }
    
    JS_ReportError(cx, "js_jsb_maple_auto_sdk_createDelay : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;

    
}


bool  js_jsb_maple_auto_sdk_breakDelay(JSContext *cx, uint32_t argc, jsval *vp){
    
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    sdk::SDKPlatform* cobj = (sdk::SDKPlatform *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_jsb_maple_auto_sdk_breakDelay : Invalid Native Object");
    if (argc == 0) {
        cobj->breakDelay();
        args.rval().setUndefined();
        return true;
    }
    
    JS_ReportError(cx, "js_jsb_maple_auto_sdk_breakDelay : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;

}


bool js_jsb_maple_auto_sdk_addListener(JSContext *cx, uint32_t argc, jsval *vp){
    
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    sdk::SDKPlatform* cobj = (sdk::SDKPlatform *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_jsb_maple_auto_sdk_addListener : Invalid Native Object");
    if (argc == 1) {
        std::function<void (char *)> arg0;
        do {
            if(JS_TypeOfValue(cx, args.get(0)) == JSTYPE_FUNCTION)
            {
                JS::RootedObject jstarget(cx, args.thisv().toObjectOrNull());
                std::shared_ptr<JSFunctionWrapper> func(new JSFunctionWrapper(cx, jstarget, args.get(0), args.thisv()));
                auto lambda = [=](char*) -> void {
                    JSB_AUTOCOMPARTMENT_WITH_GLOBAL_OBJCET
                    JS::RootedValue rval(cx);
                    bool succeed = func->invoke(0, nullptr, &rval);
                    if (!succeed && JS_IsExceptionPending(cx)) {
                        JS_ReportPendingException(cx);
                    }
                };
                arg0 = lambda;
            }
            else
            {
                arg0 = nullptr;
            }
        } while(0)
            ;
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_Node_setOnExitCallback : Error processing arguments");
        //cobj->addListener(arg0);
        //cobj->listener = (void*)arg0;
        args.rval().setUndefined();
        return true;
    }
    
    JS_ReportError(cx, "js_cocos2dx_Node_setOnExitCallback : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;

}

bool js_jsb_maple_auto_sdk_loadExtraData(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    sdk::SDKPlatform* cobj = (sdk::SDKPlatform *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_jsb_maple_auto_sdk_loadExtraData : Invalid Native Object");
    if (argc == 1) {
        std::string payinfo;
        ok &= jsval_to_std_string(cx, args.get(0), &payinfo);
        JSB_PRECONDITION2(ok, cx, false, "js_jsb_maple_auto_sdk_loadExtraData : Error processing arguments");
        cobj->loadExtraData(payinfo);
        args.rval().setUndefined();
        return true;
    }
    
    JS_ReportError(cx, "js_jsb_maple_auto_sdk_loadExtraData : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}


//---------------------- about talkingData -------------------------
bool js_jsb_maple_auto_sdk_recorderUserInfo(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    sdk::SDKPlatform* cobj = (sdk::SDKPlatform *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_jsb_maple_auto_sdk_recorderUserInfo : Invalid Native Object");
    if (argc == 1) {
        std::string userInfo;
        ok &= jsval_to_std_string(cx, args.get(0), &userInfo);
        JSB_PRECONDITION2(ok, cx, false, "js_jsb_maple_auto_sdk_recorderUserInfo : Error processing arguments");
        cobj->recorderUserInfo(userInfo.c_str());
        args.rval().setUndefined();
        return true;
    }
    
    JS_ReportError(cx, "js_jsb_maple_auto_sdk_recorderUserInfo : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}

bool js_jsb_maple_auto_sdk_recorderUserLevel(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    sdk::SDKPlatform* cobj = (sdk::SDKPlatform *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_jsb_maple_auto_sdk_recorderUserLevel : Invalid Native Object");
    if (argc == 1) {
        uint32_t userLevel;
        ok &= jsval_to_uint32(cx, args.get(0), &userLevel);
        JSB_PRECONDITION2(ok, cx, false, "js_jsb_maple_auto_sdk_recorderUserLevel : Error processing arguments");
        cobj->recorderUserLevel(userLevel);
        args.rval().setUndefined();
        return true;
    }
    
    JS_ReportError(cx, "js_jsb_maple_auto_sdk_recorderUserLevel : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}

//---------------------- about talkingData -------------------------

