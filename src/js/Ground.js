const oGround = new Ground(Base_X_Point, Base_Y_Point, XLen * SquareSize, YLen * SquareSize);
oGround.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = '50%';
    this.viewContent.style.top = '50%';
    this.viewContent.style.transform = 'translateX(-50%) translateY(-50%)';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.backgroundColor = '#225675';
    document.body.appendChild(this.viewContent);

    this.SquareTable = [];
    for (let y = 0; y < YLen; y++) {
        this.SquareTable[y] = new Array(XLen);
        for (let x = 0; x < XLen; x++) {
            let newSquare = null;
            if (x === 0 || y === 0 || x === XLen - 1 || y === YLen - 1) {
                newSquare = SquareFactory.create('Stone', x, y, 'stone');
            } else {
                newSquare = SquareFactory.create('Floor', x, y, 'floor');
            }
            this.viewContent.appendChild(newSquare.viewContent);
            this.SquareTable[y][x] = newSquare;
        }
    }
};

oGround.remove = function (x, y) {
    const curSquare = this.SquareTable[y][x];
    this.viewContent.removeChild(curSquare.viewContent);
    this.SquareTable[y][x] = null;
};

oGround.append = function (square) {
    this.viewContent.appendChild(square.viewContent);
    this.SquareTable[square.y][square.x] = square;
};
