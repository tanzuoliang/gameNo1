//
//  BaiduPlatform.m
//  hope_baidu
//
//  Created by yons on 15/8/24.
//
//

#import <Foundation/Foundation.h>
#import "TBTPlatform.h"
#include "cocos2d.h"
#include "SDKPlatform.h"
#include "SDKCallback.h"
#include "IOSiAP_Bridge.h"
#import "MBProgressHUD+NJ.h"
#import "LoginViewController.h"
#import "LoginViewController.h"

@interface TBTPlatform()
<
LoginDelegate
>
@end
@implementation TBTPlatform

- (void) initPlatform
{
//    [MBProgressHUD showMessage:@"数据加载中。。。。。。！"];
    [self sdkInitFinished];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(buyResponse) name:@"buyNotification" object:nil];
    
    
//    [self loginPlatform];
}


+ (void) registerPlatformEvent
{
    
}

-(void) buyResponse:(NSNotification*) notification{
    
}

- (void) sdkInitFinished{
    
    [self initPlatformSuccess];
}

#pragma mark
- (void) __login__
{
    [super __login__];
    
    UIView* curerntView = [[UIApplication sharedApplication].windows lastObject];
    
    LoginViewController* controller = [[LoginViewController alloc] init];
    controller.delegate = self;
    UIView* subView =  [controller view];
    
    [curerntView addSubview:subView];
    
    

}

-(void) loginResponse:(LoginResponse*) res{
    
    if([res.ret isEqualToString:@"success"]){
        platformData->platform_token =res.token;
        platformData->platform_uid = res.uid;
        
        [self loginPlatformSuccess];
        
    }

//    [self testBuy];
}

- (void) loginFinished
{
    }

- (void) loginoutPlatform
{
//    exit(0);
    [self didLogout];
    
}



- (void) didLogout
{
    [self logoutPlatformSuccess];
}

/**
 * 离开平台
 *
 * @param notification */
- (void)leavedSDKPlatform:(NSNotification *)notification
{
    
    [self closeLoginWindow];
}

//-(void) testBuy{
//    if(![NSThread isMainThread]){
//        [self performSelectorOnMainThread:@selector(testBuy) withObject:nil waitUntilDone:nil];
//        return;
//    }
//    else{
//        [MBProgressHUD showMessage:@"" toView:[[UIApplication sharedApplication].windows lastObject]];
//        
//        
//    }
//    
//    IOSiAP_Bridge* bridge = new IOSiAP_Bridge();
//    bridge->requestProducts("1");
//   }

- (void) payfor:(NSString*) buyInfo
{
//    [MBProgressHUD showMessage:@"" toView:[[UIApplication sharedApplication].windows lastObject]];
    [JsonParser parser:buyInfo];
    
//    platformData->buyDimond = [JsonParser getNSStringByKey:@KEY_DIMONE];
//    std::string gid = [JsonParser toConst:[JsonParser getNSStringByKey:@KEY_GOODS_ID]];
//    IOSiAP_Bridge* bridge = new IOSiAP_Bridge();
//    bridge->requestProducts(gid,[JsonParser toConst:[JsonParser getNSStringByKey:@KEY_ORDERID]]);
    //ios
    NSString* ret = [NSString stringWithFormat:@"test|%@",[JsonParser getNSStringByKey:@"payId"]];

    sdk::SDKPlatform::getInstance()->didPaymentButNeedQuery([ret cStringUsingEncoding:NSUTF8StringEncoding]);
    
    
    
//    int payRMB = (int)[platformData->buyDimond intValue];
//    //payRMB = 1;
//    
//    NSString* extData = [JsonParser getNSStringByKey:@KEY_EXTRA];
    
}

- (BOOL) openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication
{
    return TRUE;
}


- (NSString*) getPlatformName
{
    return @"tianyi";
}

- (void) resume
{
    
}

- (void) pause
{
    
}

- (void) didUnLoad
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (NSUInteger) application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window
{
    return UIInterfaceOrientationMaskLandscape;
}
     
@end
