const { Sequelize } = require('sequelize');
const { database } = require('../config/config.env');

const { dbName, host, port, usename, password } = database
const sequelize = new Sequelize(dbName, usename, password, {
  host,
  port,
  dialect: 'mysql',
  logging: true,
  timezone: '+08:00',
  define: {

  }
}); 
//自动创建库到实例
sequelize.sync({
  //自动删除表然后创建新表
  //force: true
})

module.exports = {
  db: sequelize
}