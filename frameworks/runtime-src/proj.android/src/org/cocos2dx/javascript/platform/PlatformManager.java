package org.cocos2dx.javascript.platform;

import org.cocos2dx.javascript.platform.base.IDelayRespon;
import org.cocos2dx.javascript.platform.base.IPlatform;
import org.cocos2dx.javascript.platform.base.Language;
import org.cocos2dx.javascript.platform.base.NativeEventCode;
import org.cocos2dx.javascript.platform.base.PlatformName;
import org.cocos2dx.javascript.platform.base.data.LoginError;
import org.cocos2dx.javascript.platform.base.data.ToastData;
import org.cocos2dx.javascript.push.PushManager;
import org.cocos2dx.javascript.utils.FileUtils;
import org.cocos2dx.javascript.utils.Gobal;
import org.cocos2dx.javascript.utils.JSONParser;
import org.cocos2dx.javascript.utils.MessageUtil;
import org.cocos2dx.javascript.utils.NetUtil;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.json.JSONException;
import org.json.JSONObject;




import android.app.Activity;
import android.app.ActivityManager;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Handler;
import android.util.Log;
import android.widget.ProgressBar;

public class PlatformManager {

	/**
	 * 购买钻石数量
	 */
	public static final String KEY_DIMOND 		= "dimond";
	
	/**
	 * 购买钻石 id
	 */
	public static final String KEY_BUY_ID 		= "buy_id";
	//------------------------------------------------------
	public final static int LOGIN_PLAT_SUCCESS 		= 10001;
	
	public final static int LOGIN_PLAT_FAIL 		= 10002;
	
	public final static int LOGIN_PLAT_CANCEL		= 10003;
	
	public final static int LOGIN_DOING				= 10004;
	
	public final static int BUY_SUCCESS				= 20001;
	
	public final static int BUY_CANCEL				= 20002;
	
	public final static int BUY_FAIL				= 20003;
	
	public final static int BUY_DOING				= 20004;
	
	
	public final static int OFF_NETWORK 			= 30001;
	
	public final static int NOTICE_ENTER_TO_GAME    = 40001;
	
	public final static int SHOW_TOAST				= 50001;
	
	public final static int LOGOUT_PLAT_SUCCESS     = 60001;
	
	
	
	public final static int didLoginPlatform     	=  10001;

	public final static int didPayment          	= 10002;

	public final static int didLogout             	= 10003;

	public final static int didShowLoginWindow    	= 10004;

	public final static int didHideLoginWindow   	= 10005;

	public final static int didInit               	= 10006;

	public final static int didPaymentButNeedQuery 	= 10007;
	
	public final static int OTHER_CODE 	= 10008;
	
	public final static int MEMORYINFO	=	10009;
	
	public final static int QQ_LOGIN				= 50001;
	
	public final static int WX_LOGIN				= 5002;
	
	public final static int NET_CHANGE				= 200001;
	
	private static IPlatform platform = null;
	
	
	private static Cocos2dxActivity activity = null;
	
	public static JSONParser json;
	
	public static Boolean showLoginView = false;
	
	
	public static Boolean showSelfStartUpActivity()
	{
		String plat = json.getStringByKey("platform_name");
		return plat != "lenovo";
	}
	
	public static void init(Cocos2dxActivity ac)
	{
		activity = ac;		
		PushManager.registerPush(ac.getApplicationContext());
	}
	
	
	public static void initSDK()
	{
		if(platform != null)
		{
			platform.initPlatform(activity);
		}
	}
//	public static void initSdk()
//	{
//		
//	}
	
