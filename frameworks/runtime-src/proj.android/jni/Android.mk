LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE := bugly_native_prebuilt
LOCAL_SRC_FILES := prebuilt/armeabi/libBugly.so

include $(PREBUILT_SHARED_LIBRARY)

include $(CLEAR_VARS)

LOCAL_MODULE := cocos2djs_shared

LOCAL_MODULE_FILENAME := libcocos2djs

ifeq ($(USE_ARM_MODE),1)
LOCAL_ARM_MODE := arm
endif

#traverse all the directory and subdirectory
define walk
	$(wildcard $(1)) $(foreach e, $(wildcard $(1)/*), $(call walk, $(e)))
endef

#traverse Classes Directory
ALLFILES = $(call walk, $(LOCAL_PATH)/../../Classes)


FILE_LIST := hellojavascript/main.cpp 
FILE_LIST += $(filter %.cpp, $(ALLFILES))

FILE_INCLUDES := $(shell find $(LOCAL_PATH)/../../Classes -type d)


LOCAL_SRC_FILES := $(FILE_LIST:$(LOCAL_PATH)/%=%)

LOCAL_C_INCLUDES := $(FILE_INCLUDES)


LOCAL_STATIC_LIBRARIES := cocos2d_js_static

# 引用 bugly/Android.mk 定义的Module
LOCAL_STATIC_LIBRARIES += bugly_crashreport_cocos_static
# 引用 bugly/js/Android.mk 定义的Module
LOCAL_STATIC_LIBRARIES += bugly_agent_cocos_static_js

LOCAL_EXPORT_CFLAGS := -DCOCOS2D_DEBUG=2 -DCOCOS2D_JAVASCRIPT

include $(BUILD_SHARED_LIBRARY)


$(call import-module, scripting/js-bindings/proj.android)

# 导入 bugly 静态库目录
$(call import-module,external/bugly)

$(call import-module,external/bugly/js)
