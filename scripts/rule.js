var fiveStone = {
	Width: 15,
	Height: 15,

	IntBlack: 0,
	IntWhite: 1,
	IntNull: 2,

	//棋盘状态
	Default: 0, //默认
	BlackWin: 1, //黑方胜
	WhiteWin: 2,    //白方胜
	BlackDoubleThree: 3, //黑方三三禁手
	BlackDoubleFour: 4, //黑方四四禁手
	BlackOverline: 5, //黑方长连禁手
	Tie: 6,   //平局
	
	// 100
	BlackWeight5 = [0, 0, 0, 0, 0], 
	WhiteWeight5 = [1, 1, 1, 1, 1],

	BlackWeight4 = [2, 0, 0, 0, 0, 2],
	WhiteWeight4 = [2, 0, 0, 0, 0, 2],

	BlackWeight4- = [1, 0, 0, 0, 0, 2],
	WhiteWeight4- = [0, 1, 1, 1, 1, 2],

	
	BlackWeight3 = [2, 0, 0, 0, 2],
	WhiteWeight3 = [2, 1, 1, 1, 2],

	BlackWeight3- = [1, 0, 0, 0, 2],
	WhiteWeight3- = [0, 1, 1, 1, 2],

	BlackWeight2 = [2, 0, 0, 2],
	WhiteWeight2 = [2, 0, 0, 2],

	BlackWeight2- = [1, 0,  0, 2],
	WhiteWeight2- = [0, 1,  1, 2],

	//2 2 2
	//2 0 2
	//
	BlackWeight1 = [2, 0, 2],
	WhiteWeight1 = [2, 1, 2],

	StoneWeight: function () {
	
		this.arr = (function () {
			var x,
				y,
				array = new Array();
			for (x = 0; x < fiveStone.Width; x += 1) {
				array[x] = new Array();
				for (y = 0; y < fiveStone.Height; y += 1) {
					array[x][y] = 0;
				}
			}
			array[7][7] = 1;
			return array;
		}());
	
		this.reset = function() {
			var i, j;
			for (i = 0; i < fiveStone.Width; i += 1) {
				for (j = 0; j < fiveStone.Height; j += 1) {
					this.arr[i][j] = 0;
				}
			}
			this.arr[7][7] = 1;
		};
	
		this.get = function(x, y) {
			return this.arr[x][y];
		};
	
		this.set = function(weight) {
			this.arr[x][y] = weight;
		};

	},

	blackWeight: new this.StoneWeight(),

	whiteWeight: new this.StoneWeight(),

	otherColor: function (intColor) {
		if ( intColor == this.IntBlack ) {
			return this.IntWhite;
		} else {
			return this.IntBlack;
		}
	},

	isReject: function (stone) {
		if (stone.intColor != this.IntWhite) {
			return fiveStone.chessboardState.checkReject(stone.stateArray);
		}
	},

	isWin: function (stone) {
		var length = stone.stateArray.length,
		i;
		for (i = 0; i < length; i += 1) {
			if (Math.abs(stone.stateArray[i].count) == 5) {
				return stone.intColor == this.IntBlack ? this.BlackWin : this.WhiteWin;
			}
		}
	},

	isTie: function () {
		//当所有位置都有子时为平局
		var i, j, n = 0;

		for (i = 0; i < this.Width; i++) {
			for (j = 0; j < this.Height; j++) {
				if (this.getStoneColor(i, j) == 2) {
					n += 1;
				}
			}
		}

		if (n = 0) {
			return this.Tie;
		}
	},

	addStoneState: function (stone) {
		var x = stone.x,
		y = stone.y;

		this.Xnum(x, y, stone);
		this.Ynum(x, y, stone);
		this.YXnum(x, y, stone);
		this.XYnum(x, y, stone);

	},

	getStoneColor: function (x, y) {
		return fiveStone.stoneArray.get(x, y);
	},
	
	// 记录权重
	changeWeight: function (x, y, intColor) {
		var nearByArray = fiveStone.stoneArray.get4_9(x, y),
			i = 0;
		this.BlackWeight5 

		while (i < nearByArray.length) {

			nearByArray[i]
		}
		


		blackWeight[x][y].weight = ;
		whiteWeight[x][y].weight = ;
	},

	check100: function (nearByArray, ) {
		var i,
			length = nearByArray.length;
		for (i = 0; i < length; i += 1) {
			if () {
				return 100;
			}
		}
	},

	check90: function () {
		
		return 90;
	},
	
	check80: function () {
		
		return 80;
	},

	check70: function () {
		
		return 70;
	},

	check60: function () {
		
		return 60;
	},

	check50: function () {
		
		return 50;
	},

	check40: function () {
		
		return 40;
	},

	check30: function () {
		
		return 30;
	},

	check20: function () {
		
		return 20;
	},

	check10: function () {
		
		return 10;
	},

	check0: function () {
		
		return 0;
	},


	//从左到右
	Xnum: function (x, y, intColor) {

		var openNum = 0,
		count = 0,
		color;
		//先找到最左边的X
		while (x > 0) {
			color = this.getStoneColor(x - 1, y);
			if (color == stone.intColor) {
				x -= 1;
			} else {
				if (color == this.IntNull) {
					openNum += 1;
				}
				break;
			}
		}
		//向右扫描
		while (x < this.Width) {
			color = this.getStoneColor(x, y);
			if (color != stone.intColor) {
				if (color == this.IntNull) {
					openNum += 1;
				}
				break;
			}
			count += 1;
			x += 1;
		}

		stone.addState(count, openNum);
	},

		//从上到下
		Ynum: function (x, y, stone) {

			var openNum = 0,
			count = 0,
			color;
			//先找到最上面的y
			while (y > 0) {
				color = this.getStoneColor(x, y - 1);
				if (color == stone.intColor) {
					y -= 1;
				} else {
					if (color == this.IntNull) {
						openNum += 1;
					}
					break;
				}
			}
			//向下扫描
			while (y < this.Height) {
				color = this.getStoneColor(x, y);
				if (color != stone.intColor) {
					if (color == this.IntNull) {
						openNum += 1;
					}
					break;
				}
				count += 1;
				y += 1;
			}
			stone.addState(count, openNum);

		},

		//从左上到右下
		YXnum: function (x, y, stone) {
			var openNum = 0,
			count = 0,
			color;
			//找到左上角的坐标
			while (x > 0 && y > 0) {
				color = this.getStoneColor(x - 1, y - 1);
				if (color == stone.intColor) {
					x -= 1;
					y -= 1;
				} else {
					if (color == this.IntNull) {
						openNum += 1;
					}
					break;
				}
			}
			//向右下扫描
			while (x < this.Width && y < this.Height) {
				color = this.getStoneColor(x, y);
				if (color != stone.intColor) {
					if (color == this.IntNull) {
						openNum += 1;
					}
					break;
				}
				x += 1;
				y += 1;
				count += 1;
			}
			stone.addState(count, openNum);
		},
		//从左下到右上
		XYnum: function (x, y, stone) {
			var openNum = 0,
			count = 0,
			color;

			//找到左下角的坐标
			while (x > 0 && y < this.Height - 1) {
				color = this.getStoneColor(x - 1, y + 1)
					if (color == stone.intColor) {
						x -= 1;
						y += 1;
					}
					else {
						if (color == this.IntNull) {
							openNum += 1;
						}
						break;
					}
			}

			//向左上扫描
			while (x < this.Width && y >= 0) {
				color = this.getStoneColor(x, y);
				if (color != stone.intColor) {
					if (color == this.IntNull) {
						openNum += 1;
					}
					break;
				}
				x += 1;
				y -= 1;
				count += 1;
			}
			stone.addState(count, openNum);
		}
};

