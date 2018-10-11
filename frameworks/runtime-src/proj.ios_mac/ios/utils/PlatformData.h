
@interface PlatformData : NSObject {
@public
    
    NSString* platform_nickName;
    NSString* platform_uid;
    NSString* platform_token;
    
    NSString* game_uid;
    NSString* game_token;
    
    NSString* game_json_str;
    
    NSString* buyDimond;
    
    NSString* buyOrderId;
    
    NSString* appStoreIdentifier;
}

-(void) initData;

@end