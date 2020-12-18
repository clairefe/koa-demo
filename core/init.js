const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager{
  app = null
  static loadAllRoutes(){
    //路由的自动注册
    function whenLoadModules(obj) {
      if(obj instanceof Router){
        InitManager.app.use(obj.routes())
      }
    }
    requireDirectory(module, process.cwd() + '/app/api/v1', {visit: whenLoadModules})
  }
  static initCore(app){
    InitManager.app = app
    InitManager.loadAllRoutes()
  }
}


module.exports = InitManager