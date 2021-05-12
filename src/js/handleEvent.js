// 点击开始按钮
startBtn.onclick = function () {
    oSnake.init(oGround);
    createFood(oGround);
    this.style.display = 'none';
    this.parentNode.style.display = 'none';
    oGame.start();
}

// 点击重新开始事件
restartBtn.onclick = function () {
    oGame.init();
    restartBtn.parentNode.style.display = 'none';
    startBtn.onclick();
};

speed.innerHTML = Level + '';

// 加快速度
speedUp.onclick = function () {
    if (Level < 8) {
        Level += 1;
        Interval -= 30;
    }
    speed.innerHTML = Level + '';
}

// 减慢速度
speedDown.onclick = function () {
    if (Level > 1) {
        Level -= 1;
        Interval += 30;
    }
    speed.innerHTML = Level + '';
}
