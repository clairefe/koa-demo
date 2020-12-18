class HttpException extends Error {
  constructor(props){
    super(props)
    const { message = '服务器错误', errCode = 10001, status = 400} = props
    this.errCode = errCode
    this.message = message
    this.status = status
  }
}


class ParamtersHttpException extends HttpException {
  constructor(props){
    super(props)
    const { message = '参数错误', errCode = 10001} = props
    this.errCode = errCode
    this.message = message
    this.status = 400
  }
}


class Success extends HttpException {
  constructor(props){
    super(props)
    const { message = '操作成功', errCode = 0} = props
    this.errCode = errCode
    this.message = message
    this.status = 201 //200 查询成功  201操作成功
  }
}


class NotFound extends HttpException {
  constructor(props){
    super(props)
    const { message = '不存在', errCode = 10000} = props
    this.errCode = errCode
    this.message = message
    this.status = 404 
  }
}

class Forbbiden extends HttpException {
  constructor(props){
    super(props)
    const { message = '没有权限', errCode = 10006} = props
    this.errCode = errCode
    this.message = message
    this.status = 403 
  }
}

module.exports = {
  HttpException,
  ParamtersHttpException,
  Success,
  NotFound,
  Forbbiden
}