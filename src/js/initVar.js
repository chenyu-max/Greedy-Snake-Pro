// 初始化定义一些变量

// 游戏场景 宽度系数—控制每行有多少个方块  高度系数-控制一共多少行
const XLen = 30;
const YLen = 30;

// 每个方块的大小
const SquareSize = 20;

// 定义游戏地图的位置
const Base_X_Point = 100;
const Base_Y_Point = 100;

// 定义蛇的移动事件间隔
const Interval = 300;

// 定义方块
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}

Square.prototype.touch = function () {
    console.log('touch');
};

const Floor = tool.extend(Square);
const Stone = tool.extend(Square);
const Food = tool.single(Square);
const SnakeHead = tool.single(Square);
const SnakeBody = tool.extend(Square);
const Ground = tool.single(Square);

// const Game = tool.single();
