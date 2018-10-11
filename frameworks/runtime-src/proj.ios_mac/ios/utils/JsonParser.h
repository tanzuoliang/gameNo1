//
//  JsonParser.h
//  hope_baidu
//
//  Created by yons on 15/8/24.
//
//

/**
 *
 *外理json数据
 */
@interface JsonParser : NSObject{
    
}

+ (NSDictionary*) parser:(NSString*)jsonString;
+ (void) deleteJson;
+ (NSString*) getNSStringByKey:(NSString*)key;
+ (NSNumber*) getIntegerByKey:(NSString*)key;
+ (NSString*)DataTOjsonString:(id)object;

+ (void) initJson;
+ (void) addKey:(NSString*)key Value:(NSString*)value;
+ (const char*) getJsonStr;

+ (NSString*) toString:(NSInteger) i;

+ (NSInteger) toInt:(NSString*) str;

+ (const char*) toConst:(NSString*) str;

+ (BOOL) has:(NSString*) key;

@end
