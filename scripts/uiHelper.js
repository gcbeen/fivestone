UIHelper = {

	info: "欢迎使用五子棋人机对战版",

	showMessage: function(msg) {
		alert(msg);
	},

	btnStartClick: function(event) {
		topic.publish('gameStart');
	},

	canvasClick: function(e) {
		var offsetLef = this.offsetLeft;
		var offsetTop = this.offsetTop;
		var positionX = e.clientX - offsetLef || e.layerX - offsetLef || 0;
		var positionY = e.clientY - offsetTop || e.layerY - offsetTop || 0;

		var x = Math.floor(positionX / 40);
		var y = Math.floor(positionY / 40);
		fiveStone.manager.personDownStone(x, y);
	}

};


window.onload = function () {
	var canvas = document.getElementById('canvas');
	var btnStart = document.getElementById('btnStart');
	var btnTest = document.getElementById('btnTest');
	btnStart.addEventListener('click', UIHelper.btnStartClick, false);
	canvas.addEventListener('click', UIHelper.canvasClick, false);
	btnTest.addEventListener('click', function () {
		alert(UIHelper.info);
	});	
	fiveStone.manager.subscribe();
};
