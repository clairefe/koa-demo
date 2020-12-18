const Router = require('koa-router')
const {ParamtersHttpException, Success} = require('../../../core/http-exception')
const Auth = require('../../../middlewares/auth')
const User = require('../../models/user')
const { generateToken } = require('../../../core/util')
const router = new Router({
  prefix: '/v1/token'
})

router.post('/', async (ctx, next) => {
  const { email, password } = ctx.request.body
  const user = await User.verifyEmailAndPassword(email, password)
  const token = generateToken(user.id, Auth.USER)
  // const err = new Success({
  //   message: '登录成功！'
  // })
  // throw err
  ctx.body = {
    token
  }
  ctx.status = 200
})


module.exports = router