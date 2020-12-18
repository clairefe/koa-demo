const { db } = require('../../db/index')
const bcrypt = require('bcryptjs');
const {NotFound, ParamtersHttpException} = require('../../core/http-exception')


const { Model, DataTypes } = require('sequelize')


class User extends Model{
  static async verifyEmailAndPassword(email, secret){
    const user =  await User.findOne({
      where: {
        email
      }
    })

    if(!user){
      const err1 = new NotFound({message: '用户不存在'})
      throw err1
    }

    const bool = bcrypt.compareSync(secret, user.password); 

    if(!bool){
      const err2 = new ParamtersHttpException({message: '密码错误'})
      throw err2
    }

    return user
  }
}

User.init({ // mysql的类型对应起来
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) {
      //密码加密处理
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(val, salt);
      this.setDataValue('password', hash);
    }
    // ,
    // get() {
    //   return this.getDataValue('password')
    // }
  },
  email: {
    type: DataTypes.STRING(128),
    unique: true
  }
}, {
  sequelize: db,
  tableName: 'user'
})


module.exports = User