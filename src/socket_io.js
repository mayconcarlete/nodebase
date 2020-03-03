const io = require('socket.io')
//const { server } = require('./app')
class SocketIo {
    constructor() {
        this.io = io()
        this.connection()
    }
    connection() {
        this.io.on('connection', socket => {
            console.log('maninho voce logou')
            socket.on('teste', data => {
                console.log(data)
            })
        })
    }
}

module.exports = new SocketIo().io
// module.exports = (io) => {
//     this.io.on('connection', socket => {
//         console.log('Um cliente se conectou: ' + socket)
//         socket.on('teste', data => {
//             console.log(data)
//         })
//     })
// }