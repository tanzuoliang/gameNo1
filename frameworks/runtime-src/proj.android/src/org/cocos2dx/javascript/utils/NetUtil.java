package org.cocos2dx.javascript.utils;

import android.app.ActivityManager;
import android.app.ActivityManager.MemoryInfo;
import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.NetworkInfo.State;
import android.text.format.Formatter;

public class NetUtil {
	
	
	private static Context context = null;
	
	public static void init(Context ct)
	{
		context = ct;
	}
	
	 /**
     * 检测网络是否可用
     * @return
     */
//    public static boolean isNetworkConnected() {
//        ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
//        NetworkInfo ni = cm.getActiveNetworkInfo();
//        return ni != null && ni.isConnectedOrConnecting();
//    }
    
    public static boolean isNetworkConnected() {
        if (context != null) {
            ConnectivityManager mConnectivityManager = (ConnectivityManager) context
                    .getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo mNetworkInfo = mConnectivityManager
                    .getActiveNetworkInfo();
            if (mNetworkInfo != null) {
                return mNetworkInfo.isAvailable();
            }
        }
        return false;
    }

    /**
     * 获取当前网络类型
     * @return 0：没有网络   1：WIFI网络   2：WAP网络    3：NET网络
     */
    
    public static final int NETTYPE_WIFI = 0x01;
    public static final int NETTYPE_CMWAP = 0x02;
    public static final int NETTYPE_CMNET = 0x03;
    public static int getNetworkType() {
        int netType = 0;
        ConnectivityManager connectivityManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
        if (networkInfo == null) {
            return netType;
        }        
        int nType = networkInfo.getType();
        if (nType == ConnectivityManager.TYPE_MOBILE) {
            String extraInfo = networkInfo.getExtraInfo();
 
            if(!extraInfo.isEmpty()){
                if (extraInfo.toLowerCase().equals("cmnet")) {
                    netType = NETTYPE_CMNET;
                } else {
                    netType = NETTYPE_CMWAP;
                }
            }
        } else if (nType == ConnectivityManager.TYPE_WIFI) {
            netType = NETTYPE_WIFI;
        }
        return netType;
    }
    
    
    /**
     * 当前是否是wifi状态
     * @return
     */
    public static Boolean isWifiStatus(){
    	return getNetworkType() == NETTYPE_WIFI;
    }
    
    
    static final int SIZE_KB = 1024;
    static final int SIZE_MB = 1024 * SIZE_KB;
    static final int SIZE_GB = 1024 * SIZE_MB;
    static final int SIZE_TB = 1024 * SIZE_GB;
    
    public static int validMemoryInKB()
    {
    	ActivityManager am = (ActivityManager)context.getSystemService(Context.ACTIVITY_SERVICE);
    	MemoryInfo mi = new MemoryInfo();
    	am.getMemoryInfo(mi);
    	return 1 + (int)mi.availMem >> 10;
    }
    
    public static float remainMemory()
    {
    	ActivityManager am = (ActivityManager)context.getSystemService(Context.ACTIVITY_SERVICE);
    	MemoryInfo mi = new MemoryInfo();
    	am.getMemoryInfo(mi);
    	return mi.availMem / SIZE_MB;
    }
    
    
}
