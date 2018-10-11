//
//  BaiduPlatform.h
//  hope_baidu
//
//  Created by yons on 15/8/24.
//
//

#import "IOSPlatform.h"

@interface TBTPlatform : IOSPlatform{
    
    
}

+ (void) registerPlatformEvent;

- (void) sdkInitFinished;

- (void) loginFinished;

- (void) didLogout;

- (void)leavedSDKPlatform:(NSNotification *)notification;

@end