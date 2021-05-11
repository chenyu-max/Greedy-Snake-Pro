const oSnake = new Snake();
oSnake.head = null;
oSnake.tail = null;

oSnake.init = function (ground) {
    const snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'snake-head');
    const snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'snake-body');
    const snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'snake-body');

    // 显示初始的蛇
    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);

    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);

    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);

    // 形成双向链表
    snakeHead.next = snakeBody1;
    snakeHead.last = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;

    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    oSnake.head = snakeHead;
    oSnake.tail = snakeBody2;

    // 默认的方向
    this.direction = DirectionNum.RIGHT;

};

// 蛇触发的状态方法
oSnake.stategies = {
    move(snake, square, ground, flag) {
        // flag 表示是否吃到食物的移动   为true 表示吃到了食物，此时尾部不删除，若是没吃到食物，伤处尾部
        // 在原蛇头处创建一个新的蛇身体
        const newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'snake-body');
        newBody.next = snake.head.next;
        snake.head.next.last = newBody;
        newBody.last = null;
        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        // 新建蛇头
        const newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'snake-head');
        newHead.viewContent.style.transform = 'rotate(' + snake.direction.rotate + 'deg)';
        ground.remove(square.x, square.y);
        ground.append(newHead);
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;
        snake.head = newHead;

        if (!flag) {
            // 删除最后一节身体，添加地板
            const newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'floor');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);
            snake.tail = snake.tail.last;
            snake.tail.next = null;
        }
    },
    eat(snake, square, ground) {
        this.move(snake, square, ground, true);
        oGame.score += 1;
        createFood(oGround);
    },
    die() {
        oGame.over();
    },
};

// 做一个预判，以蛇头为参考，根据自身的方向，判断下一个碰到的方块是什么
oSnake.move = function (ground) {
    const nextSquare = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    if (typeof nextSquare.touch === 'function') {
        this.stategies[nextSquare.touch()](this, nextSquare, oGround);
    }
};
