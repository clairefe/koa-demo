const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

const app = new Koa()
app.use(catchError)
app.use(parser())
InitManager.initCore(app)


// Object.values(routes).forEach(Router => {
//   app.use(Router.routes())
// })

app.listen(3000)