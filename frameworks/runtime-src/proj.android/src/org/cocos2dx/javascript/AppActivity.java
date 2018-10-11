/****************************************************************************
Copyright (c) 2008-2010 Ricardo Quesada
Copyright (c) 2010-2012 cocos2d-x.org
Copyright (c) 2011      Zynga Inc.
Copyright (c) 2013-2014 Chukong Technologies Inc.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package org.cocos2dx.javascript;

import java.io.IOException;
import java.io.InputStream;
import org.cocos2dx.javascript.platform.PlatformManager;
import org.cocos2dx.javascript.push.PushManager;
import org.cocos2dx.javascript.utils.Gobal;
import org.cocos2dx.javascript.utils.JSONParser;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.graphics.drawable.Drawable;

import android.os.Bundle;
import android.os.PowerManager;
import android.os.PowerManager.WakeLock;

import android.util.Log;
import android.view.KeyEvent;


public class AppActivity extends Cocos2dxActivity {
	
	private static AppActivity context = null;
	
	/**
	 * 锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟姐�ラ�╋拷锟斤拷
	 */
	private Boolean singalConnect = true;
    private Boolean usingIjm = true;
    
    
    private PowerManager pManager = null;
    private WakeLock mWakeLock = null;
    
    private static final String TAG = "AppActivity";
    
	
    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);

        return glSurfaceView;
    }
    
    private String getPackName()
    {
    	return this.getPackageName();
    }
    
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
    	Gobal.activityList.add(this);
    	PlatformManager.init(this);
//   	 	PlatformManager.showProgressDialog();
   	 	/**
   	 	 就他妈的oppo事多
   	 	 */
   	 	if(PlatformManager.getPlatformName().equals("and_oppo") ||
   	 		PlatformManager.getPlatformName().equals("and_tailand")){
   	 		this.usingIjm = false;
   	 	}
    	// TODO Auto-generated method stub
    	super.onCreate(savedInstanceState);
    
    	//PluginWrapper.init(this);
    	context = this;
    	PlatformManager.initSDK();
        pManager = (PowerManager) getSystemService(POWER_SERVICE);
    }
    
    
    @Override
    protected void onDestroy() {
    	// TODO Auto-generated method stub
    	//PluginWrapper.onDestroy()
    	
    	if(PlatformManager.getPlatform() != null)
    	{
    		PlatformManager.getPlatform().onDestory();
    	}
    	
    	super.onDestroy();
    }
    
    @Override
    public void finish() {
    	// TODO Auto-generated method stub
    	super.finish();
    	if(PlatformManager.getPlatform() != null)
    	{
    		PlatformManager.getPlatform().finish();
    	}
    }
    
    @Override
    protected void onPause() {
    	// TODO Auto-generated method stub
    	//PluginWrapper.onPause();
    	super.onPause();
    	PushManager.onPause(this);
    	//TalkingDataGA.onPause(this);
    	PlatformManager.getPlatform().onPause();
    
//        try {
//        	if(null != mWakeLock && mWakeLock.isHeld()){  
//                mWakeLock.release();  
//            } 
//    	} catch (Exception e) {
//    			// TODO: handle exception
//    		Log.e(TAG, e.getMessage());
//    	} 
        
        if(usingIjm)
        {
        	//IjmTools.onPause();
        }
    }
    
    @Override
    protected void onResume() {
    	// TODO Auto-generated method stub
    	//PluginWrapper.onResume();
    	super.onResume();
    	PushManager.onResume(this);
    	//TalkingDataGA.onResume(this);
    	PlatformManager.getPlatform().onResume();
        
//        mWakeLock = pManager.newWakeLock(PowerManager.SCREEN_BRIGHT_WAKE_LOCK  
//            | PowerManager.ON_AFTER_RELEASE, TAG);  
//        mWakeLock.acquire(); 
        
        if(this.usingIjm)
        {
        	//IjmTools.onResume();
        }    
        
    }
    
    
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    	// TODO Auto-generated method stub
    	//PluginWrapper.onActivityResult(requestCode, resultCode, data);
    	PlatformManager.getPlatform().onActivityResult(requestCode, resultCode, data);
    	super.onActivityResult(requestCode, resultCode, data);
    }
    
    
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
    	// TODO Auto-generated method stub
    	super.onConfigurationChanged(newConfig);
    }
    
    @Override
    protected void onNewIntent(Intent intent) {
    	// TODO Auto-generated method stub
    	//PluginWrapper.onNewIntent(intent);
    	super.onNewIntent(intent);
    	PlatformManager.getPlatform().onNewIntent(intent);
    }
    
    @Override
    protected void onStop() {
    	// TODO Auto-generated method stub
    	//PluginWrapper.onStop();
    	super.onStop();
    	
    	if(PlatformManager.getPlatform() != null)
    	{
    		PlatformManager.getPlatform().onStop();
    	}
    }
    
    
    @Override
    protected void onRestart() {
    	// TODO Auto-generated method stub
    	super.onRestart();
    	PlatformManager.getPlatform().onRestart();
    }
    
    public static void exitGame()
    {
    	PlatformManager.exitGame();
    }
    
    @Override
    public void onBackPressed() {
    	// TODO Auto-generated method stub
    	super.onBackPressed();
    }
   
    /**
     * 	������瑕�姹� �����烘父���
     */
    public static void logoutMIPlatform()
    {
    	PlatformManager.getPlatform().exitGame();
    }
    public static void loginMIPlatform(){}	
    public static void startNetStatusChange(){}
    
    
//    @Override
//    protected void onLoadNativeLibraries() {
//    	// TODO Auto-generated method stub
//    	super.onLoadNativeLibraries();
//    	
//    	PlatformManager.cocos2dReadForGame();
//    }
    //------------------------------ about xinge ---------------------------------------------------------------
    
    
    @Override
    public void onLowMemory() {
    	// TODO Auto-generated method stub
    	super.onLowMemory();
    	PlatformManager.showToast("内存不足警告......!");
    	PlatformManager.callDataCppMethod(PlatformManager.OTHER_CODE, "lowMemory");
    }
    
}
