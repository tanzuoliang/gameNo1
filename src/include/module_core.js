/**.............................................
 *  ┏┓　　　┏┓
 *┏┛┻━━━┛┻┓
 *┃　　　　　　　┃ 　
 *┃　　　━　　　┃
 *┃　┳┛　┗┳　┃
 *┃　　　　　　　┃
 *┃　　　┻　　　┃
 *┃　　　　　　　┃
 *┗━┓　　　┏━┛
 *　　┃　　　┃神兽保佑
 *　　┃　　　┃代码无BUG！
 *　　┃　　　┗━━━┓
 *　　┃　　　　　　　┣┓
 *　　┃　　　　　　　┏┛
 *　　┗┓┓┏━┳┓┏┛
 *　　　┃┫┫　┃┫┫
 *　　　┗┻┛　┗┻┛
 *　　　
 *
 *  Created by luoyangwang on 2017/11/6.
 *............................................**/
var module = module || {};
module.module_core =[
    "src/png.js",
    "src/app.js",
    "src/core/prototype.js",
    "src/core/js-signals.js",
    "src/core/manager/loading.js",
    "src/core/base/object/BaseObject.js",
    "src/core/ui/base/Layer.js",
    "src/core/ui/base/Node.js",
    "src/core/ui/base/Pane.js",
    "src/core/ui/base/Scene.js",


    "src/core/help/ClassHelp.js",
    "src/core/help/Fonts.js",
    "src/core/help/common.js",
    "src/core/help/ShowOpenGl.js",
    "src/core/help/ButtonStyle.js",

    "src/core/eventBus/EventBusByJs.js",


    "src/core/utils/show3D.js",
    "src/core/utils/md5.js",
    "src/core/utils/Base64.js",
    
    "src/core/utils/astar/Graph.js",
    "src/core/utils/astar/BinaryHeap.js",
    "src/core/utils/astar/GridNode.js",
    "src/core/utils/astar/astar.js",

    "src/cube/uicore/ui/base/Node.js",
    "src/cube/uicore/ui/base/Icon.js",
    "src/cube/uicore/ui/base/Scene.js",
    "src/cube/uicore/ui/base/TouchNode.js",

    "src/cube/uicore/ui/Pane.js",
    "src/core/ui/component/tableView.js",
    "src/cube/uicore/ui/Effect.js",
    "src/cube/uicore/ui/GridList.js",
    "src/cube/uicore/ui/ScrollList.js",
    "src/cube/uicore/ui/NewRichText.js",
    "src/cube/uicore/ui/Item.js",
    "src/cube/uicore/ui/Layer.js",
    "src/cube/uicore/ui/Layout.js",
    "src/cube/uicore/ui/SpriteEffect.js",
    "src/cube/uicore/ui/TabbedButton.js",
    "src/cube/uicore/ui/ToggleBtn.js",

    "src/cube/uicore/utils/aStar.js",
    "src/cube/uicore/utils/aStar2.js",
    "src/core/manager/LanguageManager.js",
    "src/core/manager/EffectManager.js",
    "src/core/manager/TimeManager.js",
    "src/core/manager/UpdateManager.js",
    "src/core/manager/NoticeManager.js",

    "src/core/net/NetSocketManager.js",
    "src/core/net/SocketProtocolHelper.js",
    "src/core/net/HttpRequest.js",

    "src/cube/alert/HttpLoadLayer.js",
    "src/cube/alert/AlertLayer.js",
    "src/cube/alert/MessageLayer.js",
    "src/cube/alert/RewardAlertLayer.js",
    "src/cube/alert/view/component/MessageLabel.js",


    "src/cube/start/StartGame.js",
    "src/cube/start/model/StartModel.js",
    "src/cube/game/const/vo/base/BaseVO.js",
    "src/cube/game/const/vo/GuildInfoVO.js",
    "src/cube/game/const/vo/UserInfoVo.js",
    "src/cube/game/const/vo/UserDayVo.js",
    "src/cube/game/const/vo/ResInfoVO.js",
    "src/cube/game/const/GameConst.js",
    "src/cube/uicore/gameManager/SceneManager.js",
    "src/cube/uicore/gameManager/LayerManager.js",
    "src/cube/uicore/gameManager/ConfigManager.js",
    "src/cube/uicore/gameManager/ConfigManagerL.js",
    "src/cube/uicore/gameManager/LanguageManager.js",
    "src/cube/uicore/gameManager/ActivityManager.js",
    "src/cube/uicore/gameManager/NoticeManager.js",
    "src/cube/uicore/gameManager/BeatManager.js",
    "src/cube/uicore/gameManager/ModuleOpenManager.js",
    "src/cube/uicore/gameManager/PointManager.js",
    "src/cube/uicore/gameManager/MusicManager.js",
    "src/cube/uicore/gameManager/GuideManager.js",
    "src/cube/uicore/gameManager/RemindManager.js",
    "src/cube/uicore/gameManager/ComponentManager.js",
    "src/cube/uicore/gameManager/notice/NoticeProctol.js",
    "src/cube/uicore/gameManager/socket/SocketProctol.js",



    "src/cube/gameConfig/gameConfig.js",
    "src/cube/uicore/common/md5Manager.js",

    "src/cube/uicore/ui/component/AnimText.js",
    "src/cube/uicore/ui/component/GemText.js",
    "src/cube/uicore/ui/component/GemTextL.js",
    "src/cube/uicore/ui/component/HeroIcon.js",
    "src/cube/uicore/ui/component/JumpNumberText.js",
    "src/cube/uicore/ui/component/PopupLayer.js",
    "src/cube/uicore/ui/component/RichText.js",
    "src/cube/uicore/ui/component/RichTextNode.js",
    "src/cube/uicore/ui/component/TextControl.js",
    "src/cube/uicore/ui/component/TypeScroll.js",
    "src/cube/uicore/ui/component/TypeScrollItem.js",

    "src/cube/uicore/component/card/base/CardBase.js",
    "src/cube/uicore/component/card/base/card.js",
    "src/cube/uicore/component/card/base/TextureCard.js",
    "src/cube/uicore/component/card/CardChip.js",
    "src/cube/uicore/component/card/DragCard.js",

    "src/cube/uicore/component/RewardIcon.js",
    "src/cube/uicore/component/item/ItemIcon.js",
    "src/cube/uicore/component/item/HeadIcon.js",
    "src/cube/uicore/component/item/ItemStarIcon.js",
    "src/cube/uicore/component/card/base/CardBaseNew.js",
    "src/cube/uicore/component/card/HeroCardNew.js",
    "src/cube/uicore/component/progressBar/HeroTatterBar.js",


    "src/cube/onlineUpdate/CubeUpdateLayer.js",
    "src/cube/onlineUpdate/CubeUpdateScene.js",


    "src/cube/main/model/LoginModel.js",
    "src/cube/main/view/component/SeverItem.js",
    "src/cube/main/view/component/SeverTeam.js",
    "src/cube/main/view/LoginGame.js",
    "src/cube/main/view/SeverSelect.js",
    "src/cube/main/MainLayer.js",
    "src/cube/main/LoginLayer.js",
    "src/cube/uicore/component/item/itemFactory.js"
]