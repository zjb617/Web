/**
 * Game 整个游戏类
 * @map 地图的实例
 * @food 食物的实例
 * @snake 蛇的实例
 * @block 障碍物的实例
 */

function Game(map, food, snake, block) {
	this.map = map;
	this.food = food;
	this.snake = snake;
	this.block = block;
	this.flag = null;
	this.timer = null;
	this.init();
}

// 定义初始化方法
Game.prototype.init = function() {
	this.renderMap();
	this.renderFood();
	this.renderSnake();
	this.bindEvent();
	this.start();
}
// 渲染地图
Game.prototype.renderMap = function() {
	this.map.fill();
}

// 渲染食物
Game.prototype.renderFood = function() {
	var row = this.food.row;
	var col = this.food.col;
	// 渲染食物就是渲染食物在地图中的坐标系的背景图案
	// 地图中的数组就是用来简化代码的书写的
	this.map.arr[row][col].style.backgroundColor = "red";
}

// 渲染蛇的方法
Game.prototype.renderSnake = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")";
	// 渲染蛇就是在地图中渲染蛇的每一节身体坐标元素的背景图案
	for (var i = 1; i < this.snake.arr.length - 1; i++) {
		// 提取变量简化代码书写
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		// this.map.arr[row][col].style.backgroundColor = "green";
		// 渲染背景图片
		this.map.arr[row][col].style.backgroundImage = "url(" + this.snake.body_pic[0] + ")";
	}

	// 获取蛇的尾部
	var tail = this.snake.arr[0];
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx] + ")";
}

// 游戏开始
Game.prototype.start = function() {
	this.flag = true;
	// 缓存this
	var me = this;
	this.timer = setInterval(function() {
	
		// 移动
		me.snake.move();
		// 检测是否撞墙
		me.checkMap();
		// 检测是否吃到食物
		me.checkFood();
		// 检测是否吃到自己
		me.checkSnake();
		// 判断游戏是否在运行
		if (me.flag) {
			// 清屏
			me.map.clear();
			// 渲染食物
			me.renderFood();
			// 渲染蛇
			me.renderSnake();
		}
	}, 200)
}

// 绑定事件
Game.prototype.bindEvent = function() {
	// 在一个类的原型方法中不要出现除了this的 其它全局变量， 除了document, window
	// 缓存this
	var me = this;
	// 给document添加onkeydown事件
	document.onkeydown = function(e) {
		// 获取用户按下的数字
		var code = e.keyCode;
		// console.log(code);
		if (code === 37 || code === 38 || code === 39 || code === 40) {
			// 调用蛇的转向方法
			me.snake.change(code);
		}
	}
}

// 结束游戏
Game.prototype.gameOver = function() {
	this.flag = false;
	// 停止定时器
	clearInterval(this.timer);
}

//检测是否超过边界
Game.prototype.checkMap = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 与地图的row、 col进行判定
	if (head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
		console.log("撞墙了");
		// 游戏结束
		this.gameOver();
	}
}

// 检测蛇是否吃到食物
Game.prototype.checkFood = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 获取食物
	var food = this.food;
	// 判断蛇的头部否与食物重合
	if (head.row === food.row && head.col === food.col) {
		console.log("吃到食物了");
		// 调用蛇生长的方法
		this.snake.growUp();
		// 重置食物
		this.resetFood();
	}
}

// 重置食物方法
Game.prototype.resetFood = function() {
	// 随机生成row和col
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);

	// 检测食物的合法性
	// 与蛇的每一节身体作比较
	for (var i = 0; i < this.snake.arr.length; i++) {
		// 提取变量简化书写
		var one = this.snake.arr[i];
		if (one.row === row && one.col === col) {
			alert("与蛇的身体重合了");
			this.resetFood();
			return;
		}
	}
	this.food.reset(row, col);
}

// 检测蛇是否吃到自己
Game.prototype.checkSnake = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 循环与蛇的每一节身体作比较
	for (var i = 0; i < this.snake.arr.length - 1; i++) {
		var one = this.snake.arr[i];
		if (head.row === one.row && head.col === one.col) {
			console.log("吃到自己了");
			// 结束游戏
			this.gameOver();
		}
	}
}
