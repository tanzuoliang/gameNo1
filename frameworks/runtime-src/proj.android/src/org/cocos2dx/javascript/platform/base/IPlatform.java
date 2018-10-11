package org.cocos2dx.javascript.platform.base;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.view.KeyEvent;


public interface IPlatform {
	
	/**
	 * 注册平台信息
	 */
	void registerPlatformInfo(Context context);
	
	/**
	 * 初始化平台
	 */
	void initPlatform(Activity context);
	
	/**
	 * 登录平台
	 */
	void loginPlatform();
	
//	/**
//	 * 登入平台成功通知游戏服务器
//	 */
//	void loginSuccessNoticeGameServer();
	
	/**
	 * 登出平台
	 */
	void logoutPlatform();
	
	/**
	 * 支付
	 * var obj = {pid:$platform_user_id,orderId:$orderId,g_name:$g_name,g_id:''+$g_id,role_id:''+$role_id,zone_id:''+$zone_id,dimond:''+$dimond,extra:$extraStr,player_name:'' + game.GameConst.getGameInfo().rolename};
	 * @param jsonStr
	 */
	void payfor(String jsonStr);
	
	/**
	 * 支付成功回调
	 */
	void payforCallBack();
	
	/**
	 * 提交额外数据给平台
	 * @param jsonStr {"roleId":"","roleName":"","roleLevel":"","zoneId":"","zoneName":""}
	 */
	void submitExtendData(String jsonStr);
	
	void onDestory();
	
	void onResume();
	
	void onPause();
	
	void onStop();
	
	void onRestart();
	
	void onStart();
	
	void onNewIntent(Intent intent);
	
	void finish();
	
	void platformCheckFail();
	
	/**
	 * 
	 * @param cmd jsonStr  {"code":"",data:{}}
	 */
	void callFromNative(String cmd);
	
	/**
	 * 退出游戏 （key_backspace）
	 */
	void exitGame();
	
	void onBackPressed();
	
	/**
	 * 按键操作 各个平台处理不一样
	 * @param keyCode
	 * @param event
	 */
	void onKeyDown(int keyCode, KeyEvent event);
	
	int getDrawable(String id);
	int getLayout(String id);
	
	void onActivityResult(int requestCode, int resultCode, Intent data); 
	
	void initSuccessful();
}
