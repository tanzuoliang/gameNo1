//
//  LoginViewController.m
//  hope_app
//
//  Created by user-pc on 16/2/17.
//
//

#import <Foundation/Foundation.h>
#import "LoginViewController.h"
#import "MBProgressHUD+NJ.h"
#import "JsonParser.h"
#import "PlatformManager.h"
//#define PATH_   @"http://182.254.155.127:8020/?m=open"
#define PATH_   @"http://192.168.1.240:8020/?m=open"
//#define PATH_   @"http://192.168.1.240:9007/index.php?m=User"

#define SRTORE_KEY   @"UNIQUE_ID"

@interface LoginViewController()<UIWebViewDelegate>
@end

//static NSString* PATH_;

@implementation LoginViewController


-(NSString*) getPath{
    NSString* _path = [[NSBundle mainBundle] pathForResource:@"platform" ofType:@"json"];
    NSString* _context = [NSString stringWithContentsOfFile:_path encoding:NSUTF8StringEncoding error:nil];
    NSData* jsonData = [_context dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary* dic = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableLeaves error:nil];
    return [dic objectForKey:@"sdk_loginUrl"];
    //NSArray *l = [[dic objectForKey:@"game_loginUrl"] componentsSeparatedByString:@":"];
    //return [NSString stringWithFormat:@"%@:%@:8020/?m=open",[l objectAtIndex:0],[l objectAtIndex:1]];
}

-(void) viewDidLoad{
    
//    jsContext = [[JSContext alloc] init];
//    jsContext[@"callIOS"] = ^(NSString* str){
//        [self callFromJS:str];
//    };
    /*
     
     [UIScreen mainScreen] scale]详解
     
     当屏幕分别为640x940时[[UIScreen mainScreen] scale]=2.0
     
     当屏幕分别为320x480时[[UIScreen mainScreen] scale]=1.0
     
     由于iphone 早起的设备都是屏幕分辨率是320*480
     
     后来apple 在iPhone 4中采用了名为Retina的显示技术，iPhone
     4采用了960x640像素分辨率的显示屏幕，相当于iPad屏幕78%的像素 。由于屏幕大小没有变化，还是3.5
     
     */
//    CGSize size = [UIScreen mainScreen].bounds.size;
//    CGFloat s = [[UIScreen mainScreen] scale];
//    int padding = 100;
    
    
    [self initWebviewWidth:600 height:420];
    [self loadHtml:[self getPath]];
    [self addJavaScriptInterface:@"var  jsPlugin = {};jsPlugin.callGame = function(info){callGame(info);}; jsPlugin.getClientId = function(){return getClientId();}; jsPlugin.setClientId = function(id){setClientId(id);}; jsPlugin.openKeyboard=function(){};jsPlugin.hideKeyboard=function(){};"];
    
    
    jsContext[@"callGame"] = ^(NSString* str){
        
        [self callFromJS:str];
    };
    
    jsContext[@"getClientId"] = ^(){
        NSString* uName = [[NSUserDefaults standardUserDefaults] stringForKey:SRTORE_KEY];
        return uName;
    };
    
    jsContext[@"setClientId"] = ^(NSString* uName){
        [[NSUserDefaults standardUserDefaults] setValue:uName forKey:SRTORE_KEY];
        [[NSUserDefaults standardUserDefaults] synchronize];
    };
    
    jsContext[@"alert"] = ^(NSString* info){
        [PlatformManager alert:info];
    };
    
    
}


-(void) callFromJS:(NSString*) data{
    
    NSArray* infolist = [data componentsSeparatedByString:@":"];
    NSString* action = [infolist objectAtIndex:0];
    if([action isEqualToString:@"1"]){//
        
        LoginResponse* res =  [[LoginResponse alloc] init];
        res.ret = @"success";
        res.token = [infolist objectAtIndex:2];
        res.uid = [infolist objectAtIndex:1];
        [[self delegate] loginResponse:res];
        [res release];
        [self performSelectorOnMainThread:@selector(closeWebview) withObject:nil waitUntilDone:NO];
        
    }
    else if([action isEqualToString:@"login_c"]){//游客模式
        
    }
    
    NSLog(@"get from js info is %@",data);
}

-(void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
    [self loadHtml:[self getPath]];
}

@end
