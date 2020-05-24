const Router = require('koa-router')
const router = new Router()
const { PositiveIntegerValidator } = require('../../validators/validator')

router.post('/v1/:id/classic/latest', async (ctx, next) => {
    const path = ctx.params
    const query = ctx.request.query
    const header = ctx.request.header
    const body = ctx.request.body

    // 所有的参数均保存在ctx对象中，在其中遍历查询，因此使用其作为参数且变量名不能重复
    // 返回值仍然是PositiveIntegerValidator类型
    const v = await new PositiveIntegerValidator().validate(ctx)
    // get方法的第一个参数是要获取值的路径，第二个参数是否转换类型
    const id = v.get('path.id', parsed=false)

    // if(true){
    //     const error = new global.errs.ParameterException()
    //     // 抛出异常则后面的代码不会被执行
    //     throw error
    // }

    ctx.body = "success"

})

module.exports = router