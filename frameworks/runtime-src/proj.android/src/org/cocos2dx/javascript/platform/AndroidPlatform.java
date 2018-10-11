package org.cocos2dx.javascript.platform;

import java.io.BufferedInputStream;
import java.io.FilterOutputStream;
import java.util.HashMap;

import org.cocos2dx.javascript.platform.base.BasePlatform;
import org.cocos2dx.javascript.platform.base.IPlatform;
import org.cocos2dx.javascript.utils.JSONParser;

import com.tianyi.cubeWar.R;

//import com.iapppay.interfaces.callback.IPayResultCallback;
//import com.iapppay.sdk.main.IAppPay;
//import com.iapppay.sdk.main.IAppPayOrderUtils;


import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.WebChromeClient;
import android.webkit.WebView;


public class AndroidPlatform extends BasePlatform implements IPlatform {

	
	private static final int EVENT_LOGIN					= 	1;
	
	private static final int EVENT_CREATE_FLOAT_BUTTON		=	2;
	
	private static final int EVENT_SHOW_FLOAT_BUTTION		=	3;
	
	private static final int EVENT_DESTORY_FLOAT_BUTTON		=	4;
	
	private static final int EVENT_LOGOUT					=	5;
	
	private static final int CHECK_WORKNET					=	6;
	
//	private Boolean initSdk = false;
//	
//	private Boolean customCallLoginRequest = false;
	
	private Handler handler = new Handler()
	{
		public void handleMessage(android.os.Message msg) 
		{
			switch(msg.what)
			{
			case EVENT_LOGIN:

				break;
			case EVENT_CREATE_FLOAT_BUTTON:
				break;
			case EVENT_SHOW_FLOAT_BUTTION:
				break;
			case EVENT_DESTORY_FLOAT_BUTTON:
				break;
			case EVENT_LOGOUT:
				break;
			case CHECK_WORKNET:
				break;
			}
			
		};
	};
	
	private void sendMessage(int what)
	{
		handler.sendEmptyMessage(what);
	}
	
	@Override
	public void registerPlatformInfo(Context context) {
		// TODO Auto-generated method stub
		this.app_id = "202359616";
		this.app_key = "68d9446358bd312b12ffbae1fe520bb5";
		this.app_secret = "2e371df822503cd74b6b5a687217ebf5";
		this.sourceNoticePath = "http://pay.anysdk.com/v5/QihuPayNotice/qihuPayNotice/";
		this.loginCheckPath = "http://mi.hope.maple-game.com:8090/service.php?m=Anysdk&a=login";
		this.payNoticePath = "http://mi.hope.maple-game.com:8090/service.php?m=Anysdk&a=pay";		
	}
	
	
	@Override
	public void initPlatform(Activity context) {
		// TODO Auto-generated method stub
		this.context = context;
		//IAppPay.init(this.context, IAppPay.PORTRAIT, PayConfig.appid);
//		this.loginPlatformSuccess();
		this.initSuccessful();
//		this.loginPlatform();
	}

	@Override
	protected void __login__() {
		// TODO Auto-generated method stub
		super.__login__();
		PlatformManager.showLoginView = true;
		
		Intent i = new Intent(this.context, LoginActivity.class);
		this.context.startActivity(i);
		
		LoginActivity.res = new LoginActivity.Response(){
			@Override
			public void result(String info) {
				// TODO Auto-generated method stub
				String[] list = info.split(":");
				platformData.platform_uid = list[1];
				platformData.platform_token = list[2];
				AndroidPlatform.this.loginPlatformSuccess();
				PlatformManager.showLoginView = false;
			}
		};
		
	}

	@Override
	public void loginPlatform() {
		// TODO Auto-generated method stub
		super.loginPlatform();
	}
	
	@Override
	public void logoutPlatform() {
		super.logoutPlatform();

	}

	
//	final IPayResultCallback payListener = new IPayResultCallback() {
//		
//		@Override
//		public void onPayResult(int arg0, String arg1, String arg2) {
//			// TODO Auto-generated method stub
//			
//		}
//	};
	
	private String payInfo = "";
	@Override
	public void payfor(String jsonStr) {
		// TODO Auto-generated method stub
		buyJson = new JSONParser(jsonStr);
		
		HashMap<String, String> buyMap = new HashMap<String, String>();
		for (String data : buyJson.getStringByKey("extra").split("\\|"))
		{
			String[] list = data.split(":");
			buyMap.put(list[0], list[1]);
		}
//		
//		IAppPayOrderUtils orderUtils = new IAppPayOrderUtils();
//		orderUtils.setAppid(PayConfig.appid);
//		int shop_id = Integer.parseInt(buyMap.get("shopId"));
//		orderUtils.setWaresid(shop_id);
//		orderUtils.setCporderid(buyJson.getStringByKey("orderId"));
//		orderUtils.setAppuserid(buyJson.getStringByKey("role_id"));
//		float dimond = (float)Integer.parseInt(buyJson.getStringByKey("dimond"));
//		orderUtils.setPrice(dimond);//���浣� ���
//		orderUtils.setWaresname(buyJson.getStringByKey("g_name"));//寮���句环��煎��绉�(��ㄦ�峰�����瀹�涔�锛�濡����涓�浼�浠ュ����伴��缃�涓哄��)
//		orderUtils.setCpprivateinfo("");
//		payInfo =  orderUtils.getTransdata(PayConfig.privateKey);
//		
//		this.context.runOnUiThread(new Runnable() {
//			
//			@Override
//			public void run() {
//				// TODO Auto-generated method stub
//				IAppPay.startPay(AndroidPlatform.this.context , payInfo,payListener);
//			}
//		});
	}

	@Override
	public void payforCallBack() {
		// TODO Auto-generated method stub

	}
	
	@Override
	public void onDestory() {
		// TODO Auto-generated method stub
		
	}

    public void onPause() {
    // TODO Auto-generated method stub
    	super.onPause();

    }

    @Override
    public void onResume() {
    	super.onResume();
    }

    @Override
    public void submitExtendData(String jsonStr) {
    // TODO Auto-generated method stub

    }
    
    //----------------------------- about R ----------------------------------
    public int getDrawable(String id) {
    	// TODO Auto-generated method stub
    	if(id == "icon")
    		return R.drawable.icon;
    	else if(id == "startup")
    		return R.drawable.startup;
    	return 0;
    }
    
    public int getLayout(String id)
    {
    	if(id == "mainlayout")
    		return R.layout.mainlayout;
    	else if(id == "notice")
    		return 0;
		return 0;
		
		
    }
    //----------------------------- about R ----------------------------------

	@Override
	public void onStop() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void exitGame() {
		// TODO Auto-generated method stub
		this.showExitPanel();
	}

	@Override
	public void onKeyDown(int keyCode, KeyEvent event) {
		// TODO Auto-generated method stub
		 super.onKeyDown(keyCode, event);
		
	}
}

