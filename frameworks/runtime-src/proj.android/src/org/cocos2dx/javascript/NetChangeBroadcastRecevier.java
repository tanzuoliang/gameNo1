package org.cocos2dx.javascript;

import org.cocos2dx.javascript.platform.PlatformManager;
import org.cocos2dx.lib.Cocos2dxHelper;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.res.AssetManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.NetworkInfo.State;
import android.util.Log;
import android.widget.Toast;

public class NetChangeBroadcastRecevier extends BroadcastReceiver {

	/***
	 * �Ƿ�������
	 * **/
	private Boolean onNet = false;
	
	private int netStatusValue = 0;
	
	private int codeValue[] = {0,1};
	
	@Override
	public void onReceive(Context context, Intent arg1) {
		// TODO Auto-generated method stub
		//onNet = true;
		
		if(!Cocos2dxHelper.isActivityVisible())return;
		
		ConnectivityManager mgr = (ConnectivityManager)context.getSystemService(Context.CONNECTIVITY_SERVICE);
		if(mgr != null)
		{
			NetworkInfo[] infoList = mgr.getAllNetworkInfo();
			
			for(NetworkInfo info : infoList)
			{
				State state = info.getState();
				int value = info.getType();
				if(value > 1)continue;
				if(NetworkInfo.State.CONNECTED == state)
				{

					/**
					 *   // Field descriptor #31 I
  public static final int TYPE_MOBILE = 0;
  
  // Field descriptor #31 I
  public static final int TYPE_WIFI = 1;
					 */
					
					
										netStatusValue |= (int)Math.pow(2, value);
					int code = 10 + value;
					//Cocos2dxHelper.androidOnline(code);
					PlatformManager.callDataCppMethod(PlatformManager.NET_CHANGE, "" + code);
					
					Log.d("netchange", "netchnage" + value + "_" + info.getTypeName());
					//break;
				}
				else
				{
					int power = (int)Math.pow(2, value);
					if((netStatusValue & power) == power)
					{
						netStatusValue ^= power;
					}
					
				}
			}
			
			if(netStatusValue == 0)
			{
				//Toast.makeText(context, Language.NET_ERROR, Toast.LENGTH_LONG);
				PlatformManager.callDataCppMethod(PlatformManager.NET_CHANGE, "0");
			}
//			Cocos2dxHelper.android_on_line(onNet);
		}
	}

}
