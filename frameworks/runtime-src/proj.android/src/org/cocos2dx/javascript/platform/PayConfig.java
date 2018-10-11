package org.cocos2dx.javascript.platform; 

public class PayConfig {	
	
	/**
	 * appid		-- 应用appid
	 * privateKey   -- 应用私钥
	 * publicKey	-- 平台公钥(platKey)
	 * notifyurl	-- 商户服务端接收支付结果通知的地址
	 * */
	

	/**线上环境*/
	public static final String appid = "3003446214";
	public static final String privateKey = "MIICWwIBAAKBgQCGMqeNSLg1xXT1N72RCAIKG1xQ89QU5bijlyqfgb2XCmRYEFyqq1XBTk6PuVybTWaPA+0J2xSfF3SHkCBfHcRfNchuoD794cP49t3OWirk01cXStLXhbLu/giBKRy9aEunPaJbTc4ZfpsIcD1W9f6iYgyoaqFS4NQSNf1L1Iq5zwIDAQABAoGAR9vV9oSLB1gNccWAP6nvFaRjAYIe/XWpMggfLbxWXguVgcZ5KHaIe/NHhBR4rzx5/3jVs+JZH3t6zaByhRw2awsHlR+HF0IEBZ2sxsGF4BqZJ43LLAyAcjGRgMXS4RO1/aiqQ7v/sdFlURLvgs7RpyTguqRBhiSmV59wZwfphTECQQD0ao6SHjUi4XEMo6tqM61bwUDx5uiivpEnnC/cRLxRYHnZ+GsxuRIV1zmC9LF4nDBp92IasPULo2CWoKa4ieopAkEAjI7YQ3AJnHNup6iDMt6zg3PE3KIQ7UuM1qqC7M03P/dx00bA5wfN+60JmRMPWdriYTBg9A71XHh7IZU//hFzNwJAfGU7OLztGFqbGe63EG9KvRdHgZafMi1BXWKNrVLCcbxjZ/+aNw1VWg5XNAJrzNHZhiUlJiaIISs+vor3L5bpuQJAMVxMuEoVJfsnpfs4r9mjgwtZ2/2SIjNA73YL6msa9vzH3WFghwGnpbWbxET8RBrpGyZpNew24FVzMFUAlxG7uwJAX04LKkaeTnunAliglXWbD/uF6A15cGekgNERvNky2BPQr/4NBHY7MQZBZlOhcF/aRGGj1vOGfsi2E/EJU4iUmA==" ;
	public static final String publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCcqNHnyAC6UYMKvGk3c9d0t68q3cwR96n2eP78hfSBOnf7hCksCI7wr/LCHrfqouYv7GbnQ7KVGZWbYTQbzMyynn+6tT0H+nns4xwSjKwivHdGS7DPlUHUqoYOXwPUSoVsVkLpjCjM9nXMEof0OezgpMjrHYDo5sMkNbPhZOyYswIDAQAB";
	public static final String notifyurl = "http://test.hope.maple-game.com/service.php?m=Sdk&a=pay&pt=maple";

}
