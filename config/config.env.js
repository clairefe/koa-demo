module.exports = {
  environment: 'env',
  database: {
    dbName: 'demo',
    usename: 'root',
    port: 3306,
  },
  security: {
    secretKey: "abcdefg123",
    expiresIn: 60 * 60 * 2
  }
}