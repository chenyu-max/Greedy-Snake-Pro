// 符合单一职责原则
const tool = {
    inherit: function (target, origin) {
        const Fun = function () {
        };
        Fun.prototype = origin.prototype;
        target.prototype = new Fun();
        // 让子类的constructor重新指向自己，若不修改则会发现constructor指向的是父类的构造函数
        target.prototype.constructor = target;
    },
    extend: function (origin) {
        // 返回一个构造函数
        const result = function () {
            // 调用父类的构造函数来创建对象
            origin.apply(this, arguments);
            return this;
        }
        // 原型继承
        this.inherit(result, origin);
        return result;
    },
    single: function (origin) {
        // 单例模式应用，例如 蛇头 食物等  无需创建第二个，因此使用单例模式
        const singleResult = (function () {
            let instance;
            return function () {
                if (typeof instance == 'object') {
                    return instance;
                }
                origin && origin.apply(this, arguments);
                instance = this;
            }
        })();
        origin && this.inherit(singleResult, origin);
        return singleResult;
    },
};
