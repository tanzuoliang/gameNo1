package org.cocos2dx.javascript.utils;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.LinkedList;
import java.util.List;

import org.cocos2dx.javascript.platform.PlatformManager;
import org.cocos2dx.lib.Cocos2dxHelper;

import android.app.Activity;
import android.content.Intent;

public class Gobal {

	/**
	 * 本地存储代码版本
	 * ***/
	public static int LOCAL_SAVE_VERSION = -1;
	
	public static String EXIT_TIME = "EXIT_TIME";
	
	public static final String CODE_VERSION = "CODE_KEY";
	
	public static final String DOWN_LOAD_PATH = "/code";
	
	public static final String DOWN_ASSET_PATH = "/download_n1";
	
	/**
	 * 是否更新到了新的代码资源
	 * */
	public static Boolean updateNewCode = false;
	
	public static final String PREFS_NAME = "Cocos2dxPrefsFile";
	
	/**
	 * 不要关心 不要动
	 * **/
	public static  Boolean initNativeCode = true;
	
	public static List<Activity> activityList = new LinkedList<Activity>();
	
	/**
	 * 是否使用本地程序（ 也就是apk原生里的so文件 如果没有代码更新地址则为true 否则为false）
	 * **/
	public static Boolean useLocalCode = false;
	
	public static int checkCode = 1;
	
	
	public static void writeLog(String info)
	{
		Boolean write = false;
//		if(write){
//			long time=System.currentTimeMillis();//long now = android.os.SystemClock.uptimeMillis();  
//	        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd+HH:mm:ss");  
//	        Date d1=new Date(time);  
//	        String t1=format.format(d1);
//	        
//			String path = "http://192.168.1.141/push/log/log.php?log=" + info + "&time=" + t1;
//			HttpTask task = new HttpTask(path, null);
//			task.execute();
//		}
		writeLog(info,write);
	}
	
	public static void writeLog(String info,Boolean write)
	{
		if(write)
		{
			long time=System.currentTimeMillis();//long now = android.os.SystemClock.uptimeMillis();  
	        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd+HH:mm:ss");  
	        Date d1=new Date(time);  
	        String t1=format.format(d1);
	        
			String path = "http://192.168.1.50/push/log/log.php?log=" + info + "&time=" + t1;
			HttpTask task = new HttpTask(path, null);
			task.execute();
		}
	}
	
	
	public static Boolean checkActivityValid(Activity c)
	{
		//category 分类; 分類; 种类;
		if(!c.isTaskRoot()) { 
            Intent mainIntent = c.getIntent(); 
            String action = mainIntent.getAction();
//            Boolean has_l = mainIntent.hasCategory(Intent.CATEGORY_LAUNCHER);
//            Boolean has_le = mainIntent.hasCategory(Intent.CATEGORY_DEFAULT);
//            Boolean e = action.equals(Intent.ACTION_MAIN);

//            if(!action.equals("lenovoid.MAIN"))
        	if(action != "lenovoid.MAIN")
        	{
        		c.finish();
            	return false;
        	}
        	
        }
        
        long time = System.currentTimeMillis();
        long lastTime = PlatformManager.getShared(c).getLong(Gobal.EXIT_TIME, 0l);
        long daltaTime = time - lastTime;
//        Toast.makeText( this, "daltaTime :" + daltaTime, Toast.LENGTH_SHORT ).show();
        if(daltaTime < 1000 && lastTime > 0l)
        {
        	c.finish();
        	return false;
        }
        
        return true;
	}
	
	
	
	//-----------------------------------
	/**
	 * 游戏的地址
	 */
	public static String GAME_URL = "";
	
}
