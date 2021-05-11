// 初始化定义一些变量

// dom 元素初始化
const restartBtn = document.getElementById('restart');
const startBtn = document.getElementById('start');
const speedUp = document.getElementById('speed-up');
const speedDown = document.getElementById('speed-down');
const speed = document.getElementById('speed');

// 游戏场景 宽度系数—控制每行有多少个方块  高度系数-控制一共多少行
const XLen = 30;
const YLen = 30;

// 每个方块的大小
const SquareSize = 20;

// 定义游戏地图的位置
const Base_X_Point = 100;
const Base_Y_Point = 100;

// 方向枚举
const DirectionNum = {
    LEFT: {
        x: -1,
        y: 0,
        rotate: 180, //蛇头在不同的方向中 应该进行旋转
    },
    RIGHT: {
        x: 1,
        y: 0,
        rotate: 0,
    },
    UP: {
        x: 0,
        y: -1,
        rotate: -90,
    },
    DOWN: {
        x: 0,
        y: 1,
        rotate: 90,
    },
};

// 定义蛇的移动事件间隔
let Level = 1;
let Interval = 300;

// 定义方块
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}

Square.prototype.touch = function () {
};

// 单例模式下的 方块状态更新
Square.prototype.update = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SquareSize + 'px';
    this.viewContent.style.top = y * SquareSize + 'px';
}

// 初始化构造函数
const Floor = tool.extend(Square);
const Stone = tool.extend(Square);
const Food = tool.single(Square);
const SnakeHead = tool.single(Square);
const SnakeBody = tool.extend(Square);
const Ground = tool.single(Square);
const Snake = tool.single();
const Game = tool.single();

// 蛇的状态枚举
const StrategyEnum = {
    MOVE: 'move',
    EAT: 'eat',
    DIE: 'die',
};
