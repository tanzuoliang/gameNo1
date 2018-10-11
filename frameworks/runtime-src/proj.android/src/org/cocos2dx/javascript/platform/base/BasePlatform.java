package org.cocos2dx.javascript.platform.base;

import java.io.BufferedReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.javascript.platform.PlatformManager;
import org.cocos2dx.javascript.platform.base.data.LoginError;
import org.cocos2dx.javascript.platform.base.data.PlatformData;
import org.cocos2dx.javascript.utils.JSONParser;
import org.json.JSONObject;


import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager.NameNotFoundException;
import android.util.Log;
import android.view.KeyEvent;

public class BasePlatform
{
	
	/**
	 * ������id
	 */
	protected String app_id;
	
	/**
	 * 
	 */
	protected String app_key;
	
	/**
	 * 
	 */
	protected String app_secret;
	
	/**
	 * ������������������
	 */
	protected String sourceNoticePath;
	
	/**
	 * ������������������
	 */
	protected String loginCheckPath;
	
	/**
	 * ������������������
	 */
	protected String payNoticePath;
	
	/**
	 * ������������������������������������������������
	 */
	protected Boolean autoLoginSwitch = false;
	
	/**
	 * ���������������
	 */
	protected Activity context;
	
	/**
	 * ������������
	 */
	protected PlatformData platformData = new PlatformData();
	
	protected PlatformData tempPlatformData = new PlatformData();
	
	/**
	 * 请求登录
	 */
	public static final String STATE_REQ_LOG = "STATE_REQ_LOG";
	
	public static final String STATE_LOG_OUT = "stateLogout";
	
	public static final String STATE_LOG_IN  = "stateLogin";
	
	public static final String STATE_INIT = "stateInit";
	
	
	protected String sdkState = "";
	
	/**
	 * ������������������������ ������������������������ json���������������
	 */
	protected JSONParser buyJson = null;
	//----------------------------- about login ----------------------------------
//	protected void loginFail(int code)
//	{
//		
//		PlatformManager.sendMessage(PlatformManager.LOGIN_PLAT_FAIL, new LoginError(code));
//	}
//	
//	protected void loginCancel()
//	{
//		PlatformManager.sendMessage(PlatformManager.LOGIN_PLAT_CANCEL);
//	}
//	
//	protected void loginSucessful()
//	{
//		PlatformManager.sendMessage(PlatformManager.LOGIN_PLAT_SUCCESS);
//	}
//	
//	protected void onLogining()
//	{
//		PlatformManager.sendMessage(PlatformManager.LOGIN_DOING);
//	}
//	
	
	protected JSONParser callJson = null;
	
	public void callFromNative(String cmd)
	{
		callJson = new JSONParser(cmd);
	}
	//----------------
	Runnable runable = new Runnable() {
		
		@Override
		public void run() {
			// TODO Auto-generated method stub
			__login__();
		}
	};
	
	protected Boolean initSuccess = false;
	public void initSuccessful()
	{
//		PlatformManager.callVoidCppMethod(PlatformManager.didInit);
		this.initSuccess = true;
		if(this.requestLoginPlatform)
		{
			this.context.runOnUiThread(runable);
		}
		
		this.sdkState = STATE_INIT;
	}
	
	protected String getAppName()
	{
		return PlatformManager.getApplicationName();
//		return Language.APP_NAME;
	}
	
	protected void __login__()
	{
		this.isShowLoginWindiow = true;
	}
	
	protected Boolean requestLoginPlatform = false;
	protected int requestLoginWindowCount = 0;
	
	
//	/**
//	 * ���������������������������������������������sdk
//	 */
//	protected Boolean isFirstloginSDKWhenEnterToGame = true;
	
	protected Boolean isLoginSDk()
	{
		platformData.showInfo();
		return (platformData.platform_token != "" || platformData.platform_uid != "");
//		return !isFirstloginSDKWhenEnterToGame && (platformData.platform_token != "" || platformData.platform_uid != "");
	}
	
	private Long lastLoginTime = 0l;
	
