//
//  IOSiAP_Bridge.cpp
//  LongChengDaRen
//
//  Created by 白白 on 14-11-11.
//
//

#include "IOSiAP_Bridge.h"
#include "cocos2d.h"
//#include "CommonInclude.h"
//#include "UpdateCoins.h"
#include "SDKPlatform.h"
#import "MBProgressHUD+NJ.h"

USING_NS_CC;

IOSiAP_Bridge::IOSiAP_Bridge()
{
    iap = new IOSiAP();
    iap->delegate = this;
}

IOSiAP_Bridge::~IOSiAP_Bridge()
{
    delete iap;
}

void IOSiAP_Bridge::requestProducts(std::string id,std::string appInfo)
{
    productID = id;
    this->applicationusername = appInfo;
    std::vector<std::string> product;
    
    product.push_back("com.maple.hope.app.product1");//60
    product.push_back("com.maple.hope.app.product2");//vip
    product.push_back("com.maple.hope.app.product3");//980
    product.push_back("com.maple.hope.app.product4");//1980
    product.push_back("com.maple.hope.app.product5");//3280
    product.push_back("com.maple.hope.app.product6");//6480
	//把需要付费的道具的所有product id都放到容器里面传进去
    iap->requestProducts(product);
}

void IOSiAP_Bridge::onRequestProductsFinish(void)
{
    std::string identifier = "com.maple.hope.app.product" + productID;

    //必须在onRequestProductsFinish后才能去请求iAP产品数据。
    IOSProduct *product = iap->iOSProductByIdentifier(identifier);
    // 然后可以发起付款请求。,第一个参数是由iOSProductByIdentifier获取的IOSProduct实例，第二个参数是购买数量
    if(product)
        iap->paymentWithProduct(product, this->applicationusername,1);
    
    [MBProgressHUD hideHUD];
}

void IOSiAP_Bridge::onRequestProductsError(int code)
{
    //这里requestProducts出错了，不能进行后面的所有操作。
    log("付款失败");
//    [MBProgressHUD showError:@"付款失败"];
    [MBProgressHUD hideHUD];
}

void IOSiAP_Bridge::onPaymentEvent(std::string &identifier, IOSiAPPaymentEvent event, int quantity,std::string identifierId)
{
    
    if (event == IOSIAP_PAYMENT_PURCHAED) {
        //付款成功了，可以吧金币发给玩家了。
		//根据传入的参数就能知道购买的是哪种类型的金币
//        switch (productID) {
//            case 6:
//                
//                break;
//            case 18:
//               
//                break;
//            case 50:
//               
//                break;
//            case 98:
//               
//                break;
//            default:
//                break;
//        }
        
        if(identifier.length() > 0)
        {
            std::string ret = identifier + ":" + identifierId;
            sdk::SDKPlatform::getInstance()->didPaymentButNeedQuery(ret.c_str());
        }
        
        // 3.发送用户名和密码给服务器(走HTTP协议)
        // 创建一个URL ： 请求路径
//        NSString *urlStr = [NSString stringWithFormat:@"http://localhost:8080/MJServer/login?username=%@&pwd=%@",@"", @""];
//        NSURL *url = [NSURL URLWithString:urlStr];
//        
//        // 创建一个请求
//        NSURLRequest *request = [NSURLRequest requestWithURL:url];
//        //    NSLog(@"begin---");
//        
//        // 开启一个子线程发送一个异步请求，然后回到主线程在主线程当中执行下面大括号里面的代码刷新界面
//        // queue ：存放completionHandler这个任务  （任务是要存放到队列当中才能自动执行）
//        NSOperationQueue *queue = [NSOperationQueue mainQueue];  //mainQueue因为要刷新界面必须在主队列（也就是下面的大括号里面的代码就会在这个主队列当中执行
//        [NSURLConnection sendAsynchronousRequest:request queue:queue completionHandler:
//         ^(NSURLResponse *response, NSData *data, NSError *connectionError) {
//         // 这个block会在请求完毕的时候自动调用，在主线程当中执行
//         if (connectionError || data == nil) {  //只要有错误或者服务器返回的为nil，则请求失败
//         [MBProgressHUD showError:@"请求失败"];
//         return;
//         }
//         
//         // 解析服务器返回的JSON数据
//         NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:nil];
//         NSString *error = dict[@"error"];
//         if (error) {
//         // {"error":"用户名不存在"}
//         // {"error":"密码不正确"}
//         [MBProgressHUD showError:error];
//         } else {
//         // {"success":"登录成功"}
//         NSString *success = dict[@"success"];
//         [MBProgressHUD showSuccess:success];
//         }  
//         }];
        
    }
    //其他状态依情况处理掉。
}
