const { HttpException } = require('../core/http-exception')

// 在整个函数调用链的最外层添加全局异常处理中间件：监听异常，给出有一定意义的错误信息
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        if(error instanceof HttpException){
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }
    }
}

module.exports = catchError