	protected void loginPlatform()
	{
		/**
		 * tempPlatformData.platform_token = authtoken;
				tempPlatformData.platform_uid = openid;
				tempPlatformData.platform_user_name = name;
		 */
		this.sdkState = STATE_REQ_LOG;
		if(tempPlatformData.hasData())
		{
			platformData.platform_token = tempPlatformData.platform_token;
			platformData.platform_uid = tempPlatformData.platform_uid;
			platformData.platform_user_name = tempPlatformData.platform_user_name;
			tempPlatformData.init();
			this.context.runOnUiThread(new Runnable() {
				
				@Override
				public void run() {
					// TODO Auto-generated method stub
					loginPlatformSuccess();
				}
			});
			return;
		}
		
//		if(isLoginSDk())return;
		/**
		 * ���������������������������������
		 */
		Long curTime = System.currentTimeMillis();
		Long costTime = curTime - lastLoginTime;
		lastLoginTime = curTime;
//		Log.d("BasePlatform", "delay time is " + costTime);
		if(costTime < 2000)
		{
			PlatformManager.showToast(Language.OPRARTION_MORE);
			return;
		}
		
		if(isLoginSDk())return;
		
//		if(this.requestLoginPlatform)
//			return;
		
//		this.requestLoginWindowCount++;
//		if(this.requestLoginWindowCount == 0)return;
		
		this.requestLoginPlatform = true;
//		this.isFirstloginSDKWhenEnterToGame = false;
		if(this.initSuccess)
		{
			this.context.runOnUiThread(runable);
		}
	}
	
	/**
	 * ������������������
	 */
	public void platformCheckFail()
	{
		platformData.init();
//		lastClickBackTime = lastLoginTime = 0l;
	}
	
	protected void showExitPanel()
    {
        this.context.runOnUiThread(new Runnable() {
			
			@Override
			public void run() {
				// TODO Auto-generated method stub
//				Looper.prepare();
				new AlertDialog.Builder(BasePlatform.this.context)
		        .setTitle(org.cocos2dx.javascript.platform.base.Language.EXIT_GAME_TIP)
		        .setMessage(org.cocos2dx.javascript.platform.base.Language.EXIT_GAME)
		        .setPositiveButton(org.cocos2dx.javascript.platform.base.Language.DIALOG_SURE, new DialogInterface.OnClickListener() {
		            
		            public void onClick(DialogInterface dialog, int which) {
		            	onExitGame();
		            	PlatformManager.exitGame();
		            }
		        }  )
		        .setNegativeButton(org.cocos2dx.javascript.platform.base.Language.DIALOG_CANCEL, new DialogInterface.OnClickListener() {
		            
		            public void onClick(DialogInterface dialog, int which) {

		            }
		        } )
		        .show();
			}
		});
    }
	
	protected void onExitGame()
	{
		
	}
	
	protected void loginPlatformSuccess()
	{
		try
		{
			JSONObject o = new JSONObject();
			o.put("token", platformData.platform_token);
			o.put("username",platformData.platform_uid);
			o.put("platform", PlatformManager.getPlatformName());
			if(!platformData.loginType.isEmpty())
			{
				o.put("loginType",platformData.loginType);
			}
			
			if(!platformData.logintime.isEmpty())
			{
				o.put("logintime",platformData.logintime);
			}
			
			if(!platformData.isdkChanndel.isEmpty()){
				o.put("isdk_channelId", platformData.isdkChanndel);
			}
			
			String data = o.toString();
			PlatformManager.callDataCppMethod(PlatformManager.didLoginPlatform, data);
			Log.d("platform_login", data);
			
//			this.isFirstloginSDKWhenEnterToGame = true;
		}
		catch(Exception e)
		{
			
		}
		
		this.sdkState = STATE_LOG_IN;
//		JSONObject ob = new JSONObject();
//		ob.put("token", platformData.platform_token);

	}
	
	
	protected void buyQuery(String data){
		PlatformManager.callDataCppMethod(PlatformManager.didPaymentButNeedQuery, data);
	}
	
	
	protected  JSONParser submitJson = null;
	
	/**
	 * submitJson.getStringByKey("roleId"), 
    			submitJson.getStringByKey("roleName"),
    			submitJson.getStringByKey("roleLevel"),
    			submitJson.getStringByKey("zoneId"),
    			submitJson.getStringByKey("zoneName"));
	 * @param jsonStr
	 */
	public void submitExtendData(String jsonStr)
	{
		submitJson = new JSONParser(jsonStr);
    	platformData.game_user_name = submitJson.getStringByKey("roleName");
	}
	
	
	private long pauseTime = 0L;
	
	private long resumeTime = 0L;
	
	private int totalPauseTime = 0;
	
	/**
	 * ������������������
	 */
	protected Boolean inGame = false;
	
	public void onPause() {
		inGame = false;
		pauseTime = System.currentTimeMillis();
		frontToBack();
    }

