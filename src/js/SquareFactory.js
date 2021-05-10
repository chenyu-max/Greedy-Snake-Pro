function SquareFactory() {

}

SquareFactory.create = function (type, x, y, color) {
    if (typeof SquareFactory.prototype[type] == 'undefined') {
        throw new Error('no this type');
    }
    if (SquareFactory.prototype[type].prototype.__proto__ !== SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }
    return SquareFactory.prototype[type](x, y, color);
};

SquareFactory.prototype.init = function (square, color) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.backgroundColor = color;
    square.viewContent.style.left = square.x * SquareSize + 'px';
    square.viewContent.style.top = square.y * SquareSize + 'px';
};

SquareFactory.prototype.Floor = function (x, y, color) {
    const oFloor = new Floor(x, y, SquareSize, SquareSize);
    this.init(oFloor, color);
    return oFloor;
}

SquareFactory.prototype.Stone = function (x, y, color) {
    const oStone = new Stone(x, y, SquareSize, SquareSize);
    this.init(oStone, color);
    return oStone;
}

SquareFactory.prototype.Food = function (x, y, color) {
    const oFood = new Food(x, y, SquareSize, SquareSize);
    this.init(oFood, color);
    return oFood;
}

SquareFactory.prototype.SnakeHead = function (x, y, color) {
    const oSnakeHead = new SnakeHead(x, y, SquareSize, SquareSize);
    this.init(oSnakeHead, color);
    return oSnakeHead;
}

SquareFactory.prototype.SnakeBody = function (x, y, color) {
    const oSnakeBody = new SnakeBody(x, y, SquareSize, SquareSize);
    this.init(oSnakeBody, color);
    return oSnakeBody;
}
