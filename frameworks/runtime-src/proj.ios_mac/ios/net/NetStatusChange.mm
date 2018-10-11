/*
     File: APLViewController.m
 Abstract: Application delegate class.
  Version: 3.5
 
 Disclaimer: IMPORTANT:  This Apple software is supplied to you by Apple
 Inc. ("Apple") in consideration of your agreement to the following
 terms, and your use, installation, modification or redistribution of
 this Apple software constitutes acceptance of these terms.  If you do
 not agree with these terms, please do not use, install, modify or
 redistribute this Apple software.
 
 In consideration of your agreement to abide by the following terms, and
 subject to these terms, Apple grants you a personal, non-exclusive
 license, under Apple's copyrights in this original Apple software (the
 "Apple Software"), to use, reproduce, modify and redistribute the Apple
 Software, with or without modifications, in source and/or binary forms;
 provided that if you redistribute the Apple Software in its entirety and
 without modifications, you must retain this notice and the following
 text and disclaimers in all such redistributions of the Apple Software.
 Neither the name, trademarks, service marks or logos of Apple Inc. may
 be used to endorse or promote products derived from the Apple Software
 without specific prior written permission from Apple.  Except as
 expressly stated in this notice, no other rights or licenses, express or
 implied, are granted by Apple herein, including but not limited to any
 patent rights that may be infringed by your derivative works or by other
 works in which the Apple Software may be incorporated.
 
 The Apple Software is provided by Apple on an "AS IS" basis.  APPLE
 MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION
 THE IMPLIED WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS
 FOR A PARTICULAR PURPOSE, REGARDING THE APPLE SOFTWARE OR ITS USE AND
 OPERATION ALONE OR IN COMBINATION WITH YOUR PRODUCTS.
 
 IN NO EVENT SHALL APPLE BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL
 OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 INTERRUPTION) ARISING IN ANY WAY OUT OF THE USE, REPRODUCTION,
 MODIFICATION AND/OR DISTRIBUTION OF THE APPLE SOFTWARE, HOWEVER CAUSED
 AND WHETHER UNDER THEORY OF CONTRACT, TORT (INCLUDING NEGLIGENCE),
 STRICT LIABILITY OR OTHERWISE, EVEN IF APPLE HAS BEEN ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
 
 Copyright (C) 2014 Apple Inc. All Rights Reserved.
 
 */

#import "NetStatusChange.h"
#include "cocos2d.h"
#include "platform/CCCommon.h"

@implementation NetStatusChange

static NetStatusChange* instance = nullptr;

- (void)startup
{
    /*
     Observe the kNetworkReachabilityChangedNotification. When that notification is posted, the method reachabilityChanged will be called.
     */
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(reachabilityChanged:) name:kReachabilityChangedNotification_1 object:nil];

    self->lastOnLineTag = 0;
    
    //Change the host name here to change the server you want to monitor.
    NSString *remoteHostName = @"www.baidu.com";
    //NSString *remoteHostLabelFormatString = NSLocalizedString(@"Remote Host: %@", @"Remote host label format string");
    
	self->hostReachability = [Reachability_ios reachabilityWithHostName:remoteHostName];
	[self->hostReachability startNotifier];
	[self updateInterfaceWithReachability:self->hostReachability];

    self->internetReachability = [Reachability_ios reachabilityForInternetConnection];
	[self->internetReachability startNotifier];
	[self updateInterfaceWithReachability:self->internetReachability];

    self->wifiReachability = [Reachability_ios reachabilityForLocalWiFi];
	[self->wifiReachability startNotifier];
	[self updateInterfaceWithReachability:self->wifiReachability];
    
    instance = self;
    
}


/*!
 * Called by Reachability whenever status changes.
 */
- (void) reachabilityChanged:(NSNotification *)note
{
	Reachability_ios* curReach = [note object];
	NSParameterAssert([curReach isKindOfClass:[Reachability_ios class]]);
	[self updateInterfaceWithReachability:curReach];
}


- (void)updateInterfaceWithReachability:(Reachability_ios *)reachability
{
    
    if (reachability == self->hostReachability)
	{
		
        //NetworkStatus netStatus = [reachability currentReachabilityStatus];
        BOOL connectionRequired = [reachability connectionRequired];
        
        NSString* baseLabelText = @"";
        
        if (connectionRequired)
        {
            baseLabelText = NSLocalizedString(@"Cellular data network is available.\nInternet traffic will be routed through it after a connection is established.", @"Reachability text if a connection is required");
        }
        else
        {
            baseLabelText = NSLocalizedString(@"Cellular data network is active.\nInternet traffic will be routed through it.", @"Reachability text if a connection is not required");
        }
    }
    
	if (reachability == self->internetReachability)
	{
        [self checkReachability:self->internetReachability];
	}

	if (reachability == self->wifiReachability)
	{
        [self checkReachability:self->wifiReachability];
	}
}


- (void) checkReachability:(Reachability_ios *)reachability
{
    NetworkStatus_ios netStatus = [reachability currentReachabilityStatus];
    BOOL connectionRequired = [reachability connectionRequired];
    BOOL onNetwork = YES;
    std::string info = "on";
    
    BOOL ingoreOffLine = NO;
    
    switch (netStatus)
    {
        case NotReachable:
        {
            connectionRequired = NO;
            onNetwork = NO;
            info = "off:0";
            
            if(reachability == self->internetReachability)
            {
                info = "off:0";
                //判定之前wifi是否有连上
                if((self->lastOnLineTag & 2) == 2)
                {
                    ingoreOffLine = YES;
                    self->lastOnLineTag ^= 2;
                }
            }
            else if(reachability == self->wifiReachability)
            {
                info = "off:1";
                //判定之前手机网络是否有连上
                if((self->lastOnLineTag & 1) == 1)
                {
                    ingoreOffLine = YES;
                    self->lastOnLineTag ^= 1;
                }
            }
            
            break;
        }
            
        case ReachableViaWWAN:
        {
            info = "on:0";
            self->lastOnLineTag |= 1;
            break;
        }
        case ReachableViaWiFi:
        {
            info = "on:1";
            self->lastOnLineTag |= 2;
            break;
        }
    }
    
    if(ingoreOffLine)return;
    
    //self->lastOnLineTag = 0;
    
   // connectNetwork = connectionRequired;
    
    cocos2d::EventCustom evt("netStatus");
    evt.setUserData((void*)info.c_str());
    
   // cocos2d::MessageBox(onNetwork?"网络连接成功":"断网了", "waring");
    
    cocos2d::Director::getInstance()->getEventDispatcher()->dispatchEvent(&evt);

}



- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self name:kReachabilityChangedNotification_1 object:nil];
    [super dealloc];
}

+ (int) getNetworkstatus
{
    return instance->lastOnLineTag;
}

@end
