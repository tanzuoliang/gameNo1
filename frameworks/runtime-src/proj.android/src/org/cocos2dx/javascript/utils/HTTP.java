package org.cocos2dx.javascript.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class HTTP {

	
	private Delegate delegate = null;
	
	public void send(String path,Delegate delegate)
	{
		this.delegate = delegate;
		
		String ret = "";
		URL url;
		try {

			url = new URL(path);
			HttpURLConnection connection = (HttpURLConnection) url
					.openConnection();
			connection.setConnectTimeout(5000);
			connection.connect();
			switch(connection.getResponseCode())
			{
			case 503:
//				this.showOffNetDialog();
				return;
			case 404:

				return;
			}

			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(),"GB2312"));
            String inputLine = null;
            while ((inputLine = reader.readLine()) != null){
            	ret += inputLine + "\n";
            }
            reader.close();
            connection.disconnect();

		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		if(this.delegate != null)
		{
			this.delegate.execute(ret);
		}
	}
	
	
	public interface Delegate
	{
		public void execute(String ret);
	}
	
}
