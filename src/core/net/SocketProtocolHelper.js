/**
 * Created by Virtue on 16/10/14.
 */
var core = core || {};

core.SocketProtocolHelper =
{

    hLimit:null,

    hBreak:null,

    lock:function ()
    {
        this.loadingCom = core.PopupManager.popup(common.LoadingBarSocket, null, true, "center", null);
    },

    unLock:function ()
    {
        if(this.loadingCom)
        {
            this.loadingCom.close();
            this.loadingCom = null;
        }
    },

    parser:function ($data)
    {
       cc.debug("socket:" + $data);
        var socketData = JSON.parse($data);

        var bigM = socketData[0];

        var data =  socketData[1];

        if(core.SocketProtocolHelper.SOCKET_PROTOCOL[bigM] &&
            typeof core.SocketProtocolHelper.SOCKET_PROTOCOL[bigM] == "function" )
        {
            core.SocketProtocolHelper.SOCKET_PROTOCOL[bigM].apply(null,data);
        }
        
    },

    error:function ($msg)
    {
        core.SocketProtocolHelper.unLock();

        switch($msg)
        {
            case "user_other_login":

                var restartF = function ()
                {
                    cc.game.restart();
                };
                core.PopupManager.popup(
                    common.Common_pop_3,
                    cc.director.getRunningScene().getUiLayer(),
                    true,
                    "center",
                    {"sure":restartF,"cancel":restartF,"txt":core.LanguageManager.getText($msg)}
                );
                break;
            default:
                core.PopupManager.popup(
                    common.Common_pop_3,
                    cc.director.getRunningScene().getUiLayer(),
                    true,
                    "center",
                    {"sure":null,"cancel":null,"txt":core.LanguageManager.getText($msg)}
                );
                break;
        }
    },


    login:function ($uid,$userInfo,$roomInfo)
    {
        if($roomInfo)
        {
            if(game.battle_id != $roomInfo.roomId)
            {   cc.log("---------- s_roomExit last time");
                battlePrepare.BattlePrepareRoom.s_roomExit($roomInfo.roomId);
                game.clearBattleId();
            }
            else{
                cc.log("---------- game.battle_id = " + game.battle_id
                + " , $roomInfo.roomId = " + $roomInfo.roomId);
            }
        }
    },

    pm:function ($uid,$userInfo,$msg)
    {

    },

    cateJoin:function ($cateId,$uid,$userInfo)
    {

    },

    cateOut:function ($cateId,$uid,$userInfo)
    {

    },
    
    cateMsg:function ($cateId,$uid,$userInfo,$msg)
    {
            
    },

    roomEnter:function ($roomId,$roomInfo)
    {
        cc.log("进入房间成功");
        core.SocketProtocolHelper.unLock();
        battlePrepare.BattlePrepareRoom.ENTRY_ROOM($roomId,$roomInfo);
    },
    
    roomJoin:function ($roomId,$uid,$userInfo,$state) {
        battlePrepare.BattlePrepareRoom.PLAYER_JOIN_ROOM($roomId,$uid,$userInfo,$state);
        // prepareRoom.BattlePrepareRoomModel.playerJoinRoom($roomId,$uid,$userInfo,$state);
    },
    
    roomOut:function ($roomId,$uid) {
        // prepareRoom.BattlePrepareRoomModel.roomOutSuccess($roomId,$uid,$userinfo);
        battlePrepare.BattlePrepareRoom.PLAYER_OUT_ROOM($roomId,$uid);
    },
    
    roomMsg:function ($roomId,$uid,$userInfo,$msg) {
        
    },
    
    roomState:function ($roomId,$uid,$state)
    {
        // prepareRoom.BattlePrepareRoomModel.updateRoomInfo($roomId,$uid,$state);
        battlePrepare.BattlePrepareRoom.UPDATE_ROOM_STATE($roomId,$uid,$state);
    },
    
    invite:function ($roomId,$uid,$userInfo,$roomKey,$roomInfo,$camp)
    {
        var inviteData = {};
        inviteData.roomId = $roomId;
        inviteData.uid = $uid;
        inviteData.userInfo = $userInfo;
        inviteData.roomKey = $roomKey;
        inviteData.roomInfo = $roomInfo;
        inviteData.camp = $camp;
        ui.Event.send(common.NoticeEvent.POP_INVITE,inviteData);

        // var inviteCb = function ()
        // {
        //     battlePrepare.BattlePrepareRoom.h_info($roomId,$camp);
        // }.bind(this);
        //
        // var lan = "一起来玩游戏吧?";
        // core.PopupManager.popup(
        //     common.Common_pop_3,
        //     cc.director.getRunningScene().getUiLayer(),
        //     true,
        //     "center",
        //     {"sure":inviteCb,"cancel":null,"txt":lan}
        // );

    },

    heartbeat:function ($id,$time)
    {
        cc.trace("heartbeat");
    },
    
    tick:function ($roomId,$uid,$userInfo)
    {
        battlePrepare.BattlePrepareRoom.BE_TICK($roomId);
    },
    
    start:function ($roomId,$battleServerInfo)
    {
        // prepareRoom.BattlePrepareRoomModel.start($roomId);
        battlePrepare.BattlePrepareRoom.h_start($roomId,$battleServerInfo);
    },
    
    dismiss:function ($roomId,$uid,$userInfo) 
    {
        battlePrepare.BattlePrepareRoom.ROOM_DISMISS($roomId);
        // prepareRoom.BattlePrepareRoomModel.roomDismissSuccess($roomId,$uid,$userInfo);
    },

    notice:function ($type, $data)
    {
        switch ($type)
        {
            case 1://remind
                switch ($data[0])
                {
                    case 1://friendAskNum
                        friend.FriendModel.friendAskNum = $data[1];
                        eventBus.EventBusByJs.dispatchEvent(mainInterface.UiEvent.UPDATE_FRIEND_ASKED_NUM,null);
                        break;
                    case 2://mailNum
                        mail.MailModel.noReadMailNum = $data[1];
                        eventBus.EventBusByJs.dispatchEvent(mainInterface.UiEvent.UPDATE_MAIL_NUM,null);
                        break;
                }
                break;
        }
    },

    roomInfo:function ($roomId,$roomInfo)
    {
        battlePrepare.BattlePrepareRoom.UPDATE_ROOM_INFO($roomId,$roomInfo);
    },

    match:function ($roomId,$waitTime)
    {
        cc.log("开始匹配");
        cc.trace($roomId,"$roomId");
        cc.trace($waitTime,"$waitTime");
    },

    cancel:function ($roomId)
    {
        cc.log("取消匹配");
    }
};

core.SocketProtocolHelper.SOCKET_PROTOCOL =
{

    "-1":core.SocketProtocolHelper.error,

    1:core.SocketProtocolHelper.login,

    3:core.SocketProtocolHelper.heartbeat,

    10:core.SocketProtocolHelper.pm,

    21:core.SocketProtocolHelper.cateJoin,

    22:core.SocketProtocolHelper.cateOut,

    23:core.SocketProtocolHelper.cateMsg,

    30:core.SocketProtocolHelper.roomEnter,

    31:core.SocketProtocolHelper.roomJoin,

    32:core.SocketProtocolHelper.roomOut,

    33:core.SocketProtocolHelper.roomMsg,

    34:core.SocketProtocolHelper.roomState,

    35:core.SocketProtocolHelper.invite,

    36:core.SocketProtocolHelper.tick,

    38:core.SocketProtocolHelper.start,

    39:core.SocketProtocolHelper.dismiss,

    37:core.SocketProtocolHelper.roomInfo,

    40:core.SocketProtocolHelper.match,

    41:core.SocketProtocolHelper.cancel,

    101:core.SocketProtocolHelper.notice
};


