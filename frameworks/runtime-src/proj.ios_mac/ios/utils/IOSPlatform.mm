//
//  IOSPlatform.m
//  hope_baidu
//
//  Created by yons on 15/8/24.
//
//

#import <Foundation/Foundation.h>
#import "IOSPlatform.h"
#include "SDKPlatform.h"
#import "PlatformManager.h"
#include "cocos2d.h"
//#import "XGPush.h"
//#import "XGSetting.h"

#define _IPHONE80_ 80000

@implementation IOSPlatform



//----------------------------------- about push-------------------------------
- (void)registerPushForIOS8{
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= _IPHONE80_
    
    //Types
    UIUserNotificationType types = UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert;
    
    //Actions
    UIMutableUserNotificationAction *acceptAction = [[UIMutableUserNotificationAction alloc] init];
    
    acceptAction.identifier = @"ACCEPT_IDENTIFIER";
    acceptAction.title = @"Accept";
    
    acceptAction.activationMode = UIUserNotificationActivationModeForeground;
    acceptAction.destructive = NO;
    acceptAction.authenticationRequired = NO;
    
    //Categories
    UIMutableUserNotificationCategory *inviteCategory = [[UIMutableUserNotificationCategory alloc] init];
    
    inviteCategory.identifier = @"INVITE_CATEGORY";
    
    [inviteCategory setActions:@[acceptAction] forContext:UIUserNotificationActionContextDefault];
    
    [inviteCategory setActions:@[acceptAction] forContext:UIUserNotificationActionContextMinimal];
    
    [acceptAction release];
    
    NSSet *categories = [NSSet setWithObjects:inviteCategory, nil];
    
    [inviteCategory release];
    
    
    UIUserNotificationSettings *mySettings = [UIUserNotificationSettings settingsForTypes:types categories:categories];
    
    [[UIApplication sharedApplication] registerUserNotificationSettings:mySettings];
    
    
    [[UIApplication sharedApplication] registerForRemoteNotifications];
#endif
}



- (void) registerTalkingData
{
//    NSURL *urlPushConfig = [[[NSBundle mainBundle] URLForResource:@"Info"
//                                                    withExtension:@"plist"] copy];
//    NSDictionary *dictPushConfig = [NSDictionary dictionaryWithContentsOfURL:urlPushConfig];
//    
//    [TalkingData setExceptionReportEnabled:YES];
//    NSString* channel_id = [dictPushConfig valueForKey:@"talkingData_channel"];
//    [TalkingData sessionStarted:@"7644F0A229A77D9ABA093C6053C161FE" withChannelId:channel_id];
}

- (void)registerPush{
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:(UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeSound)];
}

- (void) initPushDdidFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // register Push------------------
    
     NSURL *urlPushConfig = [[[NSBundle mainBundle] URLForResource:@"Info"
     withExtension:@"plist"] copy];
    NSDictionary *dictPushConfig = [NSDictionary dictionaryWithContentsOfURL:urlPushConfig];
    
    // 统一的写到这里就行了
        uint32_t app_id = [[dictPushConfig valueForKey:@"push_app_id"] intValue];
        NSString* app_key = [dictPushConfig valueForKey:@"push_app_key"];
//    uint32_t app_id = 2200136398;
//    NSString* app_key = @"IDQ2AQT6879N";
    
//    [XGPush startApp:app_id appKey:app_key];
////    [XGPush setAccount:self->pushAlias];
//    //注销之后需要再次注册前的准备
//    void (^successCallback)(void) = ^(void){
//        //如果变成需要注册状态
//        if(![XGPush isUnRegisterStatus])
//        {
//            //iOS8注册push方法
//#if __IPHONE_OS_VERSION_MAX_ALLOWED >= _IPHONE80_
//            
//            float sysVer = [[[UIDevice currentDevice] systemVersion] floatValue];
//            if(sysVer < 8){
//                [self registerPush];
//            }
//            else{
//                [self registerPushForIOS8];
//            }
//#else
//            //iOS8之前注册push方法
//            //注册Push服务，注册后才能收到推送
//            [self registerPush];
//#endif
//        }
//    };
//    
//    [XGPush initForReregister:successCallback];
    
    //[XGPush registerPush];  //注册Push服务，注册后才能收到推送
    
    
    //推送反馈(app不在前台运行时，点击推送激活时)
    //[XGPush handleLaunching:launchOptions];
    
    //推送反馈回调版本示例
