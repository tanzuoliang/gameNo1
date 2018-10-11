package org.cocos2dx.javascript.events;

import java.util.HashMap;

public class EventManager {

	
	public final static String SDK_LOGOUT_SUCC = "sdkLogoutSucc";
	
	public final static String TENCENT_LOGIN = "tencentLogin";
	
	public final static String SHOW_LOGIN_POPUP = "showLoginPopup";
	
	private static HashMap<String, IEventCall> eventMap = new HashMap<String, EventManager.IEventCall>();
	
	public static void addEvent(String type,IEventCall call)
	{
		eventMap.put(type, call);
	}
	
	public static void sendEvent(String type,Object eventData)
	{
		
		if(eventMap.containsKey(type))
		{
			IEventCall call = eventMap.get(type);
			call.execute(eventData);
		}
	}
	
	public static void removeEvent(String type)
	{
		if(eventMap.containsKey(type))
		{
			eventMap.remove(type);
		}
	}
	
	public static void sendEvent(String type)
	{
		
		if(eventMap.containsKey(type))
		{
			IEventCall call = eventMap.get(type);
			call.execute(null);
		}
	}
	
	public interface IEventCall
	{
		void execute(Object eventData);
	}
}
