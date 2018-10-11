//
//  DiskSpaceTool.m
//  hope
//
//  Created by yons on 15/8/4.
//
//

#import <Foundation/Foundation.h>
#import "DiskSpaceTool.h"

@implementation DisSpaceTool

static const int SIZE_KB = 1024;
static const int SIZE_MB = 1024 * SIZE_KB;
static const int SIZE_GB = 1024 * SIZE_MB;
static const int SIZE_TB = 1024 * SIZE_GB;


//手机剩余空间
+ (float) freeDiskSpaceInMB{
    struct statfs buf;
    long long freespace = -1;
    if(statfs("/var", &buf) >= 0){
        freespace = (long long)(buf.f_bsize * buf.f_bfree);
    }
    
    //return freespace;
    return freespace / SIZE_MB;
    //return [self humanReadableStringFromBytes:freespace];
    
}
//手机总空间
+ (float) totalDiskSpaceInBytes
{
    struct statfs buf;
    long long freespace = 0;
    if (statfs("/", &buf) >= 0) {
        freespace = (long long)buf.f_bsize * buf.f_blocks;
    }
    if (statfs("/private/var", &buf) >= 0) {
        freespace += (long long)buf.f_bsize * buf.f_blocks;
    }
    printf("%lld\n",freespace);
    //return freespace;
    return freespace / SIZE_MB;
    //return [self humanReadableStringFromBytes:freespace];
}

//遍历文件夹获得文件夹大小
+ (float) folderSizeAtPath:(NSString*) folderPath{
    NSFileManager* manager = [NSFileManager defaultManager];
    if (![manager fileExistsAtPath:folderPath]) return 0;
    NSEnumerator *childFilesEnumerator = [[manager subpathsAtPath:folderPath] objectEnumerator];
    NSString* fileName;
    long long folderSize = 0;
    while ((fileName = [childFilesEnumerator nextObject]) != nil){
        NSString* fileAbsolutePath = [folderPath stringByAppendingPathComponent:fileName];
        folderSize += [self fileSizeAtPath:fileAbsolutePath];
    }
    
    //return folderSize;
    return folderSize / SIZE_MB;
    //return [self humanReadableStringFromBytes:folderSize];
}

//单个文件的大小
+ (long long) fileSizeAtPath:(NSString*) filePath{
    NSFileManager* manager = [NSFileManager defaultManager];
    if ([manager fileExistsAtPath:filePath]){
        return [[manager attributesOfItemAtPath:filePath error:nil] fileSize];
    }
    return 0;
}

//计算文件大小
+ (NSString *)humanReadableStringFromBytes:(unsigned long long)byteCount
{
    float numberOfBytes = byteCount;
    int multiplyFactor = 0;
    
    NSArray *tokens = [NSArray arrayWithObjects:@"bytes",@"KB",@"MB",@"GB",@"TB",@"PB",@"EB",@"ZB",@"YB",nil];
    
    while (numberOfBytes > 1024) {
        numberOfBytes /= 1024;
        multiplyFactor++;
    }
    
    return [NSString stringWithFormat:@"%4.2f %@",numberOfBytes, [tokens objectAtIndex:multiplyFactor]];
}

@end