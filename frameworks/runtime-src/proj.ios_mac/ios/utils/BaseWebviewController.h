//
//  LoginViewController.h
//  hope_app
//
//  Created by user-pc on 16/2/17.
//
//

#import <UIKit/UIKit.h>
#import <JavaScriptCore/JavaScriptCore.h>
#import <Foundation/Foundation.h>


@interface LoginResponse : NSObject

// success
@property(nonatomic,assign) NSString* ret;
@property(nonatomic,assign) NSString* token;
@property(nonatomic,assign) NSString* uid;
@end

@protocol LoginDelegate
-(void) loginResponse:(LoginResponse*) res;
@end


@interface BaseWebviewController : UIViewController {
//    UIWebView* myWebView;
    JSContext* jsContext;
    
    
}

//初始化网页组件 
-(void) initWebviewWidth:(CGFloat) width height:(CGFloat) height;

//加载网页内容
-(void) loadHtml:(NSString*)html;

//注册js方法
-(void) addJavaScriptInterface:(NSString*) code;

//删除网页
-(void) closeWebview;

@property(nonatomic,assign)UIWebView* myWebView;
@property(nonatomic, assign) id <LoginDelegate> delegate;

@end
