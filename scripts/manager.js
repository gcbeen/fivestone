fiveStone.manager = {

	personStone: fiveStone.IntBlack,


	subscribe: function () {
		topic.subscribe('computerDown', this.computerDownStone);
		topic.subscribe('personDown', this.personDownStone);
		topic.subscribe('gameOver', this.gameOver);
		topic.subscribe('gameStart', this.start);
		topic.subscribe('rejectStone', this.rejectStone);
	},

	start: function() {
		fiveStone.chessboard.reset();
		fiveStone.stoneArray.reset();
		this.personStone = fiveStone.otherColor(this.personStone);

		if (this.personStone == fiveStone.IntWhite) {
			topic.publish('computerDown', fiveStone.IntBlack);
		}
	},

	rejectStone: function(stone) {
		fiveStone.chessboard.removeStone(stone);
		fiveStone.stoneArray.set(stone);
	},

	// 发布/订阅
	personDownStone: function(x, y) {
		if (fiveStone.stoneArray.get(x, y) != 2) {
			UIHelper.showMessage("这里不能下子");
			return;
		}
		this.downStone(new fiveStone.Stone(x, y, this.personStone) );
		this.computerDownStone(fiveStone.otherColor(this.personStone) );
		//topic.publish('computerDown', fiveStone.otherColor(this.personStone) );
		return;
	},

	showMessage: function (message) {
		UIHelper.showMessage(message);
	},

	// 发布/订阅
	gameOver: function(stone) {
		var state = fiveStone.chessboardState.checkState(stone);
		switch (state) {
			case fiveStone.Default:
				return;
			case fiveStone.BlackWin:
				UIHelper.showMessage("黑方胜");
				topic.publish('gameStart');
				return;
			case fiveStone.BlackDoubleThree:
				UIHelper.showMessage("黑方三三禁手");
				topic.publish('rejectStone', stone);
				return;
			case fiveStone.BlackDoubleFour:
				UIHelper.showMessage("黑方四四禁手");
				topic.publish('rejectStone', stone);
				return;
			case fiveStone.BlackOverline:
				UIHelper.showMessage("黑方长连禁手");
				topic.publish('rejectStone', stone);
				return;
			case fiveStone.WhiteWin:
				UIHelper.showMessage("白方胜");
				topic.publish('gameStart');
				return;
			case fiveStone.Tie:
				UIHelper.showMessage("平局了，牛呀！");
				topic.publish('gameStart');
				return;
			default:
				UIHelper.showMessage("内部错误，热。");
				topic.publish('gameStart');
				return;
		}
	},

	computerDownStone: function(intColor) {
		var maxWeight,
		count = 0;
		do {
			maxWeight = fiveStone.stoneAI.calMax(intColor);
			count += 1;
			if (count > 100) {
				UIHelper.showMessage("异常！");
				topic.publish('gameStart');
				return;
			}
		} while (fiveStone.stoneArray.get(maxWeight.x, maxWeight.y) < 2);
		
		fiveStone.manager.downStone(new fiveStone.Stone(maxWeight.x, maxWeight.y, intColor) );
			//topic.publish('personDown');
		return;
	},

	downStone: function(stone) {
		fiveStone.chessboard.drawStone(stone);
		fiveStone.stoneArray.set(stone);
		//fiveStone.addStoneState(stone);
		//this.gameOver(stone);
		topic.publish('gameOver', stone);
	}

};
