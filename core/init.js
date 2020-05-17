const requireDirectory = require('require-directory')
const Router = require('koa-router')

// 以类的形式组织公共模块的导入与注册，减少app.js中的代码量
class InitManager{
    static initCore(app){
        // 入口方法
        InitManager.app = app
        InitManager.initLoadRouters()
    }

    static initLoadRouters(){
        // 导入目录下的所有模块作为路由并自动注册
        // 第一个参数表示导入的是模块，第二个参数为导入的路径，第三个参数为函数，每加载一个模块都会执行该回调函数
        // 避免api的路径硬编码
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        })

        function whenLoadModule(obj) {
            // 如果是Router的实例就在app上注册
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }
}

module.exports = InitManager