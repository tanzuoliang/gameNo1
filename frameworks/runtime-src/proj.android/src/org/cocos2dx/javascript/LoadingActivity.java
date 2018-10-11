package org.cocos2dx.javascript;

import org.cocos2dx.javascript.platform.PlatformManager;
import org.cocos2dx.javascript.utils.DownLoadZipProxy;
import org.cocos2dx.javascript.utils.Gobal;
import org.cocos2dx.javascript.utils.HttpTask;



import android.app.Activity;
//import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.Toast;

public class LoadingActivity extends Activity{  
//    private ProgressDialog dialog;  
    private long startCheckTime = 0;
    @Override 
    protected void onCreate(Bundle savedInstanceState) {  
            // TODO Auto-generated method stub  
    	Log.d("LoadingActivity", "loadingActivity startup");
            super.onCreate(savedInstanceState);  
            if(!Gobal.checkActivityValid(this))
        		return;
        	setContentView(PlatformManager.getPlatform().getLayout("mainlayout"));
        	HttpTask.c = this;
//            this.initSdk();
        	
        	startCheckTime = System.currentTimeMillis();
        	// new CheckDynamicSo(this, this);
        	updateAssetComplete();
    }  
    
    
  
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
    	// TODO Auto-generated method stub
    	return false;
    }

	public void updateAssetComplete() {
		
		if(Gobal.LOCAL_SAVE_VERSION > -1)
		{
			SharedPreferences settings = this.getSharedPreferences(Gobal.PREFS_NAME, 0);
	    	SharedPreferences.Editor editor = settings.edit();
	    	editor.putInt(Gobal.CODE_VERSION,Gobal.LOCAL_SAVE_VERSION);
	    	editor.commit();
	    	
	    	Gobal.LOCAL_SAVE_VERSION = -1;
		}
		// TODO Auto-generated method stub
		if(PlatformManager.showSelfStartUpActivity())
		{
			long remianTime = 1500 - (System.currentTimeMillis() - startCheckTime);
			remianTime = remianTime < 0?100:remianTime;
			new Handler().postDelayed(new Runnable() {
				
				@Override
				public void run() {
					// TODO Auto-generated method stub
					LoadingActivity.this.startGame();
			        
				}
			},(int)remianTime);
		}
		else
		{
			this.startGame();
		}
	}
	
	private void startGame()
	{
		LoadingActivity.this.finish(); 
        Intent mIntent = new Intent();  
        mIntent.setClass(LoadingActivity.this, AppActivity.class);  
        startActivity(mIntent);
	}
	
	@Override
		protected void onDestroy() {
			// TODO Auto-generated method stub
			super.onDestroy();
		}
}  