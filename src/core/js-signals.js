var signals = signals || {};

/**
 * signals.event.on(mainUI.GameSetView.SELECT_SUREHEADICON,function (d) {
            cc.log("customEvent 选择新的头像");
            this.userIcon1.loadTexture("hicon_" + d + ".png",1);
        },this);

 * signals.event.send(mainUI.GameSetView.SELECT_SUREHEADICON,d);
 * signals.event.remove(mainUI.GameSetView.SELECT_SUREHEADICON,this);
 */


(function(global){

	function SignalBinding(signal, listener, isOnce, listenerContext, priority) {
		this._listener = listener;
		this._isOnce = isOnce;
		this.context = listenerContext;
		this._signal = signal;
		this._priority = priority || 0;
	}

	SignalBinding.prototype = {
		active : true,
		params : null,
		execute : function (paramsArr) {
			var handlerReturn, params;
			if (this.active && !!this._listener) {
				params = this.params? this.params.concat(paramsArr) : paramsArr;

				// cc.log("[signal] parma " + paramsArr.length);

				handlerReturn = this._listener.apply(this.context, params);
				if (this._isOnce) {
					this.detach();
				}
			}
			return handlerReturn;
		},
		detach : function () {
			return this.isBound()? this._signal.remove(this._listener, this.context) : null;
		},
		isBound : function () {
			return (!!this._signal && !!this._listener);
		},
		isOnce : function () {
			return this._isOnce;
		},
		getListener : function () {
			return this._listener;
		},
		getSignal : function () {
			return this._signal;
		},
		_destroy : function () {
			delete this._signal;
			delete this._listener;
			delete this.context;
		},
		toString : function () {
			return '[SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
		}

	};

	function validateListener(listener, fnName) {
		if (typeof listener !== 'function') {
			throw new Error( 'listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName) );
		}
	}

	function Signal() {
		this._bindings = [];
		this._prevParams = null;
		var self = this;
		this.dispatch = function(){
			Signal.prototype.dispatch.apply(self, arguments);
		};
	}

	Signal.prototype = {
		VERSION : '1.0.0',
		memorize : false,
		_shouldPropagate : true,
		active : true,
		_registerListener : function (listener, isOnce, listenerContext, priority) {

			var prevIndex = this._indexOfListener(listener, listenerContext),
				binding;

			if (prevIndex !== -1) {
				binding = this._bindings[prevIndex];
				if (binding.isOnce() !== isOnce) {
					throw new Error('You cannot add'+ (isOnce? '' : 'Once') +'() then add'+ (!isOnce? '' : 'Once') +'() the same listener without removing the relationship first.');
				}else{
					cc.log("--------- customEvent replace");
				}
				
			} else {
				binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
				this._addBinding(binding);
			}

			if(this.memorize && this._prevParams){
				binding.execute(this._prevParams);
			}

			return binding;
		},
		_addBinding : function (binding) {
			//simplified insertion sort
			var n = this._bindings.length;
			do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
			this._bindings.splice(n + 1, 0, binding);
			// cc.log("_registerListener   index = " + (n + 1));
		
		},

		_indexOfListener : function (listener, context) {
			var n = this._bindings.length,
				cur;
			while (n--) {
				cur = this._bindings[n];
				if (cur._listener === listener && cur.context === context) {
					return n;
				}
			}
			return -1;
		},

		_indexOfContext : function (context) {
			var n = this._bindings.length,
				cur;
			while (n--) {
				cur = this._bindings[n];
				if (cur.context === context) {
					return n;
				}
			}
			return -1;
		},

		has : function (listener, context) {
			return this._indexOfListener(listener, context) !== -1;
		},
		add : function (listener, listenerContext, priority) {
			validateListener(listener, 'add');
			return this._registerListener(listener, false, listenerContext, priority);
		},
		addOnce : function (listener, listenerContext, priority) {
			validateListener(listener, 'addOnce');
			return this._registerListener(listener, true, listenerContext, priority);
		},
		remove : function (listener, context) {
			validateListener(listener, 'remove');

			var i = this._indexOfListener(listener, context);
			if (i !== -1) {
				this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
				this._bindings.splice(i, 1);
			}
			return listener;
		},
		
		removeByTarget : function (context) {
			
			var i = this._indexOfContext(context);
			if (i !== -1) {
				this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
				this._bindings.splice(i, 1);
				return true;
			}
			
			return false;
		},
		removeAll : function () {
			var n = this._bindings.length;
			while (n--) {
				this._bindings[n]._destroy();
			}
			this._bindings.length = 0;
		},
		getNumListeners : function () {
			return this._bindings.length;
		},
		halt : function () {
			this._shouldPropagate = false;
		},
		dispatch : function (params) {
			if (! this.active) {
				return;
			}

			var paramsArr = Array.prototype.slice.call(arguments),
				n = this._bindings.length,
				bindings;

			if (this.memorize) {
				this._prevParams = paramsArr;
			}

			if (! n) {
				//should come after memorize
				return;
			}

			// cc.log("customEvent dispatch [signal] parma " + arguments.length  + "   " + paramsArr.length);
				
			bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
			this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.
			do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
		},
		forget : function(){
			this._prevParams = null;
		},
		dispose : function () {
			this.removeAll();
			delete this._bindings;
			delete this._prevParams;
		},
		toString : function () {
			return '[Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';
		}

	};


	//-------------------------- dispatcher -----------------

	var __SIGNAL_ID__ = 1;

	var dispatcher = {
		
		_eventManager : {},
		
		_nodeEventMap : {},

		
		together : function (type,func,targetObj,priority) {
			this.__on__(type,func,targetObj,1,priority,"add");
		},

		on : function (type,func,targetObj,priority) {
			this.__on__(type,func,targetObj,1,priority,"add");
		},
		
		alone : function (type,func,targetObj,priority) {
			this.__on__(type,func,targetObj,0,priority,"add");
		},
		
		togetherOnce : function (type,func,targetObj,priority) {
			this.__on__(type,func,targetObj,1,priority,"addOnce");
		},
		
		aloneOnce : function (type,func,targetObj,priority) {
			this.__on__(type,func,targetObj,0,priority,"addOnce");
		},
		
		__on__ :function(type,func,targetObj, multiple,priority,methond){

				cc.assert(!cc.isUndefined(targetObj),"事件需要指定回调上下文");
				// cc.log("--------- customEvent add " + type);

				if(!this._eventManager[type]){
					this._eventManager[type]= new Signal();
				}

				if(!multiple){
					this._eventManager[type].removeAll();
				}
				this._eventManager[type][methond](func,targetObj,priority);
				if(targetObj && targetObj.onExit){
					if(cc.isUndefined(targetObj.___SIGNAL_ID__)){
						targetObj.___SIGNAL_ID__ = "" + __SIGNAL_ID__++;
						if(!this._nodeEventMap[targetObj.___SIGNAL_ID__]){
							this._nodeEventMap[targetObj.___SIGNAL_ID__] = [];
							var fun = targetObj.onExit;
							var that = this;
							targetObj.onExit = function () {
								// cc.log("--------- customEvent  onExit");
								that.__removeAllByTarget(targetObj);
								fun.apply(targetObj);
							}
						}
					}
					this._nodeEventMap[targetObj.___SIGNAL_ID__].push(type);
				}
			},
			
		__removeAllByTarget : function (targetObj) {
			var list = this._nodeEventMap[targetObj.___SIGNAL_ID__];
			if(list){
				for(var i = 0,len = list.length; i < len;i++){
					this.remove(list[i], targetObj);
				}
			}
		},
		
		remove:function(type,target){
			// cc.log("--------- customEvent remove " + type);
			if(this._eventManager && this._eventManager[type])
				return this._eventManager[type].removeByTarget(target);
			return false;	
		},
		
		removeAll:function(type){
			if(this._eventManager && this._eventManager[type])
				this._eventManager[type].removeAll();
				
		},
		send:function(type){
			// cc.log("--------- customEvent send " + type);
			var sig = this._eventManager[type];
			if(sig){
				sig.dispatch.apply(sig,Array.prototype.slice.call(arguments,1));
			}
		}
	}

	
	global.event = dispatcher;
	global.Signal = Signal;

	var tempEventData = {};

	global.set = function (evt,data,rest) {
		if(!tempEventData.hasOwnProperty(evt)){
			tempEventData[evt] = data;
		}else{
			cc.assert(rest,"[global save] save has contains the key " + evt + " and value is " + tempEventData[evt]);
			if(evt)
				tempEventData[evt] = data;
		}
	};

	global.get = function(evt,del){
		if(tempEventData.hasOwnProperty(evt)){
			var t = tempEventData[evt];
			if(cc.isUndefined(del) || del == true)
			{
				delete tempEventData[evt];
				cc.log("[global save] delete " + evt);
			}
			return t;
		}

		return null;
	};

	global.delete = function(evt){
		if(tempEventData.hasOwnProperty(evt)){
			delete tempEventData[evt];
			return true;
		}

		return false;
	};

	if(typeof define === 'function' && define.amd){ //AMD
		define(function () { return dispatcher; });
	} else if (typeof module !== 'undefined' && module.exports){ //node
		module.exports = dispatcher;
	} else { //browser
		global.event = dispatcher;
	}
}(signals));
