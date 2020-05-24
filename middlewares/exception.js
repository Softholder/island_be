const { HttpException } = require('../core/http-exception')

// 在整个函数调用链的最外层添加全局异常处理中间件：监听异常，给出有一定意义的错误信息
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        // 针对开发环境的报错
        const isHttpException = error instanceof HttpException
        const isDev = global.config.environment === 'dev'
        // 当处于开发环境且error不是HttpException时才抛出异常
        if (isDev && !isHttpException) {
            throw error
        }
        
        if (isHttpException) {
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