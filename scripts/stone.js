fiveStone.stoneArray = {
	
	arr: (function () {
		var x,
			y,
			array = new Array();
		for (x = 0; x < fiveStone.Width; x += 1) {
			array[x] = new Array();
			for (y = 0; y < fiveStone.Height; y += 1) {
				array[x][y] = fiveStone.IntNull;
			}
		}
		return array;
	}()),

	reset: function () {
		var i, j;
		for (i = 0; i < fiveStone.Width; i += 1) {
			for (j = 0; j < fiveStone.Height; j += 1) {
				this.arr[i][j] = fiveStone.IntNull;
			}
		}
	},

	get: function (x, y) {
		return this.arr[x][y];
	},

	set: function (stone) {
		this.arr[stone.x][stone.y] = stone.intColor;
	},

	get4_9: function (x, y) {
		var array = new Array(),
			leftArray = new Array(),
			rightArray = new Array(),
			i = 0;
		// 竖向   |
		//        |
		array.push(this.arr[x].slice(y-4, 9));
		
		// 横向  ----
		while (i < 5) {
			leftArray[i] = this.arr[x - i][y];
			rightArray[i] = this.arr[x + i][y];
			i += 1;
		}
		delete leftArray[0];
		array.push(leftArray.reserve().concat(rightArray) );
		
		// \
		//  \
		i = 0;
		while (i < 5) {
			leftArray[i] = this.arr[x - i][y - i];
			rightArray[i] = this.arr[x + i][y + i];
			i += 1;
		}
		delete leftArray[0];
		array.push(leftArray.reserve().concat(rightArray) );
		//    /
		//  /
		i = 0;
		while (i < 5) {
			leftArray[i] = this.arr[x - i][y + i];
			rightArray[i] = this.arr[x + i][y - i];
		}
		delete leftArray[0];
		array.push(leftArray.reserve().concat(rightArray) );
		
		return array;
	}

};


fiveStone.Stone = function (x, y, intColor) {
	this.x = x;
	this.y = y;
	this.intColor = intColor;
	this.stateArray = new Array();

	this.addState = function (count, openCount) {
		var addPoint = false,
			open = openCount >= 2;
		if ( openCount >= 2 || ( count == 4 && openCount >= 1 ) || count == 5 )	{
			addPoint = true;
		}
		this.stateArray.push({count: count, addPoint: addPoint, open: open});
	};

};

