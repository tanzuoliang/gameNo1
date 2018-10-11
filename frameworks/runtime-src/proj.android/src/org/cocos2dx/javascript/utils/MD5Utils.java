package org.cocos2dx.javascript.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Utils {

	 /**
	  * 获取单个文件的MD5值！

	  * @param file
	  * @return
	  */

	 public static String getFileMD5(File file) {
	  if (!file.isFile()) {
	   return null;
	   
	   
	  }
	  MessageDigest digest = null;
	  FileInputStream in = null;
	  byte buffer[] = new byte[1024];
	  int len;
	  try {
	   digest = MessageDigest.getInstance("MD5");
	   in = new FileInputStream(file);
	   while ((len = in.read(buffer, 0, 1024)) != -1) {
	    digest.update(buffer, 0, len);
	   }
	   in.close();
	  } catch (Exception e) {
	   e.printStackTrace();
	   return null;
	  }
	  BigInteger bigInt = new BigInteger(1, digest.digest());
	  
	  return bigInt.toString(16);
	 }
	 
	 /**
	     * 对传入的参数进行MD5摘要
	     * @param str	需进行MD5摘要的数据
	     * @return		MD5摘要值
	     */
	    public static String md5Summary(String str) {

			if (str == null) {
				return null;
			}

			MessageDigest messageDigest = null;

			try {
				messageDigest = MessageDigest.getInstance("MD5");
				messageDigest.reset();
				messageDigest.update(str.getBytes("utf-8"));
			} catch (NoSuchAlgorithmException e) {

				return str;
			} catch (UnsupportedEncodingException e) {
				return str;
			}

			byte[] byteArray = messageDigest.digest();

			StringBuffer md5StrBuff = new StringBuffer();

			for (int i = 0; i < byteArray.length; i++) {
				if (Integer.toHexString(0xFF & byteArray[i]).length() == 1)
					md5StrBuff.append("0").append(Integer.toHexString(0xFF & byteArray[i]));
				else
					md5StrBuff.append(Integer.toHexString(0xFF & byteArray[i]));
			}

			return md5StrBuff.toString();
		}
}
