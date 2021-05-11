function SquareFactory() {

}

SquareFactory.create = function (type, x, y, className) {
    if (typeof SquareFactory.prototype[type] == 'undefined') {
        throw new Error('no this type');
    }
    if (SquareFactory.prototype[type].prototype.__proto__ !== SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }
    return SquareFactory.prototype[type](x, y, className);
};

SquareFactory.prototype.init = function (square, className, message) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.type = className;
    square.viewContent.className = className;
    square.viewContent.style.left = square.x * SquareSize + 'px';
    square.viewContent.style.top = square.y * SquareSize + 'px';
    square.touch = function () {
        return message;
    };
};

SquareFactory.prototype.Floor = function (x, y, className) {
    const oFloor = new Floor(x, y, SquareSize, SquareSize);
    this.init(oFloor, className, StrategyEnum.MOVE);
    return oFloor;
}

SquareFactory.prototype.Stone = function (x, y, className) {
    const oStone = new Stone(x, y, SquareSize, SquareSize);
    this.init(oStone, className, StrategyEnum.DIE);
    return oStone;
}

SquareFactory.prototype.Food = function (x, y, className) {
    const oFood = new Food(x, y, SquareSize, SquareSize);
    this.init(oFood, className, StrategyEnum.EAT);
    oFood.update(x, y);
    return oFood;
}

SquareFactory.prototype.SnakeHead = function (x, y, className) {
    const oSnakeHead = new SnakeHead(x, y, SquareSize, SquareSize);
    this.init(oSnakeHead, className, StrategyEnum.DIE);
    oSnakeHead.update(x, y);
    return oSnakeHead;
}

SquareFactory.prototype.SnakeBody = function (x, y, className) {
    const oSnakeBody = new SnakeBody(x, y, SquareSize, SquareSize);
    this.init(oSnakeBody, className, StrategyEnum.DIE);
    return oSnakeBody;
}
