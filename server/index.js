import express from "express"
import http from 'http'
import { Server as SocketServer } from "socket.io"
import { resolve } from 'path'
import {PORT} from './config.js'
import morgan from "morgan"

const app = express();
const server = http.createServer(app)
const io = new SocketServer(server)

app.use(morgan('dev'))
app.use(express.static(resolve('frontend/dist')))

io.on('connection', socket => {
    console.log(socket.id)

    socket.on('message', (data) => {
        console.log(data)
        socket.broadcast.emit('message', {
            data,
            from: socket.id
        })
    })
})

server.listen(PORT);
console.log('Server on port', PORT)