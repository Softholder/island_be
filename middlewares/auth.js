const basicAuth = require('basic-auth') 
const jwt = require('jsonwebtoken')  

class Auth {
    constructor(){

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