//    void (^successBlock)(void) = ^(void){
//        //成功之后的处理
//        NSLog(@"[XGPush]handleLaunching's successBlock");
//    };
//    
//    void (^errorBlock)(void) = ^(void){
//        //失败之后的处理
//        NSLog(@"[XGPush]handleLaunching's errorBlock");
//    };
    
    //角标清0
    [[UIApplication sharedApplication] setApplicationIconBadgeNumber:0];
    
    //清除所有通知(包含本地通知)
    [[UIApplication sharedApplication] cancelAllLocalNotifications];
    
//    [XGPush handleLaunching:launchOptions successCallback:successBlock errorCallback:errorBlock];
    //-------------end register push code -----------------------------------------
}


- (NSString*) getPushAccout
{
    return self->pushAlias;
}

- (void) initPushAlias:(NSString*) alias;
{
    self->pushAlias = [alias copy];
    
    [self initPushDdidFinishLaunchingWithOptions:[PlatformManager getInstance].launchOptions];
}


- (void) registeraAlias:(NSString*) alias
{
//    [XGPush setAccount:alias];
}
//----------------------------------- about push-------------------------------


//获取游戏版本号
- (const char*) getGameVersion
{
    NSURL *urlPushConfig = [[NSBundle mainBundle] URLForResource:@"Info"
                                                    withExtension:@"plist"];
    NSDictionary *dictPushConfig = [NSDictionary dictionaryWithContentsOfURL:urlPushConfig];
    
    NSString* game_version = [dictPushConfig valueForKey:@"CFBundleVersion"];
    
    return  [JsonParser toConst:game_version];
}

//获取 TalkingData 渠道id
- (const char*) getTalkingDataChannelId
{
    NSURL *urlPushConfig = [[NSBundle mainBundle] URLForResource:@"Info"
                                                   withExtension:@"plist"];
    NSDictionary *dictPushConfig = [NSDictionary dictionaryWithContentsOfURL:urlPushConfig];
    
    NSString* game_version = [dictPushConfig valueForKey:@"talkingData_channel"];
    
    return  [JsonParser toConst:game_version];
}

- (void) initData
{
    
    self->isShowLoginWindow = FALSE;
    self->requesetLoginPlatformCount = 0;
    
    closeWindoCount = 0;
    [self initParmars];
    
    platformData = [PlatformData alloc];
    [platformData initData];
    
}

- (void) initPlatform
{
    
}

- (void) loginoutPlatform
{
    [self initParmars];
    
    //sdk::SDKPlatform::getInstance()->didLogout();
}

- (void) initParmars
{
    self->initSuccess = FALSE;
    self->requestLoginPlatform = FALSE;
}


- (BOOL) readyForLogin
{
    return self->initSuccess && self->requestLoginPlatform;
}

- (void) __login__
{
    self->isShowLoginWindow = TRUE;
}

- (void) loginPlatform
{
    NSLog(@"IOSPlatform.mm loginPlatform");
    self->requesetLoginPlatformCount++;
    if(self->requesetLoginPlatformCount == 0)return;
    
    self->requestLoginPlatform = TRUE;
    
    if(self->initSuccess)
    {
        //[self __login__];
        [self performSelectorOnMainThread:@selector(__login__) withObject:nil waitUntilDone:NO];
    }
}

- (void) payfor:(NSString*) buyInfo
{

}

- (void) pause
{
    
}

- (void) resume
{
    
}

- (void) loadExtra:(NSString*) data
{
    
}

- (void) initPlatformSuccess
{
    sdk::SDKPlatform::getInstance()->didInit();
    
    self->initSuccess = TRUE;
    if(self->requestLoginPlatform)
    {
       // [self __login__];
        [self performSelectorOnMainThread:@selector(__login__) withObject:nil waitUntilDone:NO];
    }
}

- (NSString*) getPlatformName
{
    return @"null";
}

- (void) loginPlatformSuccess
{
//    sdk::SDKPlatform::getInstance()->showRequestAnimation();
//    
//    NSThread* myThread = [[NSThread alloc] initWithTarget:self selector:@selector(loginGame:) object:nil];
//    [myThread start];
    [JsonParser addKey:@"token" Value:platformData->platform_token];
    [JsonParser addKey:@"username" Value:platformData->platform_uid];
    [JsonParser addKey:@"platform" Value:[self getPlatformName]];
    sdk::SDKPlatform::getInstance()->didLoginPlatform([JsonParser getJsonStr]);
    self->loginSDK = TRUE;
    NSLog(@"IOSPlatform.mm loginPlatformSuccess");
}


- (void) logoutPlatformSuccess
{
    self->loginSDK = FALSE;
    self->isShowLoginWindow = FALSE;
    self->requesetLoginPlatformCount = -1;
    sdk::SDKPlatform::getInstance()->didLogout();
}

- (void) checkSDKStatus
{
    
}

- (void) loginGameSuccess
{
    //sdk::SDKPlatform::getInstance()->didLogin([JsonParser toConst:platformData->game_uid], [JsonParser toConst:platformData->game_token]);
}

- (void) payforPlatformSuccess
{
    //[JsonParser addKey:@KEY_DIMONE Value:platformData->buyDimond];
    sdk::SDKPlatform::getInstance()->didPayment("");
    
}

- (void) payforPlatformSuccessButNeedQuery
{
    sdk::SDKPlatform::getInstance()->didPaymentButNeedQuery([JsonParser toConst:platformData->buyOrderId]);
}


- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
    return YES;
}

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
    return  YES;
}

- (NSUInteger) application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window
{
    return UIInterfaceOrientationMaskLandscape;
}

- (void) didUnLoad
{
    
}

- (void) dealloc
{
    [super dealloc];
}

- (void)viewDidLoad
{
    
}

- (void)viewDidAppear:(BOOL)animated
{
    
}

- (void) loginGame:(id) object
{
    NSString* keyValue = @"username=%@&token=%@&platform=tb";
    NSString* postInfo = [NSString stringWithFormat:keyValue,platformData->platform_uid,platformData->platform_token];
    
    NSLog(@"request login game server data is %@",postInfo);
    
    NSString* resultInfo = [self sendPost:[NSURL URLWithString:self->loginUrl] EnCode:NSUTF8StringEncoding PostInfo:postInfo];
    
    sdk::SDKPlatform::getInstance()->didLogin([JsonParser toConst:resultInfo]);
    sdk::SDKPlatform::getInstance()->hideRequestAnimation();
}

-(NSString *)sendPost:(NSURL *)aUrl EnCode:(NSStringEncoding)aEncode PostInfo:(NSString *)ainfo{
    //创建数据对象 是请求字符串转换成的数据对象
    NSData * qdata = [ainfo dataUsingEncoding:aEncode allowLossyConversion:YES];
    //获得发送的数据的长度（和后面的请求数据设定的长度保持一致）
    NSString * length = [NSString stringWithFormat:@"%lu",(unsigned long)[qdata length]];
    //创建请求对象
    NSMutableURLRequest * request = nil;
    //给创建的请求对象赋值
    request = [NSMutableURLRequest requestWithURL:aUrl cachePolicy:NSURLRequestReloadIgnoringCacheData timeoutInterval:120];
    //设定请求的参数
    //设置请求的方式
    [request setHTTPMethod:@"POST"];
    //设置请求的数据长度
    [request setValue:length forHTTPHeaderField:@"Content-Length"];
    //设置请求的数值的文件的格式 text/xml
    [request setValue:@"text/xml" forHTTPHeaderField:@"Content-Type"];
    //设置请求的内容（请求体数据）
    [request setHTTPBody:qdata];
    
    //创建服务端回应的对象
    NSHTTPURLResponse * response = nil;
    
    //创建向服务端发送请求 后服务端返回来的接受数据的对象
    NSData * pdata =[NSURLConnection sendSynchronousRequest:request returningResponse:&response error:nil];
    NSString * responseStr = [[NSString alloc]initWithData:pdata encoding:aEncode];
    return [responseStr autorelease];
    
}

- (NSString*) getOrderId
{
    
    return [JsonParser getNSStringByKey:@KEY_ORDERID];
//    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
//    NSString* ret = [NSString stringWithFormat:@"%@%08d", [formatter stringFromDate:[NSDate date]], arc4random() % 10000000];
//    [formatter release];
//    return ret;
}

//---------------------------------------------------
- (void) showLoginWindow
{
    self->isShowLoginWindow = TRUE;
    sdk::SDKPlatform::getInstance()->didShowLoginWindow();
}


- (void) closeLoginWindow
{
    closeWindoCount++;
    if(self->isShowLoginWindow == TRUE)
    {
        sdk::SDKPlatform::getInstance()->didHideLoginWindow();
        self->isShowLoginWindow = FALSE;
    }
}

@end