	private static Handler _handler = new Handler(){
		public void handleMessage(android.os.Message msg) 
		{
			int what = msg.what;
			switch (what) {
			case LOGIN_PLAT_CANCEL:
//				MessageUtil.toast(activity, "login platform cacel");
				break;
			case LOGIN_PLAT_FAIL:
				int errorCode = ((LoginError)msg.obj).errorCode;
				MessageUtil.toast(activity, "login platform fail:" + errorCode);
				break;
			case OFF_NETWORK:
				MessageUtil.toast(activity, "off network");
				break;
			case LOGIN_PLAT_SUCCESS:
				MessageUtil.toast(activity, "login platform success");
				break;
			case LOGIN_DOING:
				MessageUtil.toast(activity, "it logining platform");
				break;
			//----------------------------------------------------- GAME ----------------
			case NOTICE_ENTER_TO_GAME:
				break;
			//---------------------------------------------------------------------------
			case BUY_CANCEL:
				break;
			case BUY_DOING:
				break;
			case BUY_FAIL:
				break;
			case BUY_SUCCESS:
//				JSONParser json = (JSONParser)msg.obj;
				
				break;
			//----------------------------------------------------------------------------
			case SHOW_TOAST:
				ToastData toastData = (ToastData)msg.obj;
				MessageUtil.toast(activity, toastData.getInfo());
				break;
				
			default:
				break;
			}
		};
	};
	
	public static SharedPreferences getShared(Context context){
		return context.getSharedPreferences(Gobal.PREFS_NAME, 0);
	}
	
	private static SharedPreferences getShared(){
		return activity == null?null:activity.getSharedPreferences(Gobal.PREFS_NAME, 0);
	} 
	
	public static void commitLong(long value)
	{
		SharedPreferences settings = getShared();
		if(settings != null)
		{
			SharedPreferences.Editor editor = settings.edit();
	    	editor.putLong(Gobal.EXIT_TIME,value);
	    	editor.commit();
		}
		
	}
	
	public static Handler getHandler()
	{
		return _handler;
		
	}
	
	
	
	public static void sendMessage(int what)
	{
		_handler.sendEmptyMessage(what);
	}
	
	public static void sendMessage(int what,Object obj)
	{
		_handler.sendMessage(_handler.obtainMessage(what, obj));
	}
	
	public static void showToast(String info)
	{
		_handler.sendMessage(_handler.obtainMessage(SHOW_TOAST, new ToastData(info)));
	}
	
	/**
	 * 获取当前平台
	 * @return
	 */
	public static  IPlatform getPlatform()
	{
		if(platform == null)
			throw new Error("骞冲�颁�����涓虹┖锛�璇峰�����濮�");
		return platform;
	}
	
	
	
	private static String platform_name;
	
	/**
	 * 获取当前平台类型
	 * @return
	 */
	public static String getPlatformName(){return "and_" + platform_name;}
	
	/**
	 * 创建当前平台
	 * @param type 当前平台类型
	 * @return
	 */
	public static IPlatform createPlatform(Context context)
	{
	
		
		json = new JSONParser(FileUtils.getFileData(context, "platform.json"));
		platform_name = json.getStringByKey("platform_name");	
		
		Gobal.EXIT_TIME = platform_name + "EXIT_TIME";
		
		PushManager.setNotifactionCallback();
		
		platform = new AndroidPlatform();
		return platform;
	}
	
	public static String getGameHost(){
		String host = json.getStringByKey("game_loginUrl");
		host = host.replace("http://", "").split("/")[0].split(":")[0];
		return host;
	}
	
	public static String getSDKLoginURL(){
			return json.getStringByKey("sdk_loginUrl");
		}
	
	
	//-------------------------------------- call by js --------------------------------------
	/**
	 * 提交额外数据给平台
	 * @param jsonStr {"roleId":"","roleName":"","roleLevel":"","zoneId":"","zoneName":""}
	 */
	public static void submitExtendData(String jsonStr)
	{
		platform.submitExtendData(jsonStr);
	
	}
	
