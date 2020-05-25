const Router = require('koa-router')
const { TokenValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { generateToken } = require('../../../core/util')

const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    // 处理不同类型的登录方式
    let token
    switch(v.get('body.type')){
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'),
                v.get('body.secret'))
            break;
        case LoginType.USER_MINI_PROGRAM:

            break;
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    ctx.body = {
        token
    }
})

async function emailLogin(account, secret){
    // 验证账号密码
    const user = await User.verifyEmailPassword(account, secret)
    // 生成令牌并返回
    return generateToken(user.id, 2)
}

module.exports = router