const { HttpException } = require('../core/http-exception')

// 在整个函数调用链的最外层添加全局异常处理中间件：监听异常，给出有一定意义的错误信息
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        // 针对开发环境的报错
        if(global.config.environment === 'dev') {
            throw error
        }
        
        if(error instanceof HttpException){
            // 针对生产环境的报错
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            ctx.body = {
                msg: 'something went wrong...',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError