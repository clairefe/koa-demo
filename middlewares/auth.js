const { Forbbiden } = require('../core/http-exception')
const auth = require('basic-auth')
const jwt = require('jsonwebtoken');
const { security } = require('../config/config.env')

class Auth {
  constructor(level = 1){
    Auth.USER = 8
    Auth.ADMIN = 16
    this.level = level
  }

  get m(){
    return async (ctx, next) => {
      const userToken = auth(ctx.req)
      let message =  'token不合法'
      if(!userToken || !userToken.name){
        throw new Forbbiden({message})
      }
      //token合法性校验
      try{
        const decode = jwt.verify(userToken.name, security.secretKey)
        if(decode.scope < this.level){
          message = '权限不足'
          throw new Forbbiden({message})
        }
        ctx.auth = {
          uid: decode.uid,
          scope: decode.scope
        }
      }catch(err){
        console.log(err)
        if(err.name === 'JsonWebTokenError'){
          message = 'token已过期'
        }
        throw new Forbbiden({message})
      }
      
      await next()
    }

    
  }
}

module.exports = Auth