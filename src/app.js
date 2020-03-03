
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})
const express = require('express')
const http = require('http')
const { helloWorldRoute, userRoute, authenticateRoute, dashboardRoute } = require('./app/routes/index')
const ioClass = require('./socket_io')
const mongoose = require('mongoose')
const a = require('./aaa')
const url = process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/dbtestes' : 'mongodb://localhost:27017/database'

class App {
    constructor() {
        this.initServer()
        this.middlewares()
        this.routes()
    }
    async initServer() {
        this.app = express()
        this.server = http.createServer(this.app)
        this.io = ioClass.listen(this.server)

        mongoose.connect(url)
        //await a.create({ name: 'carlete4' })
        const users = await a.find()
        console.log(users)
    }
    middlewares() {
        this.app.use(express.json())
        this.app.use((req, res, next) => {
            req.io = this.io
            return next();
        })
    }
    routes() {
        this.app.use('/user', userRoute)
        //  this.app.use('/address', addressRoute)
        this.app.use('/authenticate', authenticateRoute)
    }
}

module.exports = new App().server