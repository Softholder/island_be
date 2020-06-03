const Router = require('koa-router')
const { TokenValidator, NotEmptyValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const { WXManager } = require('../../services/wx')

const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    // 处理不同类型的登录方式
    let token
    switch(v.get('body.type')){
        // 邮箱登录
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'),
                v.get('body.secret'))
            break;
        // 小程序登录
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManager.codeToToken(v.get('body.account'))
            break;
        case LoginType.ADMIN_EMAIL:
            break
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    ctx.body = {
        token
    }
})

router.post('/verify', async (ctx) => {
    // 验证token不为空
    const v = await new NotEmptyValidator().validate(ctx)
    // 验证token合法性
    const result = Auth.verifyToken(v.get('body.token'))
    ctx.body = {
        is_valid: result
    }
})

async function emailLogin(account, secret){
    // 验证账号密码
    const user = await User.verifyEmailPassword(account, secret)
    // 生成令牌并返回，普通用户的权限是8
    return generateToken(user.id, Auth.USER)
}

module.exports = router