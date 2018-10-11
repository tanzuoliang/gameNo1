var tank = {};
tank.Slide = (function () {

	var __Slider__ = cc.Node.extend({

		leftBar : null,
		rightBar : null,
		label : null,
		slierBar : null,
		listener : null,
		_name : "",

		angleList : null,

		angleIndex : 0,

		__value__ : 0,

		ctor : function (_name) {
			this._super();
			this._name = _name;
			this.listener = cc.EventListener.create({
				event : cc.EventListener.TOUCH_ONE_BY_ONE,
				onTouchBegan:this.onTouchBegan.bind(this),
				onTouchMoved : this.onTouchMoved.bind(this),
				onTouchEnded:this.onTouchEnded.bind(this)
			});

			this.leftBar = this.createView(-210,0,cc.color(255,255,255,255),30,30);
			this.rightBar = this.createView(210,0,cc.color(255,255,255,255),30,30);
			this.slierBar = this.createView(0,0,cc.color(255,0,0,255),30,30);

			cc.eventManager.addListener(this.listener.clone(), this.leftBar);
			cc.eventManager.addListener(this.listener.clone(), this.rightBar);
			cc.eventManager.addListener(this.listener.clone(), this.slierBar);
			
			this.label = new cc.LabelTTF(this._name + ":0", "Arial", 20);
			this.label.setAnchorPoint(cc.p(0,0));
			this.label.x = 250;
			this.addChild(this.label);

			this.angleList = [-180,-90,0,90,180];
		},

		createView : function(x,y,c,w,h){
			var l = cc.LayerColor.create(c,w,h);
			l.x = x;
			l.y = y;
			this.addChild(l);
			return l;
		},

		onTouchBegan : function (touch,event) {
			var target = event.getCurrentTarget();
			var locationinNode = target.convertToNodeSpace(touch.getLocation());
			var s = target.getContentSize();
			var rect = cc.rect(0,0,s.width,s.height);
			if(cc.rectContainsPoint(rect,locationinNode)){
				target.opacity = 180;
				return true;
			}

			return false;
		},

		onTouchMoved  :function (touch,event) {
			var target = event.getCurrentTarget();
			if(target != this.slierBar)return;
			var pos = touch.getLocation();
			var _x = pos.x - this.x;
			if(_x > -180 && _x < 180){
				this.slierBar.x = _x;
				this.label.setString(this._name + ":" + _x);
			}
		},

		value : function () {
			return this.slierBar.x;
		},

		intValue : function () {
			return this.__value__;
		},

		onTouchEnded : function (touch,event) {
			var target = event.getCurrentTarget();
			target.opacity = 255;
			if(target == this.rightBar){
				this.slierBar.x = 0;
				this.label.setString(this._name + ":0");
				if(this._name == "px" || this._name == "py"){
					this.__value__ += 10;
				}

			}
			else if(target == this.leftBar){
				this.angleIndex = ++this.angleIndex % this.angleList.length;
				this.slierBar.x = this.angleList[this.angleIndex];
				this.label.setString(this._name + ":" + this.slierBar.x);

				if(this._name == "px" || this._name == "py"){
					this.__value__ -= 10;
				}
			}
		}
	});

	__Slider__.create = function (x,y,parent,_name) {
		var s = new __Slider__(_name);
		s.x = x;
		s.y = y;
		parent.addChild(s);
		return s;
	};

	return __Slider__;

})();



var __panel = cc.Node.extend({

	xSlider : null,
	ySlider : null,
	zSlider : null,
	skxSlier : null,
	skySlider : null,
	view : null,
	xP : null,
	yP : null,
	attachNode : null,

	ctor : function () {
		this._super();

		this.xSlider = tank.Slide.create(200,600,this,"x");
		this.ySlider = tank.Slide.create(200,550,this,"y");
		this.zSlider = tank.Slide.create(200,500,this,"z");
        
		this.skxSlier = tank.Slide.create(200,450,this,"skx");
		this.skySlider = tank.Slide.create(200,400,this,"sky");
		this.xP = tank.Slide.create(200,350,this,"px");
		this.yP = tank.Slide.create(200,300,this,"py");
		this.xP.__value__ = 100 + cc.winSize.width/2;
		this.yP.__value__ = cc.winSize.height / 2;
        
        
		var modelName = "res/3d/afei_idle.c3b";
		this.view = new jsb.Sprite3D(modelName);
		var scale = 0.2;
		this.view.setPosition(cc.p(200,800));

		//this.view.setTexture("res/tank/test/canzhanzhe.jpg");
		this.view.setScale(3);
		this.view.setVertexZ(1000);
		var animation = new jsb.Animation3D(modelName);
		var animate = new jsb.Animate3D(animation);
		this.view.runAction(cc.RepeatForever.create(animate));
		this.view.setGlobalZOrder(100);
		this.addChild(this.view);
        
		this.scheduleUpdate();
        
		//this.attachNode = this.view.getAttachNode("Bone001");
		//this.attachNode.addChild(cc.LayerColor.create(cc.color(255,0,0,255),50,50));
		

	},

	update : function (dt) {
		var _x = this.xSlider.value();
		var _y = this.ySlider.value();
		var _z = this.zSlider.value();
		this.view.setRotation3D({x:_x,y:_y,z:_z});

	}
});