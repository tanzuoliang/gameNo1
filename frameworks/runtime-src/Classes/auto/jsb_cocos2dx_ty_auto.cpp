#include "jsb_cocos2dx_ty_auto.hpp"
#include "scripting/js-bindings/manual/cocos2d_specifics.hpp"
#include "TYUpgradeManager.hpp"

template<class T>
static bool dummy_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS_ReportError(cx, "Constructor for the requested class is not available, please refer to the API reference.");
    return false;
}

static bool empty_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
    return false;
}

static bool js_is_native_obj(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    args.rval().setBoolean(true);
    return true;
}
JSClass  *jsb_ty_TYUpgradeManager_class;
JSObject *jsb_ty_TYUpgradeManager_prototype;

bool js_cocos2dx_ty_TYUpgradeManager_checkUpgrade(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    ty::TYUpgradeManager* cobj = (ty::TYUpgradeManager *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_ty_TYUpgradeManager_checkUpgrade : Invalid Native Object");
    if (argc == 0) {
        cobj->checkUpgrade();
        args.rval().setUndefined();
        return true;
    }
    if (argc == 1) {
        const char* arg0 = nullptr;
        std::string arg0_tmp; ok &= jsval_to_std_string(cx, args.get(0), &arg0_tmp); arg0 = arg0_tmp.c_str();
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_ty_TYUpgradeManager_checkUpgrade : Error processing arguments");
        cobj->checkUpgrade(arg0);
        args.rval().setUndefined();
        return true;
    }
    if (argc == 2) {
        const char* arg0 = nullptr;
        const char* arg1 = nullptr;
        std::string arg0_tmp; ok &= jsval_to_std_string(cx, args.get(0), &arg0_tmp); arg0 = arg0_tmp.c_str();
        std::string arg1_tmp; ok &= jsval_to_std_string(cx, args.get(1), &arg1_tmp); arg1 = arg1_tmp.c_str();
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_ty_TYUpgradeManager_checkUpgrade : Error processing arguments");
        cobj->checkUpgrade(arg0, arg1);
        args.rval().setUndefined();
        return true;
    }
    if (argc == 3) {
        const char* arg0 = nullptr;
        const char* arg1 = nullptr;
        const char* arg2 = nullptr;
        std::string arg0_tmp; ok &= jsval_to_std_string(cx, args.get(0), &arg0_tmp); arg0 = arg0_tmp.c_str();
        std::string arg1_tmp; ok &= jsval_to_std_string(cx, args.get(1), &arg1_tmp); arg1 = arg1_tmp.c_str();
        std::string arg2_tmp; ok &= jsval_to_std_string(cx, args.get(2), &arg2_tmp); arg2 = arg2_tmp.c_str();
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_ty_TYUpgradeManager_checkUpgrade : Error processing arguments");
        cobj->checkUpgrade(arg0, arg1, arg2);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_ty_TYUpgradeManager_checkUpgrade : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_cocos2dx_ty_TYUpgradeManager_deleteUpgrade(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    ty::TYUpgradeManager* cobj = (ty::TYUpgradeManager *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_ty_TYUpgradeManager_deleteUpgrade : Invalid Native Object");
    if (argc == 0) {
        cobj->deleteUpgrade();
        args.rval().setUndefined();
        return true;
    }
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_ty_TYUpgradeManager_deleteUpgrade : Error processing arguments");
        cobj->deleteUpgrade(arg0);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_ty_TYUpgradeManager_deleteUpgrade : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_cocos2dx_ty_TYUpgradeManager_onError(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    ty::TYUpgradeManager* cobj = (ty::TYUpgradeManager *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_ty_TYUpgradeManager_onError : Invalid Native Object");
    if (argc == 1) {
        int arg0 = 0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_ty_TYUpgradeManager_onError : Error processing arguments");
        cobj->onError(arg0);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_ty_TYUpgradeManager_onError : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_cocos2dx_ty_TYUpgradeManager_onProgress(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    ty::TYUpgradeManager* cobj = (ty::TYUpgradeManager *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_ty_TYUpgradeManager_onProgress : Invalid Native Object");
    if (argc == 1) {
        int arg0 = 0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_cocos2dx_ty_TYUpgradeManager_onProgress : Error processing arguments");
        cobj->onProgress(arg0);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_ty_TYUpgradeManager_onProgress : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_cocos2dx_ty_TYUpgradeManager_onSuccess(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    ty::TYUpgradeManager* cobj = (ty::TYUpgradeManager *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_ty_TYUpgradeManager_onSuccess : Invalid Native Object");
    if (argc == 0) {
        cobj->onSuccess();
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_ty_TYUpgradeManager_onSuccess : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_cocos2dx_ty_TYUpgradeManager_getValidMemory(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    ty::TYUpgradeManager* cobj = (ty::TYUpgradeManager *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_ty_TYUpgradeManager_getValidMemory : Invalid Native Object");
    if (argc == 0) {
        int ret = cobj->getValidMemory();
        jsval jsret = JSVAL_NULL;
        jsret = int32_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_ty_TYUpgradeManager_getValidMemory : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_cocos2dx_ty_TYUpgradeManager_initDefault(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    ty::TYUpgradeManager* cobj = (ty::TYUpgradeManager *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_cocos2dx_ty_TYUpgradeManager_initDefault : Invalid Native Object");
    if (argc == 0) {
        cobj->initDefault();
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_cocos2dx_ty_TYUpgradeManager_initDefault : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_cocos2dx_ty_TYUpgradeManager_getInstance(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    if (argc == 0) {

        ty::TYUpgradeManager* ret = ty::TYUpgradeManager::getInstance();
        jsval jsret = JSVAL_NULL;
        if (ret) {
        jsret = OBJECT_TO_JSVAL(js_get_or_create_jsobject<ty::TYUpgradeManager>(cx, (ty::TYUpgradeManager*)ret));
    } else {
        jsret = JSVAL_NULL;
    };
        args.rval().set(jsret);
        return true;
    }
    JS_ReportError(cx, "js_cocos2dx_ty_TYUpgradeManager_getInstance : wrong number of arguments");
    return false;
}


void js_register_cocos2dx_ty_TYUpgradeManager(JSContext *cx, JS::HandleObject global) {
    jsb_ty_TYUpgradeManager_class = (JSClass *)calloc(1, sizeof(JSClass));
    jsb_ty_TYUpgradeManager_class->name = "TYUpgradeManager";
    jsb_ty_TYUpgradeManager_class->addProperty = JS_PropertyStub;
    jsb_ty_TYUpgradeManager_class->delProperty = JS_DeletePropertyStub;
    jsb_ty_TYUpgradeManager_class->getProperty = JS_PropertyStub;
    jsb_ty_TYUpgradeManager_class->setProperty = JS_StrictPropertyStub;
    jsb_ty_TYUpgradeManager_class->enumerate = JS_EnumerateStub;
    jsb_ty_TYUpgradeManager_class->resolve = JS_ResolveStub;
    jsb_ty_TYUpgradeManager_class->convert = JS_ConvertStub;
    jsb_ty_TYUpgradeManager_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

    static JSPropertySpec properties[] = {
        JS_PS_END
    };

    static JSFunctionSpec funcs[] = {
        JS_FN("checkUpgrade", js_cocos2dx_ty_TYUpgradeManager_checkUpgrade, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("deleteUpgrade", js_cocos2dx_ty_TYUpgradeManager_deleteUpgrade, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("onError", js_cocos2dx_ty_TYUpgradeManager_onError, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("onProgress", js_cocos2dx_ty_TYUpgradeManager_onProgress, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("onSuccess", js_cocos2dx_ty_TYUpgradeManager_onSuccess, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getValidMemory", js_cocos2dx_ty_TYUpgradeManager_getValidMemory, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("initDefault", js_cocos2dx_ty_TYUpgradeManager_initDefault, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    static JSFunctionSpec st_funcs[] = {
        JS_FN("getInstance", js_cocos2dx_ty_TYUpgradeManager_getInstance, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    jsb_ty_TYUpgradeManager_prototype = JS_InitClass(
        cx, global,
        JS::NullPtr(),
        jsb_ty_TYUpgradeManager_class,
        dummy_constructor<ty::TYUpgradeManager>, 0, // no constructor
        properties,
        funcs,
        NULL, // no static properties
        st_funcs);

    JS::RootedObject proto(cx, jsb_ty_TYUpgradeManager_prototype);
    JS::RootedValue className(cx, std_string_to_jsval(cx, "TYUpgradeManager"));
    JS_SetProperty(cx, proto, "_className", className);
    JS_SetProperty(cx, proto, "__nativeObj", JS::TrueHandleValue);
    JS_SetProperty(cx, proto, "__is_ref", JS::FalseHandleValue);
    // add the proto and JSClass to the type->js info hash table
    jsb_register_class<ty::TYUpgradeManager>(cx, jsb_ty_TYUpgradeManager_class, proto, JS::NullPtr());
}

void register_all_cocos2dx_ty(JSContext* cx, JS::HandleObject obj) {
    // Get the ns
    JS::RootedObject ns(cx);
    get_or_create_js_obj(cx, obj, "tianyi", &ns);

    js_register_cocos2dx_ty_TYUpgradeManager(cx, ns);
}

