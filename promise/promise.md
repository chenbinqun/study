# <center>简单实现promise</center>

## promise用法
    
    var p = new Promise(function(resolve, reject){
        $.ajax({
            url: 'xxx',
            success: resolve,
            error: reject
        })
    });
    
    p.then(function(data){
        return data.xxx;
    }).then(function(data){
        // 处理
    })
    .catch(function(err){
        // 统一错误处理
    })
    
## 最简单promise函数

    function Promise(fn){
        var callback = null;
        this.then = function(cb) {
            callback = cb;
        };
    
        function resolve(value) {
            callback(value);
        }
    
        fn(resolve);
    }
    
这里就实现了简单Promise啦，下面来试试效果

    var p = new Promise(function(resolve){
        resolve('处理完成');
    });
    
    p.then(function(data){
        console.log(data)
    });

结果发现程序直接报空指针，这是因为我们在创建`var p = new Promise(/.../)`对象的时候，直接在Promise函数里面执行了回调函数，
然而`resolve`就在`then`函数之前执行了。解决这个问题，我们采用`js异步编程`来处理这个问题。

    function Promise(fn){
        var callback = null;
        this.then = function(cb) {
            callback = cb;
        };
    
        function resolve(value) {
            // 1、踢出主线程
            setTimeout(function(){
                callback(value);
            }, 0);
        }
        
        // 2、踢出主线程
        //setTimeout(function(){
            fn(resolve);
        //}, 0);
    }
    
可以在上面1或者2的位置选一个代码块`踢出主线程`。由于js是单线程的，所以`踢出主线程`的代码块会在主线程执行完成之后再执行。详细的可以参考[AlloyTeam - JavaScript定时器与执行机制解析](http://www.alloyteam.com/2016/05/javascript-timer/)和[AlloyTeam - 【转向Javascript系列】从setTimeout说事件循环模型](http://www.alloyteam.com/2015/10/turning-to-javascript-series-from-settimeout-said-the-event-loop-model/)

当然Promise函数不会这么简单就完成的，上面的代码只能调用一次`then`函数，而且当`then`函数也是异步调用并且时间比我们设置`踢出主线程`的时间还要长，那么同样会报空指针的，

## 使用状态控制的Promise

promise有三种状态

* pending（等待）：当前promise处于处理中...
* resolved（处理完成）：promise已经处理完成
* rejected（出错）：promise处理过程中出现错误

`注：只有状态为pending的才可以变更状态值，其他状态都不能变更状态，并且都是最终状态。`
    
    function Promise(fn) {
        // 初始状态
        var state = 'pending'; 
        var value;
        // 延迟回调
        var deferred;
        
        function resolve(newValue) {
            value = newValue;
            // 这里把状态修改为已完成 'resolved'
            state = 'resolved';
            
            // 如果then在resolve函数之前调用，则会直接促发，如果then在resolve之后促发则会先把回调函数存储在deferred上等待resolve函数处理完成
            if(deferred) {
                handle(deferred);
            }
        }
        
        function handle(onResolved) {
            // 如果主线程还没处理完成，则把then的回调赋值给deferred，等待主线程处理完成后处理
            if(state === 'pending') {
                deferred = onResolved;
                return;
            }
            // 主线程处理完成，则直接返回
            onResolved(value);
        }
        
        this.then = function(onResolved) {
            handle(onResolved);
        };
        
        fn(resolve);
    }

目前只是把setTimeout函数去掉，让函数看起来不会那么别扭，哈哈

在上面代码的基础上添加then函数链式调用，then函数链式调用主要有两点要注意，就是接受上一个的返回值和自己可以返回值给下一个then函数使用

    function Promise(fn) {
        var state = 'pending';
        var value;
        var deferred = null;
        
        function resolve(newValue) {
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
            
            // 如果then函数没有回调函数，
            // 如p.then()，
            // 则直接执行then函数新的promise函数回调方法，这样可以把上一次的值存储到下一个then函数的回调中
            // 如 nwe Promise(function(resolve){resolve(123)}).then().then(function(val){console.log(val) // 123})
            if(!handler.onResolved) {
                handler.resolve(value);
                return;
            }
            
            // 正常回调，然后取到then函数返回的值
            var ret = handler.onResolved(value);
            // 存储then函数返回的值
            handler.resolve(ret);
        }
        
        this.then = function(onResolved) {
            return new Promise(function(resolve) {
                handle({
                    onResolved: onResolved, // then函数回调
                    resolve: resolve        // 新的promise回调
                });
            });
        };
        
        fn(resolve);
    }

到了这里promise基本功能已经能用起来了，但是还是少了错误处理，下面把错误处理加上
    
    function reject(reason) {
        state = 'rejected';
        value = reason;
        
        if(deferred) {
            handle(deferred);
        }
    }
    
    function resolve(newValue) {
        try {
            // ... 这里和以前一样
        } catch(e) {
            reject(e);
        }
    }
    
    function handle(handler) {
        if(state === 'pending') {
            deferred = handler;
            return;
        }
        
        var handlerCallback;
        
        // 这里多了一个错误状态判断
        if(state === 'resolved') {
            handlerCallback = handler.onResolved;
        } else {
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
            ret = handlerCallback(value);
        } catch(e) {
            handler.reject(e);
            return;
        }
        
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
    
最终版本

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
        
        // 
        fn(resolve, reject);
    }

以上Promise只是为了理解promise原理和实现，对于生成环境请使用成熟产品
    

转：[JavaScript Promise 探微](http://malcolmyu.github.io/malnote/2014/08/30/JavaScript-Promise-In-Wicked-Detail/)