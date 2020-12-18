const cluster = require('cluster')
// const numCPUs = require('os').cpus().length;

if(cluster.isMaster){
  // for(let i = 0 ; i< 1; i++){
    const worker = cluster.fork()
  // }
  // cluster.on('exit', function(worker, code, signal) {
    
  //   console.log('worker ' + worker.process.pid + ' died');
  //   setTimeout(() => {
  //     cluster.fork()
  //   }, 5000)
  // });

  let missedPing = 0

  let inter = setInterval(() => {
    worker.send('ping')
    console.log('ping')
    missedPing++
    if(missedPing >= 3){
      // worker.exit()
      clearInterval(inter)
      process.kill(worker.process.pid)
    }
  })

  worker.on('message', (str) => {
    console.log('pong')
    if(str === 'pong'){
      missedPing--
    }
  })
}else{
  require('./app.js')
  // process.on('uncaughtException', function(err){
  //   console.log(err)
  //   process.exit(1)
  // })
  // setInterval(() => {
  //   if(process.memoryUsage().rss > 734003200){
  //     process.exit(1)
  //   }
  // }, 5000)

  process.on('message', (str) => {
    if(str === 'ping'){
      process.send('pong')
    }
  })
}