#!/usr/bin/python
#encoding=utf-8
import itchat,sys
reload(sys)
sys.setdefaultencoding("utf-8")
itchat.auto_login(hotReload=True)
itchat.update_chatroom(10)
users = itchat.search_friends("小琪")
print users
if len(users) > 0:
	userName = users[0]['UserName']
	print itchat.send("游戏包发好了",toUserName = userName)

