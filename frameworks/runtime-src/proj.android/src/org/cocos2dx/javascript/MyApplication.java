package org.cocos2dx.javascript;



//import java.util.Locale;

import org.cocos2dx.javascript.platform.PlatformManager;
import org.cocos2dx.javascript.platform.base.IPlatform;
import org.cocos2dx.javascript.utils.NetUtil;

//import com.tencent.bugly.crashreport.CrashReport;
//import com.tencent.bugly.crashreport.CrashReport.UserStrategy;

import android.app.Application;
//import android.content.res.Configuration;

public class MyApplication extends Application {

	
	@Override
	public void onCreate() {
		// TODO Auto-generated method stub
		NetUtil.init(this);
		IPlatform platform =  PlatformManager.createPlatform(this);
		if(platform != null)
		{
			platform.registerPlatformInfo(this);
		}
		super.onCreate();
		
//		UserStrategy strategy = new UserStrategy(getApplicationContext());
//		strategy.setAppChannel("test");  //设置渠道
//		strategy.setAppVersion("1.0");      //App的版本
//		strategy.setAppPackageName("com.tianyi.cubeWar");  //App的包名
//			
//		CrashReport.initCrashReport(getApplicationContext(), "53c884a523", true,strategy); 
//		String info = CrashReport.getBuglyVersion(getApplicationContext());
//		System.out.print(info);
		
//		Configuration config = getResources().getConfiguration();
//		config.locale = new Locale("th");
//		getResources().updateConfiguration(config, getResources().getDisplayMetrics());
		
		//com.yunva.im.sdk.lib.YvLoginInit.initApplicationOnCreate(this, "1000276");
		// STUDY

	}
	
	
	
}
