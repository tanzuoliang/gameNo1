package org.cocos2dx.javascript.utils;

import java.io.IOException;
import java.util.zip.ZipException;

import org.cocos2dx.javascript.platform.PlatformManager;

import android.app.Activity;
import android.os.AsyncTask;
import android.util.Log;

public class HttpTask extends AsyncTask<Void, Integer, String>
{

	private Delegate delegate = null;
	
	private String path = null;
	
	public HttpTask(String path,Delegate delegate) {
		// TODO Auto-generated constructor stub
		this.delegate = delegate;
		this.path = path;
//		this.execute();
	}
	
	public static Activity c = null;
	
	@Override
	protected void onPreExecute() {
		// TODO Auto-generated method stub
		super.onPreExecute();
		PlatformManager.showProgress(c);
	}
	
	private String responseData = null;
	
	@Override
	protected String doInBackground(Void... arg0) {
		// TODO Auto-generated method stub
		
		HTTP tp = new HTTP();
		tp.send(this.path, new HTTP.Delegate() {
			
			@Override
			public void execute(String ret) {
				// TODO Auto-generated method stub
				HttpTask.this.responseData = ret;
			}
		});
		
		return responseData;
	}
	
	@Override
	protected void onPostExecute(String result) {
		// TODO Auto-generated method stub
		
		PlatformManager.hideProgress();
		
		super.onPostExecute(result);
		
		this.responseFromHttp(result);
		
	}
	
	private void responseFromHttp(final String ret)
	{
		if(this.delegate != null)
		{
			this.delegate.execute(ret);
		}
	}
	
	
	private int totalBytes = 0;
	private int loadedBytes = 0;
	
	@Override
	protected void onProgressUpdate(Integer... values) {
		// TODO Auto-generated method stub
		super.onProgressUpdate(values);
		
		if (values.length > 1) 
		{
			totalBytes = values[1];
		} 
		else
		{
			loadedBytes = values[0].intValue();
//			int per = loadedBytes * 100 / totalBytes;
//			if(this.loadedBytes == this.totalBytes)
//			{
//				PlatformManager.hideProgress();
//			}
		}
	}
	
	public interface Delegate
	{
		public void execute(String ret);
	}

}