	public static void payfor(String jsonStr)
	{
		Log.d("PlatformManager:payinfo", jsonStr);
		platform.payfor(jsonStr);
	}
	
	
	/**
	 * js 调用 android 方法
	 * @param cmd
	 */
	public static void callFromNative(String cmd)
	{
		JSONParser json = new JSONParser(cmd);
		String action = json.getStringByKey(NativeEventCode.METHOD_CODE);
        if(action.equals(NativeEventCode.PLATFOMR_CHECK_FAIL))
		{
			platform.platformCheckFail();
		}
		
		platform.callFromNative(cmd);
	}
	
	
	public static void logoutPlatform()
	{
		platform.logoutPlatform();
	}
	
	public static void loginPaltform()
	{
		platform.loginPlatform();
	}
	
	/**
	 * 在游戏的设置界面 点击退出游戏按钮
	 * 显示sdk的退出界面
	 */
	public static void showSDKExitPanel()
	{
//		platform.exitGame();
//		delayCall(new IDelayRespon() {
//			
//			@Override
//			public void execute() {
//				// TODO Auto-generated method stub
//				platform.exitGame();
//			}
//		}, 100);
		
		activity.runOnUiThread(new Runnable() {
			
			@Override
			public void run() {
				// TODO Auto-generated method stub
				platform.exitGame();
			}
		});
	}
	
	public static void pause()
	{
		
	}
	
	public static void resume()
	{
		
	}
	
	public static String getApplicationName() 
    { 
		
		return activity.getString(activity.getResources().getIdentifier("app_name", "string", activity.getPackageName()));
    } 
	
	
	private static ProgressDialog progress = null;
	
	public static void showProgress()
	{
		hideProgress();
		progress  = ProgressDialog.show(activity, getApplicationName(), Language.CONNECT_PROGRESS);
		progress.setIcon(getPlatform().getDrawable("icon"));
		progress.setCancelable(false);
		progress.show();
	}
	
//	//tmp.getApplicationInfo().nonLocalizedLabel
	public static void showProgress(Activity c)
	{
		final Activity tmp = c;
		c.runOnUiThread(new Runnable() {
			
			@Override
			public void run() {
				// TODO Auto-generated method stub
				hideProgress();
				progress  = ProgressDialog.show(tmp, PlatformManager.getApplicationName(), Language.CONNECT_PROGRESS);
				progress.setIcon(getPlatform().getDrawable("icon"));
				progress.setCancelable(false);
				progress.show();
			}
		});
		
	}
	
	public static void showProgress(Activity c,final String title,final String content,final Boolean iconEnabel)
	{
		final Activity tmp = c;
		c.runOnUiThread(new Runnable() {
			
			@Override
			public void run() {
				// TODO Auto-generated method stub
				hideProgress();
				progress  = ProgressDialog.show(tmp, title, content);
				if(iconEnabel)
					progress.setIcon(getPlatform().getDrawable("icon"));
				progress.setCancelable(false);
				progress.show();
			}
		});
		
	}

	
	public static void hideProgress()
	{
		if(progress != null)
		{
			try
			{
				if(progress.isShowing())
				{
					progress.dismiss();
				}
			}
			catch(IllegalArgumentException e)
			{
				Log.d(PlatformManager.class.getSimpleName(), e.toString());
			}
			finally
			{
				progress = null;
			}
			
		}
	}
	
	
	private static ProgressDialog mDialog = null;
	
	public static void showProgressDialog()
	{
		String pN =  json.getStringByKey("platform_name");
		if(pN != "maple" && pN != "null" && pN != "test")
			return;
		
		if(mDialog == null)
		{
			mDialog = ProgressDialog.show(activity, getApplicationName(), Language.INIT_PROGRESS);
	    	mDialog.setIcon(getPlatform().getDrawable("icon"));
//	    	mDialog.setIcon(getPlatform().getDrawable("icon"));
			mDialog.setCancelable(false);
		}
		mDialog.show();
	}
	
