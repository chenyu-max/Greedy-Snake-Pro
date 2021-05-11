const oGame = new Game();
oGame.timer = null;
oGame.score = 0;

// 游戏初始化
oGame.init = function () {
    restartBtn.style.display = 'none';
    oGame.score = 0;
    oGround.init();
    // next hit delay
    document.onkeydown = function (e) {
        if (e.key === 'ArrowLeft' && oSnake.direction !== DirectionNum.RIGHT) {
            oSnake.direction = DirectionNum.LEFT;
        } else if (e.key === 'ArrowUp' && oSnake.direction !== DirectionNum.DOWN) {
            oSnake.direction = DirectionNum.UP;
        } else if (e.key === 'ArrowDown' && oSnake.direction !== DirectionNum.UP) {
            oSnake.direction = DirectionNum.DOWN;
        } else if (e.key === 'ArrowRight' && oSnake.direction !== DirectionNum.LEFT) {
            oSnake.direction = DirectionNum.RIGHT;
        }
    }
};

// 游戏开始
oGame.start = function () {
    this.timer = setInterval(() => {
        oSnake.move(oGround);
    }, Interval);
};

// 游戏结束
oGame.over = function () {
    clearInterval(this.timer);
    alert(`最终得分为：${this.score}`);
    const restartBtn = document.getElementById('restart');
    restartBtn.style.display = 'block';
    restartBtn.parentNode.style.display = 'block';
};

function createFood(ground) {
    let foodX = null;
    let foodY = null;
    let flag = true;
    while (flag) {
        foodX = Math.floor(Math.random() * 28 + 1);
        foodY = Math.floor(Math.random() * 28 + 1);
        if (ground.SquareTable[foodY][foodX].type === 'floor') {
            flag = false;
            break;
        }
    }
    const oFood = SquareFactory.create('Food', foodX, foodY, 'food');
    ground.remove(foodX, foodY);
    ground.append(oFood);
}

oGame.init();
