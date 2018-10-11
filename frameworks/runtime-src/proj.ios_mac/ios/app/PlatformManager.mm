//
//  PlatformManager.m
//  hope_baidu
//
//  Created by yons on 15/8/24.
//
//

#import <Foundation/Foundation.h>
#import "UIKit/UIImage.h"
#import "UIKit/UIFont.h"
#import "PlatformManager.h"
#import "TBTPlatform.h"
#import "cocos2d.h"
#include "platform/CCFileUtils.h"
#import "MBProgressHUD+NJ.h"
#import "platform/ios/CCEAGLView-ios.h"
#import <sys/sysctl.h>
#import <mach/mach.h>


static PlatformManager* _instance = NULL;

@implementation PlatformManager

+ (PlatformManager*) getInstance
{
    if(_instance == NULL)
    {
        _instance = [PlatformManager alloc];
    }
    
    return _instance;
}

- (IOSPlatform*) getPlatform
{
    return _platform;
}

-(void)setMultipleTouchEnabled:(NSInteger) st{
    auto view = cocos2d::Director::getInstance()->getOpenGLView();
    CCEAGLView *eaglview = (CCEAGLView *)view->getEAGLView();
    
    if(st == 1){
        [eaglview setMultipleTouchEnabled:YES];
    }
    else{
        [eaglview setMultipleTouchEnabled:NO];
    }

}

- (void) initPlatform
{
    self->_platformType = PLAT_APP_STORE;
    _platform = [TBTPlatform alloc];
    
    if(_platform)
    {
        [_platform initData];
        [_platform initPlatform];
    }
    
}

- (PLATFORM_TYPE) getPlatformType{
    return self->_platformType;
}

+ (int)getSignalStrength{
    UIApplication *app = [UIApplication sharedApplication];
    NSArray *subviews = [[[app valueForKey:@"statusBar"] valueForKey:@"foregroundView"] subviews];
    NSString *dataNetworkItemView = nil;
    
    for (id subview in subviews) {
        if([subview isKindOfClass:[NSClassFromString(@"UIStatusBarDataNetworkItemView") class]]) {
            dataNetworkItemView = subview;
            break;
        }
    }
    
    int signalStrength = [[dataNetworkItemView valueForKey:@"_wifiStrengthBars"] intValue];
    
    NSLog(@"signal %d", signalStrength);
    return signalStrength;
}

+(int) availableMemory{
    vm_statistics_data_t vmStats;
    mach_msg_type_number_t infoCount =HOST_VM_INFO_COUNT;
    kern_return_t kernReturn = host_statistics(mach_host_self(), HOST_VM_INFO, (host_info_t)&vmStats, &infoCount);
    
    if (kernReturn != KERN_SUCCESS)
    {
        return NSNotFound;
    }
    
    double vm_total = vmStats.wire_count + vmStats.active_count + vmStats.inactive_count + vmStats.free_count;
    double vm_wire = vmStats.wire_count;
    double vm_active = vmStats.active_count;
    double vm_inactive = vmStats.inactive_count;
    double vm_free = vmStats.free_count;
    double unit = (1024.0) * (1024.0);
    
    NSLog(@"Total Memory: %f", vm_total * vm_page_size / unit);
    NSLog(@"Wired Memory: %f", vm_wire * vm_page_size / unit);
    NSLog(@"Active Memory: %f", vm_active * vm_page_size / unit);
    NSLog(@"Inactive Memory: %f", vm_inactive * vm_page_size / unit);
    NSLog(@"Free Memory: %f", vm_free * vm_page_size / unit);
    
    int size =  (int)((vm_page_size * vmStats.free_count) / (1024 * 1024));
    
    return size;
}

/**
  保存图片到相册
 **/
+(void) saveImageToPhoto:(NSString*) fileName{
//    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
//    NSString *documentsDirectory = [paths objectAtIndex:0];
//    UIImage* image = [UIImage imageWithContentsOfFile:documentsDirectory];
//    if(image != nil){
//        UIImageWriteToSavedPhotosAlbum(image, nil, nil, nil);
//    }
    
    NSString* filePath = [NSHomeDirectory() stringByAppendingFormat:@"/Documents/%@", fileName];
    UIImage *viewImage = [UIImage imageWithContentsOfFile:filePath];
    if (viewImage != nil) {
        UIImageWriteToSavedPhotosAlbum(viewImage, nil, nil, nil);
        
        UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"alert" message:fileName delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
        [alertView show];
    }
}

+(NSString*) getSystemFont{
    
//    UIFont *newFont = [UIFontpreferredFontForTextStyle:UIFontTextStyleBody];
    UIFont *newFont = [UIFont systemFontOfSize:[UIFont systemFontSize]];
    return [newFont fontName];
}

+(NSString*) getLanguage{
    
    NSUserDefaults* defs = [NSUserDefaults standardUserDefaults];
    NSArray* languages = [defs objectForKey:@"AppleLanguages"];
    NSString* preferredLang = [languages objectAtIndex:0];
    return preferredLang;
//    std::string str = [preferredLang cStringUsingEncoding:NSUTF8StringEncoding];
//    return (char*)str.c_str();
}

+ (void) quitApp{
    [[[PlatformManager getInstance] getPlatform] quitApp];
}

+(void) alert:(NSString*)info{
//    [MBProgressHUD showError:info];
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"" message:info delegate:nil cancelButtonTitle:nil otherButtonTitles:@"确定", nil];
    [alert show];
}


@end
