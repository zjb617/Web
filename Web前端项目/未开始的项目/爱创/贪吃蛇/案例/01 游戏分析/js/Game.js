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
}