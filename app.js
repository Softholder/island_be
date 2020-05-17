const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
// 引入路由
// const book = require('./api/v1/book')
// const classic = require('./api/v1/classic')

const app = new Koa()
app.use(catchError)
app.use(parser())
process.cwd()

InitManager.initCore(app)


// app.use(book.routes())
// app.use(classic.routes())


app.listen(3000)