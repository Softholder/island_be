const Router = require('koa-router')

const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')

const router = new Router({
    // 指定路由前缀
    prefix: '/v1/user'
})

router.post('/register', async (ctx) => {
    // 校验器要放在正常的业务代码之前
    // 添加await的原因是异步验证出现错误时不能阻止后续代码的执行
    const v = await new RegisterValidator().validate(ctx)
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    }
    // 将用户数据存入数据库,create方法返回的是promise，仍然是user模型
    const r = await User.create(user)
})

// 路由一定要导出，否则不能自动加载
module.exports = router