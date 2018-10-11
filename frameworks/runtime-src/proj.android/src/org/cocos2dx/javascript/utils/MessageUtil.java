package org.cocos2dx.javascript.utils;

import org.json.JSONObject;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.os.Looper;
import android.widget.Toast;

/**
 * Utility class used for AlertDialog and Toast output
 */
public class MessageUtil
{
	public static void alert( Activity activity, String message )
	{
		new AlertDialog.Builder( activity ).setTitle( "SDK Example App" ).setMessage( "" + message ).setPositiveButton( android.R.string.ok, null ).create().show();
	}

	public static void alert( Activity activity, String title, String message )
	{
		new AlertDialog.Builder( activity ).setTitle( title ).setMessage( "" + message ).setPositiveButton( android.R.string.ok, null ).create().show();
	}

	public static void toast( Context context, String message )
	{
		Toast.makeText( context, message, Toast.LENGTH_SHORT ).show();
	}

	public static void toastForError( Context context, int httpStatus, int kakaoStatus, JSONObject result )
	{
		Toast.makeText( context, "onError() - httpStatus: " + httpStatus + ", kakaoStatus: " + kakaoStatus + ", result: " + result, Toast.LENGTH_SHORT ).show();
	}

	public static void toastForComplete( Context context, int status, int statusCode, JSONObject result )
	{
		Toast.makeText( context, "onComplete() - httpStatus: " + status + ", kakaoStatus: " + statusCode + ", result: " + result, Toast.LENGTH_SHORT ).show();
	}
}