    public void onResume() {
    	inGame = true;
    	resumeTime = System.currentTimeMillis();
    	if(pauseTime > 0)
    	{
    		totalPauseTime = (int)(resumeTime - pauseTime);
//    		lastLoginTime += totalPauseTime;
    	}
    	
    	backToFront();
    }
    
    public void onRestart()
	{
    	inGame = true;
	}
	
	public void onStart() {
	}
	
	public void onStop() {
		// TODO Auto-generated method stub
		inGame = false;
	}
	
	
	//---------------------
	public void frontToBack(){}
	public void backToFront(){}
	//----------------------
	
	protected void logoutPlatform()
	{
//		this.initData();
	}
	
	protected void loginoutSuccess()
	{
		this.sdkState = STATE_LOG_OUT;
//		this.initData();
		this.isShowLoginWindiow = false;
//		this.requestLoginWindowCount = -1;
		platformData.init();
		PlatformManager.callVoidCppMethod(PlatformManager.didLogout);
	}
	
	
	protected Boolean isShowLoginWindiow = false;
	protected int closeLoginWindowCount = 0;
	protected void showLoginWindow()
	{
		this.isShowLoginWindiow = true;
		PlatformManager.callVoidCppMethod(PlatformManager.didShowLoginWindow);
	}
	
	protected void hideLoginWindow()
	{
		this.closeLoginWindowCount++;
		if(this.isShowLoginWindiow)
		{
			this.isShowLoginWindiow = false;
			PlatformManager.callVoidCppMethod(PlatformManager.didHideLoginWindow);
		}
	}
	
	
	protected void initData()
	{
//		this.initSuccess = false;
		this.requestLoginPlatform = false;
	}
	
	private long lastClickBackTime = 0L;
	
	/**
	 * ���������������������
	 */
	private Boolean exit_with_one_key_down = true;
	 
	public void onKeyDown(int keyCode, KeyEvent event) {
		// TODO Auto-generated method stub
		if(keyCode == KeyEvent.KEYCODE_BACK)
    	{
			
			if(exit_with_one_key_down)
			{
				this.exitGame();
			}
			else
			{
				long curT = System.currentTimeMillis();
	    		
	    		if(lastClickBackTime > 1)
	    		{
	    			
	    			int coatTime = (int)(curT - lastClickBackTime);
	    			if(coatTime < 500)
	    			{
	    				this.exitGame();
	    			}
	    		}
	    		
	    		lastClickBackTime = curT;
			}
    		
    	}
    	else if(keyCode == KeyEvent.KEYCODE_MENU)
    	{
    		
    	}
		
	}
	
	public void exitGame()
	{
		this.showExitPanel();
	}
	
	public void onBackPressed(){
		
	}
	
	protected void onKeyMenu()
	{
		
	}
	
	public void finish() 
	{
//		platformData.init();
	};
	//----------------------------- about login ----------------------------------
	
	
	//----------------------------- about R ----------------------------------
	//----------------------------- about R ----------------------------------
	
	
	//----------------------------- about buy ------------------------------------
//	protected void buySuccess()
//	{
//		PlatformManager.sendMessage(PlatformManager.BUY_SUCCESS,buyJson);
//	}
//	
//	protected void buyCancel()
//	{
//		PlatformManager.sendMessage(PlatformManager.BUY_CANCEL);
//	}
//	
//	protected void buyFail()
//	{
//		PlatformManager.sendMessage(PlatformManager.BUY_FAIL);
//	}
//	
//	protected void onBuying()
//	{
//		PlatformManager.sendMessage(PlatformManager.BUY_DOING);
//	}
	
	
	//----------------------------- about buy ------------------------------------
	
	public void onActivityResult(int requestCode, int resultCode, Intent data)
	{
		
	}
	
	
	
	
	public void onNewIntent(Intent intent)
	{
		
	}
	//----------------------------------------------------------------------

	/**
	 * {"pid":6152538,"orderId":"and_papa-1-201606061606463398","g_name":"60钻石","g_id":"1","role_id":"413","zone_id":"0","dimond":"6",
	 * "extra":"serverId:1|uid:413|shopId:1|orderId:and_papa-1-201606061606463398","player_name":"安静的小龙人",
	 * "data":{"username":6152538,"orderId":"and_papa-1-201606061606463398","ext":{"notifyUrl":"http://and.mx.maple-game.com/service.php?m=Sdk&a=pay&pt=and_papa"}}}
	 */
}
