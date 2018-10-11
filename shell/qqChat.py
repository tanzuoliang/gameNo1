#!/usr/bin/python
#encoding=utf-8
import sys
reload(sys)
sys.setdefaultencoding("utf-8")

from qqbot import _bot as bot
bot.Login(['-q', '393433696'])


g = bot.List('group', "英澈网络")
if len(g) > 0:
	f = g[0]
	bot.SendTo(f, '游戏包发好了@全体成员')
	