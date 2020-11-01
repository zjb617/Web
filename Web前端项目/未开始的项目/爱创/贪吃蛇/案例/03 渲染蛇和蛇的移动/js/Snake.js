function Snake() {
	// 数组属性， 存放的是蛇的每一节身体
	this.arr = [
		{row: 4, col: 4},
		{row: 4, col: 5},
		{row: 4, col: 6},
		{row: 4, col: 7},
		{row: 4, col: 8}
	];
	// 方向属性
	this.direction = 39; // left 37 top 38 right 39 down 40
}

// 移动方法
Snake.prototype.move = function() {
	// 创建新的头部
	var newHead = {
		row: this.arr[this.arr.length - 1].row,
		col: this.arr[this.arr.length - 1].col
	}
	// 判断蛇的移动方向
	if (this.direction === 37) {
		// 表示向左，新的头部应该出现在老的头部的左边，行不变 ，列--
		newHead.col--;
	} else if (this.direction === 38) {
		// 表示向上，新的头部应该出现在上面，列不变， 行--
		newHead.row--;
	} else if (this.direction === 39) {
		// 表示向右， 新头出现在右边。 行不变， 列++
		newHead.col++;
	} else if (this.direction === 40) {
		// 表示向下， 新头应出现在下方， 列不变， 行++ 
		newHead.row++;
	}
	// 将新的头部添加
	this.arr.push(newHead);
	// 去掉尾部
	this.arr.shift();
}