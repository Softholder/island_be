const basicAuth = require('basic-auth') 
const jwt = require('jsonwebtoken')  

class Auth {
    constructor(level){
        // level为权限等级，当用户的权限小于接口权限等级时不可访问接口
        this.level = level || 1
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }

    // m属性的get方法
    get m(){
        return async (ctx, next) => {
            // 自动将响应中的token由base64解码
            const userToken = basicAuth(ctx.req)
            let errMsg = 'token不合法'

            if(!userToken || !userToken.name){
                throw new global.errs.Forbbiden(errMsg)
            }
            try {
                // 校验token的合法性
                // 此处应使用var来声明变量，用let会出错
                var decode = jwt.verify(userToken.name, 
                    global.config.security.secretKey)
            } catch (error) {
                // token合法但过期
                if(error.name == 'TokenExpiredError'){
                    errMsg = 'token已过期'
                }
                // token不合法
                throw new global.errs.Forbidden(errMsg);
            }

            // 用户权限不能访问接口时的异常提示
            if(decode.scope < this.level){
                errMsg = '权限不足'
                throw new global.errs.Forbidden(errMsg);
            }

            // 将token中自定义的uid, scope取出挂载在ctx对象上
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }

            // 触发后续中间件
            await next()
        }
    }
}

module.exports = {
    Auth
}