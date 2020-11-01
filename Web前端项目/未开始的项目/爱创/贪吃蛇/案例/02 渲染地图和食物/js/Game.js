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

	this.init();
}

// 定义初始化方法
Game.prototype.init = function() {
	this.renderMap();
	this.renderFood();
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