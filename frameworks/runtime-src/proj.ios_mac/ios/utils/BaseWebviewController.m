//
//  LoginViewController.m
//  hope_app
//
//  Created by user-pc on 16/2/17.
//
//

#import <Foundation/Foundation.h>
#import "BaseWebviewController.h"
#import "MBProgressHUD+NJ.h"


@interface BaseWebviewController()<UIWebViewDelegate>
@end


@implementation LoginResponse

@end

@implementation BaseWebviewController


-(void) initWebviewWidth:(CGFloat)width height:(CGFloat)height{
    
//    CGFloat scale = [[UIScreen mainScreen] scale];
//    NSLog(@"scale = %f",scale);
    NSLog(@"width = %f",[UIScreen mainScreen].bounds.size.width);
    CGFloat _w = [UIScreen mainScreen].bounds.size.width;
    CGFloat _h = [UIScreen mainScreen].bounds.size.height;
//    CGFloat scale = _w  / 1024;
    NSLog(@"height = %f",[UIScreen mainScreen].bounds.size.height);
    CGFloat _x = (_w - width) / 2;
    CGFloat _y = (_h - height) / 2;
    
    _myWebView = [[UIWebView alloc] initWithFrame:CGRectMake(_x, _y, width, height)];
    if(_w < 1024){
        
        _myWebView.transform = CGAffineTransformScale(_myWebView.transform, 0.7,0.7);
    }
    [_myWebView setBackgroundColor:[UIColor clearColor]];
    _myWebView.backgroundColor = [UIColor clearColor];
    _myWebView.opaque = NO;
    
    _myWebView.delegate = self;
    
    [self.view addSubview:_myWebView];
}

-(void) addJavaScriptInterface:(NSString*) code{
    jsContext = [self.myWebView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
    [jsContext evaluateScript:code];
    
}

-(void) loadHtml:(NSString*)html{
    
    [MBProgressHUD showMessage:@"请稍候" toView:self.view];
    NSURL* url = [NSURL URLWithString:html];
    NSURLRequest* req = [NSURLRequest requestWithURL:url];
    [_myWebView loadRequest:req];
}



#pragma mark --webViewDelegate
-(BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{

//    NSString *urlstr = request.URL.absoluteString;
//    NSRange range = [urlstr rangeOfString:@"ios://jwzhangjie"];
//    if (range.length!=0) {
//        NSLog(@"request path = %@",urlstr);
//        [_myWebView removeFromSuperview];
//        [[self view] removeFromSuperview];
//        
//        
//        return NO;
//    }
//    
//    //retrun YES 表示正常加载网页 返回NO 将停止网页加载
    return YES;
}

-(void)webViewDidStartLoad:(UIWebView *)webView
{
    //开始加载网页调用此方法
    NSLog(@"webViewDidStartLoad");
}

-(void)webViewDidFinishLoad:(UIWebView *)webView
{
    NSLog(@"webViewDidFinishLoad");
    [MBProgressHUD hideHUDForView:[self view]];
}

-(void) closeWebview{
    [_myWebView removeFromSuperview];
    [[self view] removeFromSuperview];
}

-(void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
    //网页加载失败 调用此方法
    NSLog(@"didFailLoadWithError");
}
@end