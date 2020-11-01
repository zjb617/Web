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
	this.timer = null;
	this.init();
}

// 定义初始化方法
Game.prototype.init = function() {
	this.renderMap();
	this.renderFood();
	this.renderSnake();
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
	// 渲染蛇就是在地图中渲染蛇的每一节身体坐标元素的背景图案
	for (var i = 0; i < this.snake.arr.length; i++) {
		// 提取变量简化代码书写
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		this.map.arr[row][col].style.backgroundColor = "green";
	}
}

// 游戏开始
Game.prototype.start = function() {
	// 缓存this
	var me = this;
	this.timer = setInterval(function() {
		// 清屏
		me.map.clear();
		// 移动
		me.snake.move();
		// 渲染食物
		me.renderFood();
		// 渲染蛇
		me.renderSnake();
	}, 200)
}