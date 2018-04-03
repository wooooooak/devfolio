const express = require('express')
const router = express.Router()
const logger = require('morgan')
const bodyParser = require('body-parser')
const http = require('http')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')

// const socketio = require('socket.io')

const config = require('config')
const db = require('db')

const api = require('api')

const app = express()
app.use(cors())
global.__basedir = __dirname;
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true,limit: '4MB' }))

// set the secret key variable for jwt
app.set('jwt-secret', config.secret)

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.use(express.static(path.join(__dirname, 'public')))

router.get('/a', (req,res) => {
  console.log('/ 라우터 요청받음 get')
  return res.json({text:'/ router get'})
})
app.use('/',router)
//결국 express인 app에 라우터를 넣어줘야한다. 그부분이다.
app.use('/api',api) // 이부분을 빼먹어서 고생했다

app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)  //next가 이 다음 미들웨어를 실행 시킴
 })

db.connect() //db connection

const server = http.createServer(app)
// const websocket = socketio(server)

server.listen('8082',() => console.log('server open!'))

// websocket.on('connection', (socket) => {
//   console.log('A client just joined on ', socket.id)
  
//   socket.on('disconnect',() => {
//     console.log('disconnect')
//   })
//   socket.on('location',(location) => {
//     console.log(location)
//   })

//   /*
//     websocket.emit과 socket.emit은 분명한 차이가 있다.
//     websocket.emit을하면 이벤트가 이 서버에 접속한 전체 클라이언트에게
//     동시에  클라이언트 갯수만큼 여러번 보내지는 반면
//     socket.emit을 하면 해당 클라이언트에 딱 한번만 보내짐
//   */
//   // websocket.emit('testaa',{data:'this is data'})
//   socket.emit('hello',{data:'this is data'})

//   socket.on('shaked',(data) => {
//     console.log(data)
//     // 여기서 방장이라면 방을 만들고 아니라면 참여시키자
//     console.log('여기서 방장이라면 방을 만들고 아니라면 참여시키자')
//   })
// })


