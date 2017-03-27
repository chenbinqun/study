
function Promise(fn) {
    var state = 'pending';
    var value;
    var deferred = null;

    // 成功
    function resolve(newValue) {
        try {
            // 解决then函数中返回promise对象
            // 如：new Promise(...).then(function(val){return new Promise(...);})...
            if(newValue && typeof newValue.then === 'function') {
                newValue.then(resolve);
                return;
            }
            state = 'resolved';
            value = newValue;

            if(deferred) {
                handle(deferred);
            }
        } catch(e) {
            reject(e);
        }
    }

    // 失败
    function reject(reason) {
        state = 'rejected';
        value = reason;

        if(deferred) {
            handle(deferred);
        }
    }

    /**
     *  控制器
     *  @param {
	 *            onResolved: fn, // then函数回调函数
	 *            resolve: fn     // then函数新的promise函数的回调
	 *          }
     */
    function handle(handler) {
        if(state === 'pending') {
            deferred = handler;
            return;
        }

        var handlerCallback;

        // 如果then函数没有回调函数，
        // 如p.then()，
        // 则直接执行then函数新的promise函数回调方法，这样可以把上一次的值存储到下一个then函数的回调中
        // 如 nwe Promise(function(resolve){resolve(123)}).then().then(function(val){console.log(val) // 123})
        if(state === 'resolved') {
            handlerCallback = handler.onResolved;
        } else {
            // 出错回调
            handlerCallback = handler.onRejected;
        }

        if(!handlerCallback) {
            if(state === 'resolved') {
                handler.resolve(value);
            } else {
                handler.reject(value);
            }
            return;
        }

        // 这里把业务处理代码try..catch...以便捕获异常
        var ret;
        try {
            // 正常回调，然后取到then函数返回的值
            ret = handlerCallback(value);
        } catch(e) {
            handler.reject(e);
            return;
        }

        // 存储then函数返回的值
        handler.resolve(ret);
    }

    this.then = function(onResolved, onRejected) {
        return new Promise(function(resolve, reject) {
            handle({
                onResolved: onResolved,
                onRejected: onRejected, // 只需要加上then函数的第二回调函数
                resolve: resolve,
                reject: reject          // 这里跟上
            });
        });
    };

    // 异常捕获
    this.catch = function(onRejected){
        this.then(null, onRejected);
    }

    fn(resolve, reject);
}