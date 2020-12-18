const Router = require('koa-router')
const {ParamtersHttpException, Success} = require('../../../core/http-exception')
const Validator = require('validatorjs');
const User = require('../../models/user')
const router = new Router({
  prefix: '/v1/user'
})

router.post('/register', async (ctx, next) => {
  // const rules = {
  //   nickname: ['required', 'string', 'min:4'],
  //   email: 'required|email',
  //   password1: ['required', 'regex:/^[A-Za-z0-9]{6,16}$/', 'between:6,32'],
  //   password2: ['required', 'regex:/^[A-Za-z0-9]{6,16}$/', 'between:6,32'],
  // };
  // const validation = new Validator(ctx.request.body, rules);
  // console.log(validation.passes())
  // const emailError = validation.errors.get('nickname')
  // const err = new ParamtersHttpException({})
  // throw err
  const { nickname, email, password1 } = ctx.request.body
  //因为email是唯一的，可以先去查询数据库，如果email相同，那么抛出问题
  const findEmailR = await User.findOne({
    where: {
      email
    }
  })

  if(findEmailR){
    const err = new ParamtersHttpException({
      message: 'email已存在'
    })
    throw err
  }

  const user = {
    nickname,
    email,
    password: password1
  }

  await User.create(user)

  // ctx.body = {
  //   message: '用户注册成功！'
  // }
  // ctx.status = 200

  const err = new Success({
  })
  throw err

})

module.exports = router