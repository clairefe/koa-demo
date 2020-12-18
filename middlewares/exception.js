const {HttpException} = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try{
    //捕获所有的异常
    await next()
  }catch(err){
    //errorCode
    //massgae
    //requestUrl
    //status
    if(err instanceof HttpException){
      ctx.body = {
        msg: err.message,
        err_code: err.errCode,
        request_url: `${ctx.method} ${ctx.path}`
      }
      ctx.status = err.status
    }else{
      ctx.body = {
        msg: '哎呀，报错了',
        err_code: 999,
        request_url: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}


module.exports = catchError