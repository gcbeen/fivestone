fiveStone.StepNode = function (stone, parentNode, leftChild, nextSibling) {
	this.stone = stone;
	this.parentNode = parentNode;
	this.leftChild = leftChild;
	this.nextSibling = nextSibling;

	this.x = stone.x;
	this.y = stone.y;
	this.weight = stone.weight;

	this.preMax = 0;
}

fiveStone.stoneAI = {
	
	calMax: function (intColor, step) {
		var maxArray = this.calculateMaxWeightPoint(intColor),
			maxPoint = {x: maxArray[0].x, y: maxArray[0].y, weight: maxArray[0].weight};
		step = step || 2;
		//  2, 4, 6 	2 * (n - 1)
		//  2, 3, 4
		//  
		if (step > 1) {
			this.stepWeight(maxArray, intColor, step );
		}
		return maxArray[0].weight > maxPoint.weight ?  maxArray[0] : maxPoint;
	},

	calculateMaxWeightPoint: function(intColor) {
		//权值数组
		var weightArray = new Array(fiveStone.Width),
			maxWeight;
		//基本思路：先计算每个点的权值，在权值最高的位置下棋
		this.init(weightArray, intColor);
		this.sortWeight(weightArray);
		return this.maxWeightArray(weightArray);
		//return weightArray[0];
	},

	init: function (weightArray, intColor) {
		var x,
		y ;
		for (x = 0; x < fiveStone.Width; x += 1) {
			//weightArray[x] = new Array(fiveStone.Height);
			for (y = 0; y < fiveStone.Height; y += 1) {
				if (fiveStone.stoneArray.get(x, y) < fiveStone.IntNull) {
					weightArray.push({x: x, y: y, weight: -1}); 	//当已有子时标注为-1
				}
				else { //if (fiveStone.stoneArray.get(x, y) == fiveStone.IntNull ) 
					weightArray.push({x: x, y: y, weight: this.Check(x, y, intColor)} );
				}
			}
		}
	},

	maxWeightArray: function (weightArray) {
		var max = weightArray[0].weight,
			i = 0,
			maxArray = [];
		while (weightArray[i].weight >= max) {
			maxArray[i] = weightArray[i];
			i += 1;
		}
		if (i < 10) {
			maxArray = weightArray.slice(0, 10);
		}
		return maxArray;
	},

	/*
	maxWeight: function (weightArray) {
		var max = 0,
		x, 
		y,
		xx,
		yy;
		for (x = 0; x < fiveStone.Width; x += 1) {
			for (y = 0; y < fiveStone.Height; y += 1) {
				weight = weightArray[x][y];
				if (weight > max) {
					xx = x;
					yy = y;
					max = weight;
				}
			}
		}
		return [xx, yy];
	},
	*/

	sortWeight: function (weightArray) {
		weightArray.sort(function (a, b) { return b.weight - a.weight; } );
	},

	stepSortWeight: function (weightArray, step) {
		var i = 0,
			len = weightArray.length;
		this.sortWeight(weightArray);
		
		while (i < len) {
			weightArray[i].weight = weightArray[i].weight / step;
			i += 1;
		}
	},
	
	
	rootNode: function () {
		return new StepNode(null, null);
	},

	createTree(rootNode(), step * 2 - 1 );
	
	rootNode
	
	
	// 压栈创建一棵树。
	createTree: function (parentNode) {
		var i,
			len,
			stackArray = new Array(),
			node;
		
		while (parentNode || stackArray.length != 0) {
			if (parentNode) {
				if (parentNode.intColor == null) {
					fiveStone.stoneArray.set(new fiveStone(parentNode.x, parentNode.y, parentNode.intColor) );
				}
				maxArray = this.calculateMaxWeightPoint(fiveStone.otherColor(parentNode.intColor) );
				i = 0;
				len = maxArray.length;
				while (i < len) {
					node = new StepNode(maxArray[i], parentNode, maxArray[i + 1]);
					parentNode.leftChild = maxArray[i];
					i += 1;
				}
				stackArray.push(parentNode);
				parentNode = parentNode.leftChild;
			} else {
				node = stackArray.pop();
				fiveStone.stoneArray.set(new fiveStone(node.x, node.y, fiveStone.IntNull) );
				parentNode = node.nextSibling;
			}
		}

	},
	
	searchTree: function (parentNode) {
		if (node.leftChild) {
			index += 1;
			searchTree(node.leftChild, index);
		} else {

			step = (index + 1) / 2;
			node.weight = node.weight / step;
		}
	}

	
	fiveStone.stoneArray.set(rootNode.x, rootNode.y, intColor);

	stepWeight: function (maxArray, intColor, step, index) {
		var len = maxArray.length,
			i = 0,
			weightPoint,
			maxAry;
			preNode;
		while (i < len) {
			fiveStone.stoneArray.set(new fiveStone.Stone(maxArray[i].x, maxArray[i].y, intColor) );

			maxAry = this.calculateMaxWeightPoint(fiveStone.otherColor(intColor) );
			index = index || 0;
			if (index < (step - 1) * 2 ) {
				index += 1;
				preNode = maxArray[i - 1];
				this.stepWeight(maxAry, fiveStone.otherColor(intColor), step, index );

				if (intColor != fiveStone.personStone ) {
					maxArray[i].weight = maxAry[maxAry.length-1].weight;
				}
				
				if (intColor == fiveStone.personStone ) {
					maxArray[i].weight = maxAry[0].weight;
					this.sortWeight(maxArray);
				}

			} else {
				this.stepSortWeight(maxArray);
			}

			fiveStone.stoneArray.set(new fiveStone.Stone(maxArray[i].x, maxArray[i].y, fiveStone.IntNull) );
			i += 1;
		}

	},

	Check: function(x, y, intColor) {
		var sumWeight = 0,
		otherColor = fiveStone.otherColor(intColor),
		mine = { weight5: 100000, weight4: 10000, weight3: 1000, weight2: 100, weightReject: -100000 }, 
		other = { weight5: 50000, weight4: 5000,  weight3: 500,  weight2: 50};

		sumWeight += this.stoneWeight(new fiveStone.Stone(x, y, intColor), mine);
		sumWeight += this.stoneWeight(new fiveStone.Stone(x, y, otherColor), other);

		fiveStone.stoneArray.set(new fiveStone.Stone(x, y, fiveStone.IntNull) );
		return sumWeight;
	},
	stoneWeight: function (stone, weightObj) {
		var i,
		count,
		addPoint = false,
		weight = 0;

		fiveStone.stoneArray.set(stone);

		fiveStone.addStoneState(stone);
		//中心点权值加1
		if (stone.x == 7 && stone.y == 7) { 
			weight += 1; 
		}

		for (i = 0; i < 4; i += 1) {

			count = Math.abs(stone.stateArray[i].count);

			addPoint = stone.stateArray[i].addPoint;

			if ( count >= 2 && count <= 5 && addPoint ) {
				weight += weightObj["weight" + count];
			}

			if ( stone.intColor == fiveStone.intBlack && weightObj.weightReject ) {
				if ( !fiveStone.isReject(stone) ) {
					weight += weightObj.weightReject;
				}
			}
		}

		return weight;
	}


};


