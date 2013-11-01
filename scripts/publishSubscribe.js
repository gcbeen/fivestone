
/**
 * 事件对象的构造函数
 */

function SubscribeEvent(name) {
	this.name = name;
	this.handlers = [];
}

SubscribeEvent.prototype = {
	getName: function(){
		return this.name;
	},

	fire: function(evtArgs){
		var i,
		length = this.handlers.length;
		for(i = 0; i < length; i += 1){
			// var h = this.handlers[i];
			// h(evtArgs);
			this.handlers[i](evtArgs);
		}
	},

	addHandler: function(handler){
		this.handlers.push(handler);
	},

	removeHandler: function(handler){
		var i,
			length = this.handlers.length;
		for(var i = 0; i < length; i += 1 ){
			if(handler === this.handlers[i]){   
				this.handlers.splice(i, 1);
				break;
			}
		}
	}
};

/**
 * 事件订阅发布函数
 */
var topic = {

	events: [],

	getEvent: function (evtName) {
		var i,
		length = this.events.length;
		for(i = 0; i < length; i += 1){
			if( evtName === this.events[i].getName() ){
				return this.events[i];
			}
		}

		this.events.push( new SubscribeEvent(evtName) );

		return this.events[i];
	},
	// 发布事件的方法
	publish: function (evtName, evtArgs) {
		this.getEvent(evtName).fire(evtArgs);
	},
	// 订阅事件的方法 
	subscribe: function (evtName, handler) {
		this.getEvent(evtName).addHandler(handler);
	},
	// 取消订阅的方法 
	unsubscribe: function (evtName, handler) {
		this.getEvent(evtName).removeHandler(handler);
	}

};
