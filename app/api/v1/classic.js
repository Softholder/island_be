const Router = require('koa-router')
const { Flow } = require('../../models/flow')
const router = new Router({
    prefix: '/v1/classic'
})
const { PositiveIntegerValidator } = require('../../validators/validator')

const { Auth } = require('../../../middlewares/auth')

// 校验token合法性中间件要放在业务中间件之前
router.get('/latest', new Auth().m, async (ctx, next) => {
    // const path = ctx.params
    // const query = ctx.request.query
    // const header = ctx.request.header
    // const body = ctx.request.body

    // // 所有的参数均保存在ctx对象中，在其中遍历查询，因此使用其作为参数且变量名不能重复
    // // 返回值仍然是PositiveIntegerValidator类型
    // const v = await new PositiveIntegerValidator().validate(ctx)
    // // get方法的第一个参数是要获取值的路径，第二个参数是否转换类型
    // const id = v.get('path.id', parsed=false)

    // // if(true){
    // //     const error = new global.errs.ParameterException()
    // //     // 抛出异常则后面的代码不会被执行
    // //     throw error
    // // }

    // findOne取降序的第一个
    const flow = await Flow.findOne({
        order: [
            // 根据index降序排序
            ['index', 'DESC']
        ]
    })
    ctx.body = flow

})

module.exports = router