fiveStone.chessboard = {
	canvas: document.getElementById('canvas'),

	getImgSrc: function (intColor) {
		if (intColor == fiveStone.IntBlack ) {
			return "images/blackstone.gif";
		} else if (intColor == fiveStone.IntWhite) {
			return "images/whitestone.gif";
		} else {
			return "";
		}
	},

	drawStone: function(stone) {
		var imgEle = document.createElement('img');
		imgEle.src = this.getImgSrc(stone.intColor);
		imgEle.id = "chess" + stone.x + stone.y;
		imgEle.style.width = "40px";
		imgEle.style.height = "40px";
		imgEle.style.position = "absolute";
		imgEle.style.left = stone.x * 40 + "px";
		imgEle.style.top = stone.y * 40 + "px";
		this.canvas.appendChild(imgEle);
	},

	removeStone: function(stone) {
		document.getElementById("#chess" + stone.x + stone.y).remove();
	},

	reset: function() {
		this.canvas.innerHTML = "";
	}

};

fiveStone.chessboardState = {

	checkReject: function (stateArray) {
		var state;
		state = this.rejectDouble(stateArray, 3);
		state = state || this.rejectDouble(stateArray, 4);
		state = state || this.rejectOverLine(stateArray);
		return state;
	},

	rejectDouble: function (stateArray, count) {
		var num = 0,
		i; 
		for (i = 0; i < stateArray.length; i += 1) {
			if (stateArray[i].open && stateArray[i].count == count) {
				num += 1;
			}
		}
		if (num > 1) {
			if (count == 3) {
				return fiveStone.BlackDoubleThree;
			} else if (count == 4) {
				return fiveStone.BlackDoubleFour;
			}
		}
	},

	rejectOverLine: function (stateArray) {
		var i;
		for (i = 0; i < stateArray.length; i += 1) {
			if (Math.abs(stateArray[i].count) > 5 ) {
				return fiveStone.BlackOverline;
			}
		}
	},

	checkState: function(stone) {

		//m,n点四个方向的连子数，依次正东正西，正南正北方，西北东南，西南东北
		var state;
		//检查是否失败
		state = fiveStone.isReject(stone);
		state = state || fiveStone.isWin(stone);
		state = state || fiveStone.isTie();
		state = state || fiveStone.Default;
		return state;
	}

}
