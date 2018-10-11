//
//  IOSPlatform.h
//  hope_baidu
//
//  Created by yons on 15/8/24.
//
//

#import <UIKit/UIKit.h>
#import "JsonParser.h"
#import "PlatformData.h"

#define KEY_DIMONE          "dimond"
#define KEY_GOODS_NAME      "g_name"
#define KEY_GOODS_ID        "g_id"
#define KEY_ROLE_ID         "role_id"
#define KEY_ZONE_ID         "zone_id"
#define KEY_RATE            "rate"
#define KEY_EXTRA           "extra"
#define KEY_ORDERID         "orderId"

@interface IOSPlatform : NSObject{
    NSString* appId;
    NSString* appKey;
    NSString* appSec;
    NSString* loginUrl;
    NSString* payUrl;
    BOOL initSuccess;
    BOOL requestLoginPlatform;
    
    PlatformData* platformData;
    
    NSDictionary* payDic;
    
    int closeWindoCount;
    
    BOOL isShowLoginWindow;
    
    NSString* pushAlias;
    
    BOOL loginSDK;
    
    //只是为百度用的
    int requesetLoginPlatformCount;
}


- (NSString*) getPushAccout;

- (BOOL) readyForLogin;

- (void) initData;

- (void) initParmars;

- (void) initPlatform;
- (void) loginPlatform;
- (void) __login__;
- (void) loginoutPlatform;
- (void) payfor:(NSString*) buyInfo;
- (void) pause;
- (void) resume;

- (NSString*) getPlatformName;

- (void) loadExtra:(NSString*) data;

- (BOOL) application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation;
- (BOOL) application:(UIApplication *)application handleOpenURL:(NSURL *)url;
- (NSUInteger) application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window;
- (void) dealloc;
- (void)viewDidAppear:(BOOL)animated;

- (void) loginGame:(id) object;

- (void) didUnLoad;

- (void) viewDidLoad;

- (void) initPlatformSuccess;
- (void) loginPlatformSuccess;
- (void) loginGameSuccess;
- (void) payforPlatformSuccess;
- (void) payforPlatformSuccessButNeedQuery;
- (void) logoutPlatformSuccess;

//获取游戏版本号
- (const char*) getGameVersion;

//获取 TalkingData 渠道id
- (const char*) getTalkingDataChannelId;



- (void) showLoginWindow;
- (void) closeLoginWindow;


//--------------------- about push ----------------------------

- (void) initPushAlias:(NSString*) alias;
//--------------------- about push ----------------------------

//--------------------- about taklingData ----------------------------
- (void) registerTalkingData;
//--------------------- about taklingData ----------------------------

//---------------------------
- (NSString*) getOrderId;

-(NSString *)sendPost:(NSURL *)aUrl EnCode:(NSStringEncoding)aEncode PostInfo:(NSString *)ainfo;
@end
