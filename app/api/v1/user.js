const Router = require('koa-router')

const { RegisterValidator } = require('../../validators/validator')

const router = new Router({
    // 指定路由前缀
    prefix: '/v1/user'
})

router.post('/register', async (ctx) => {
    const v = new RegisterValidator().validate(ctx)
})

// 路由一定要导出，否则不能自动加载
module.exports = router