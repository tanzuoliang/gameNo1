package org.cocos2dx.javascript.platform.base;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

public class GameNoticeActivity extends BaseWebViewActivity {

	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
//		this.initMyWebView(1, 2);
		this.addJavascriptInterface(new Interface(), BaseWebViewActivity.JS_PLUGIN);
	}
	
	/**
	 * 显示网页
	 * @param fromContext 
	 */
	public static void showGameNotice(Context fromContext){
		
		Intent i = new Intent(fromContext, GameNoticeActivity.class);
		fromContext.startActivity(i);
	}
	
	class Interface{
		/**
		 * 关闭网页
		 */
		public void closeWebview(){
			GameNoticeActivity.this.finish();
		}
	}
}
