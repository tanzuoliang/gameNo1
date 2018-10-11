package org.cocos2dx.javascript.platform.base.data;

import android.util.Log;

/**
 * 平台返回过来的数据
 * @author yons
 *
 */
public class PlatformData {
	
	/**
	 * 平台uid
	 */
	public String platform_uid    = "";
	
	/**
	 * 平台token
	 */
    public String platform_token  = "";
    
    public String loginType = "";
    
    public String logintime = "";
    
    public String isdkChanndel = "";
   
    
    public String platform_user_name = "";
    
    public String platform_nick_name = "";
    
    /**
     * 游戏服务器uid
     */
    public String server_uid	  = "";
    
    
    /**
     * 游戏服务器token
     */
    public String server_token	  = "";
    
    public String game_user_name = "";
    
    public String sid = "";
    
    public String gameServerBackJsonStr = "";
    
    public void init()
    {
    	platform_uid = "";
    	platform_token = "";
    	platform_nick_name = "";
    	platform_user_name = "";
    	isdkChanndel = "";
    }
    
    public Boolean hasData()
    {
    	return this.platform_token != "" || this.platform_uid != "";
    }
    
    public void showInfo()
    {
    	Log.d(PlatformData.class.getName(), "platform_uid = " + platform_uid + ", platform_token = " + platform_token);
    }
}
