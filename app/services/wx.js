const { db } = require('../../db/index')
const bcrypt = require('bcryptjs');
const {NotFound, ParamtersHttpException} = require('../../core/http-exception')


const { Model, DataTypes } = require('sequelize')


class WXManager extends Model{
  static async codeToToken(email, secret){
    
  }
}



module.exports = WXManager