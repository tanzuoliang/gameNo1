//
//  JsonParser.m
//  hope_baidu
//
//  Created by yons on 15/8/24.
//
//

#import <Foundation/Foundation.h>
#import "JsonParser.h"

@implementation JsonParser

static NSDictionary* dic = NULL;
static NSMutableDictionary* muteDic =  NULL;

+ (NSDictionary*) parser:(NSString*)jsonString
{
    NSData* jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    dic = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableLeaves error:nil];
    return dic;
}

+ (void) deleteJson
{
    [dic release];
}

+ (BOOL) has:(NSString*) key
{
    NSEnumerator *enumerator = [dic keyEnumerator];
    NSString* hasKey;
    
    while(hasKey = [enumerator nextObject])
    {
        if([key isEqualToString:hasKey])
        {
            return TRUE;
        }
    }
    
    return FALSE;
}

+ (NSString*) getNSStringByKey:(NSString*)key
{
    return [dic objectForKey:key];
}

+ (NSNumber*) getIntegerByKey:(NSString *)key
{
    return [dic objectForKey:key];
}

+ (NSString*)DataTOjsonString:(id)object
{
    NSString *jsonString = nil;
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:object
                                                       options:NSJSONWritingPrettyPrinted // Pass 0 if you don't care about the readability of the generated string
                                                         error:&error];
    if (! jsonData) {
        NSLog(@"Got an error: %@", error);
    } else {
        jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    }
    return jsonString;
}

+ (void) initJson
{
    muteDic = [[NSMutableDictionary alloc] init];
}

+ (void) addKey:(NSString*)key Value:(NSString*)value
{
    if(muteDic == NULL) [JsonParser initJson];
    
    [muteDic setObject:value forKey:key];
}

+ (const char*) getJsonStr
{
    const char* ret =  [[JsonParser DataTOjsonString:muteDic] cStringUsingEncoding:NSUTF8StringEncoding];
    [muteDic dealloc];
    muteDic = NULL;
    return ret;
}

+ (NSString*) toString:(NSInteger) i
{
    return [NSString stringWithFormat:@"%ld",(long)i];
}

+ (NSInteger) toInt:(NSString*) str
{
    return [str integerValue];
}

+ (const char*) toConst:(NSString*) str
{
    return [str cStringUsingEncoding:NSUTF8StringEncoding];
}

@end