//
//  DiskSpaceTool.h
//  hope
//
//  Created by yons on 15/8/4.
//
//

#import <Foundation/Foundation.h>
#include <sys/param.h>
#include <sys/mount.h>

@interface  DisSpaceTool

+ (float) freeDiskSpaceInMB;//手机剩余空间
+ (float) totalDiskSpaceInBytes;//手机总空间
+ (float) folderSizeAtPath:(NSString*) folderPath;//某个文件夹占用空间的大小

@end
