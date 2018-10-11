package org.cocos2dx.javascript.platform;

import org.cocos2dx.javascript.platform.base.BaseWebViewActivity;
import org.cocos2dx.javascript.utils.Gobal;
import org.cocos2dx.javascript.utils.WidgetController;
import org.cocos2dx.lib.Cocos2dxHelper;

import com.tianyi.cubeWar.R;



import android.app.ActionBar.LayoutParams;
import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.MotionEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.ViewTreeObserver.OnGlobalLayoutListener;
import android.view.inputmethod.InputMethodManager;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.Toast;


public class LoginActivity extends BaseWebViewActivity {

//	private static final String PATH_ = "http://192.168.1.240:9003/index.php?m=Login&a=mapleIndex";
//	private static final String PATH_ = http://182.254.155.127:8020/?m=open;
//	private static final String PATH_ = "http://192.168.1.57/push/game/index.html";
	
	public LoginActivity(){
	}
	
	
	AndroidToastForJs androidJs = null;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
//		getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
		setTheme(android.R.style.Theme_Translucent_NoTitleBar_Fullscreen);
//		requestWindowFeature(Window.FEATURE_NO_TITLE);
//		getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, 
//				WindowManager.LayoutParams.FLAG_FULLSCREEN); 
		
		this.initMyWebView(R.layout.login_layout, R.id.webview);
		this.modifyMyWebviewSize();
//		this.loadURL(PATH_);
		this.loadURL(PlatformManager.getSDKLoginURL());
//        this.loadURL("http://115.159.214.90:8020/?m=open");
        
		androidJs = new AndroidToastForJs();
		this.addJavascriptInterface(androidJs, BaseWebViewActivity.JS_PLUGIN);
//		androidJs.openKeyboard();
		this.shutDefaultClose();
		
//		this.mywebview.setPadding(this.mywebview.getPaddingLeft(), this.mywebview.getPaddingTop() - 200,
//				this.mywebview.getPaddingRight(), this.mywebview.getPaddingBottom());
		
		
//		WidgetController.setLinearLayoutY(this.mywebview, -200);
		
//		this.mywebview.setOnTouchListener(new View.OnTouchListener() {
//			
//			@Override
//			public boolean onTouch(View v, MotionEvent event) {
//				// TODO Auto-generated method stub
//				switch (event.getAction()) {
//				case MotionEvent.ACTION_DOWN:
//					break;
//				case MotionEvent.ACTION_UP:
//					break;
//				}
//				return false;
//			}
//		});
		
//	    layout = (LinearLayout)findViewById(R.id.maple_login_layout);
//	    
//	    if(layout != null){
//	    	InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);  
//	    	imm.toggleSoftInput(0, InputMethodManager.HIDE_NOT_ALWAYS);
//	    	layout.getViewTreeObserver().addOnGlobalLayoutListener(new OnGlobalLayoutListener() {
//				
//				@Override
//				public void onGlobalLayout() {
//					// TODO Auto-generated method stub
//					int rootHeight = LoginActivity.this.layout.getRootView().getHeight();
//					int currentHeight = LoginActivity.this.layout.getHeight();
//					 int heightDiff = rootHeight - currentHeight;
//			  
//			          if (heightDiff > 100)
//			          { // 说明键盘是弹出状态
//			        	  LoginActivity.this.androidJs.openKeyboard();
//			          } else{
//			        	  LoginActivity.this.androidJs.hideKeyboard();
//			          }
//				}
//			});
//	    }
	}
	
	
	private LinearLayout layout = null;
	
	public static Response res = null;
	
	public static class Response{
		public void result(String info){}
	}
	
	public class AndroidToastForJs {  
	    private String MAPLE_SDK_CLIENT_ID = "MAPLE_SDK_CLIENT_ID";

	    public String getClientId(){
	    	return Cocos2dxHelper.getStringForKey(MAPLE_SDK_CLIENT_ID, "0");
	    }
	    
	    public void setClientId(String clientId){
	    	Cocos2dxHelper.setStringForKey(MAPLE_SDK_CLIENT_ID, clientId);
	    }
	    
	    public void callGame(String info){
	    	if(info.split(":")[0].equals("1")){
	    		res.result(info);
	    		LoginActivity.this.finish();
	    	}
	    }
	    private Boolean _openKeyBoard = false;
	    private int offsetY = 300;
	    public void openKeyboard(){
	    	if(!_openKeyBoard)
	    	{
	    		WidgetController.setLinearLayoutY(LoginActivity.this.mywebview, -offsetY);
	    		_openKeyBoard = true;
	    	}
	    }
	    
	    public void hideKeyboard(){
	    	if(_openKeyBoard){
	    		WidgetController.setLinearLayoutY(LoginActivity.this.mywebview, offsetY);
	    		_openKeyBoard = false;
	    	}
	    }
	    
	    /**
	     * 获取平台类型
	     * @return
	     */
	    public String platform(){
	    	return "android";
	    }
	}  
}

