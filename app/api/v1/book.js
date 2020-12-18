const Router = require('koa-router')
const {ParamtersHttpException} = require('../../../core/http-exception')
const router = new Router({
  prefix: '/v1/book'
})
const Auth = require('../../../middlewares/auth')

router.get('/latest', new Auth(9).m, async (ctx, next) => {
  // const err = new ParamtersHttpException({})
  // throw err
  const { uid, scope } = ctx.auth

})

module.exports = router