	public static void showProgressDilogAlways(){
		if(mDialog == null)
		{
			mDialog = ProgressDialog.show(activity, getApplicationName(), Language.INIT_PROGRESS);
	    	mDialog.setIcon(getPlatform().getDrawable("icon"));
			mDialog.setCancelable(false);
		}
		mDialog.show();
	}

	public static void hideProgressDialog()
	{
		if(mDialog != null)
		{
			mDialog.dismiss();
		}
	}
	
	
	private static Boolean _startSo = false;
	
	public static Boolean getStartSo()
	{
		return _startSo;
	}
	
	/**
	 * so 文件加载进入完成
	 */
	public static void cocos2dReadForGame()
	{
		_startSo = true;
		hideProgressDialog();
	}
	//-------------------------------------- native method ------------------------------------
	
	public static void callDataCppMethod(int code,String data)
	{
		JSONObject json = new JSONObject();
		try {
			json.put("code", code);
			json.put("data", data);
			PlatformManager.nativeSdkCallback(json.toString());
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	public static void delayCall(final IDelayRespon res,int delayMillis)
	{
		new Handler().postDelayed(new Runnable() {
			
			@Override
			public void run() {
				// TODO Auto-generated method stub
				res.execute();
			}
		}, delayMillis);
	}
	
	public static void exitGame()
	{
		try
    	{
    		for(Activity ac : Gobal.activityList)
    		{
    			ac.finish();
    		}
    	}
    	catch(Exception e)
    	{
    		e.printStackTrace();
    	}
    	finally
    	{
    		Gobal.activityList.clear();
    		killApplication();
//    		System.exit(0);
//    		android.os.Process.killProcess(android.os.Process.myPid());
    	}
	}
	
	public static void killApplication()
	{
//		System.exit(0);
		commitLong(System.currentTimeMillis());
		android.os.Process.killProcess(android.os.Process.myPid());
	}
	
	public static void callVoidCppMethod(int code)
	{
		JSONObject json = new JSONObject();
		try {
			json.put("code", code);
			PlatformManager.nativeSdkCallback(json.toString());
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * 
	 * @param jsoStr  {"event":'',"data":""}
	 */
	public static native void nativeSdkCallback(String jsoStr);
	
	//---------------------------------------------------------------------------------
	private static ProgressDialog mAutoLoginWaitingDlg;
	public static void startWaiting() {
		stopWaiting();
        mAutoLoginWaitingDlg = new ProgressDialog(activity);
        mAutoLoginWaitingDlg.setTitle(Language.AUTO_LOGIN);
        mAutoLoginWaitingDlg.show();
        mAutoLoginWaitingDlg.setCancelable(false);
    }

    public static void stopWaiting() 
    {
        if (mAutoLoginWaitingDlg != null && mAutoLoginWaitingDlg.isShowing()) {
            mAutoLoginWaitingDlg.dismiss();
        }
    }
    
    
    public  void onResume() {
		// TODO Auto-generated method stub

	}

	public void onPause(){
		
	}
	
	public static void readMemeryInfo(){
		ActivityManager activityManager = (ActivityManager) activity.getSystemService(Context.ACTIVITY_SERVICE);
		//最大分配内存
		int memory = activityManager.getMemoryClass();
		System.out.println("memory: "+memory);
		//最大分配内存获取方法2
		float maxMemory = (float) (Runtime.getRuntime().maxMemory() * 1.0/ (1024 * 1024));
		//当前分配的总内存
		float totalMemory = (float) (Runtime.getRuntime().totalMemory() * 1.0/ (1024 * 1024));
		//剩余内存
		float freeMemory = (float) (Runtime.getRuntime().freeMemory() * 1.0/ (1024 * 1024));
		System.out.println("maxMemory: "+maxMemory);
		System.out.println("totalMemory: "+totalMemory);
		System.out.println("freeMemory: "+freeMemory);
		
		callDataCppMethod(MEMORYINFO,maxMemory + "|" + totalMemory + "|" + freeMemory);
	}
}
