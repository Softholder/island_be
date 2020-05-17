const Koa = require('koa')
const InitManager = require('./core/init')
// 引入路由
// const book = require('./api/v1/book')
// const classic = require('./api/v1/classic')

const app = new Koa()
process.cwd()

InitManager.initCore(app)


// app.use(book.routes())
// app.use(classic.routes())


app.listen(3000)