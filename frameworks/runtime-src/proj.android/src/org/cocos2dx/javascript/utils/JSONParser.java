package org.cocos2dx.javascript.utils;

import java.util.StringTokenizer;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

public class JSONParser {

	
	JSONObject jsonData = null;
	
	private String _jsonStr;
	
	public JSONParser(String jsonStr)
	{
		try {  
            JSONTokener jsonParser = new JSONTokener(jsonStr);  
 
            this.jsonData = (JSONObject) jsonParser.nextValue();  
            
        } catch (JSONException ex) {  
            // 异常处理代码  
        }
        
		this._jsonStr = jsonStr;
	}
	
	
	public JSONObject getObject(){return this.jsonData;}
	
	public String getStringByKey(String key) 
	{
		String ret = "";
		
		if(this.jsonData != null)
		{
			 try{
				 
				 JSONObject json = this.jsonData;
				 
				 String[] list = key.split("\\.");
				 for(int i = 0; i < list.length - 1;i++)
				 {
					 json = json.getJSONObject(list[i]);
				 }
				 
				 if(list.length > 0)
					 ret = json.getString(list[list.length - 1]);
			 }
			 catch(JSONException ex){
				 
			 }
		}
		return ret;
	}
	
	public int getIntByKey(String key) 
	{
		int ret = -1;
		
		if(this.jsonData != null)
		{
			 try{
				 //ret = this.jsonData.getInt(key);
				 JSONObject json = this.jsonData;
				 
				 String[] list = key.split("\\.");
				 for(int i = 0; i < list.length - 1;i++)
				 {
					 json = json.getJSONObject(list[i]);
				 }
				 
				 ret = json.getInt(list[list.length - 1]);
			 }
			 catch(JSONException ex){
				 
			 }
		}
		
		return ret;
	}
	
	public Long getLongByKey(String key) 
	{
		Long ret = (long) -1;
		
		if(this.jsonData != null)
		{
			 try{
				 //ret = this.jsonData.getInt(key);
				 JSONObject json = this.jsonData;
				 
				 String[] list = key.split("\\.");
				 for(int i = 0; i < list.length - 1;i++)
				 {
					 json = json.getJSONObject(list[i]);
				 }
				 
				 ret = json.getLong(list[list.length - 1]);
			 }
			 catch(JSONException ex){
				 
			 }
		}
		
		return ret;
	}
	
	public String toString()
	{
		return this._jsonStr;
	}
}
