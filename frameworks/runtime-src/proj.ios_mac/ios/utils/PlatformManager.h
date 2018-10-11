//
//  PlatformManager.h
//  hope_baidu
//
//  Created by yons on 15/8/24.
//
//

#import "IOSPlatform.h"

typedef enum{
    PLAT_BAIDU,
    PLAT_PP,
    PLAT_TB,
    PLAT_NULL,
    PLAT_ITOOLS,
    PLAT_IF,
    PLAT_XY,
    PLAT_APP_STORE
}PLATFORM_TYPE;


@interface PlatformManager : NSObject {
    
    IOSPlatform* _platform;
    PLATFORM_TYPE _platformType;
}

@property (nonatomic, assign) UIViewController *rootViewController;
@property (nonatomic, assign) NSDictionary *launchOptions;
@property (nonatomic, assign) NSString *pushAccout;

+ (PlatformManager*) getInstance;

- (void) initPlatform;
- (IOSPlatform*) getPlatform;

- (PLATFORM_TYPE) getPlatformType;

@end
