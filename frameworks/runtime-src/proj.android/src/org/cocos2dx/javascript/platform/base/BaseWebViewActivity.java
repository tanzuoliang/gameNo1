package org.cocos2dx.javascript.platform.base;

import org.cocos2dx.javascript.platform.PlatformManager;


import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.inputmethodservice.Keyboard;
import android.text.TextUtils;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.KeyEvent;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

public class BaseWebViewActivity extends Activity {

	
	public static final String JS_PLUGIN = "jsPlugin";
	
	protected WebView mywebview = null;
	
	private WebChromeClient client = new WebChromeClient(){
		public void onProgressChanged(WebView view, int newProgress) 
		{
			 if (newProgress == 100) {
                 // 网页加载完成
				 PlatformManager.hideProgress();

             } else {
                 // 加载中

             }
		};
	};
	
	
	protected void loadURL(String url){
		mywebview.loadUrl(url);
		PlatformManager.showProgress(this, "","",false);
	}
	
	protected void initMyWebView(int layoutId,int viewId) {
		
		this.setContentView(layoutId);
		
//		this.
		
		mywebview = (WebView) findViewById(viewId);
		if(mywebview != null){
			mywebview.getSettings().setJavaScriptEnabled(true);
			mywebview.getSettings().setBuiltInZoomControls(true); 
			mywebview.setWebChromeClient(client);
			mywebview.setBackgroundColor(0);
		}
	}
	
	/**
	 * 网页适配
	 */
	@SuppressLint("NewApi") protected void modifyMyWebviewSize(){
		WindowManager wm = (WindowManager) this.getSystemService(Context.WINDOW_SERVICE);
	    DisplayMetrics metric = new DisplayMetrics();
        wm.getDefaultDisplay().getMetrics(metric);
        float density = metric.density;      // 屏幕密度（0.75 / 1.0 / 1.5）
//        float _s =  (float) ((2 * 0.9) / density);
        float _s =  (float) 2 / density;
        
        
        float wp = metric.widthPixels;
        float hp = metric.heightPixels;
        float fw = wp / density;
        float fh = hp / density;
        
        float ww = 600;
        float wh = 400;
        
//        float w = 1136.0f;
//        float h = 640.0f;
//        float sw = w / wp;
//        float sh = h / hp;
        
        float sw = fw / ww;
        float sh = fh / wh;
        
        _s = Math.min(sw, sh);
        if(_s > 0.8f)
        	_s = 0.8f;
        
        Log.d(JS_PLUGIN,metric.toString());
        
        mywebview.setScaleX(_s);
        mywebview.setScaleY(_s);
        
        
	}
	
	private Boolean _shutDefaultClose = false;
	
	/**
	 * 隐藏系统返回键删除自己
	 */
	protected void shutDefaultClose(){
		_shutDefaultClose  = true;
	}
	
	
	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		// TODO Auto-generated method stub
		
		if(keyCode == KeyEvent.KEYCODE_HOME){
			this.finish();
			return false;
		}
		
		if(!_shutDefaultClose)
			return super.onKeyDown(keyCode, event);
		else
			return false;
	}
	
	protected void addJavascriptInterface(Object obj,String jsName){
		if(mywebview != null)
		{
			mywebview.addJavascriptInterface(obj, jsName); 
		}
	}
}
