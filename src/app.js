
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})
const express = require('express')
const http = require('http')
const { userRoute, authenticateRoute, addressRoute, productsRoute,adminRoute } = require('./app/routes/index')
const ioClass = require('./socket_io')
const mongodb = require('./app/mongodb/initMongo')
const cors = require('cors')

class App {
  constructor () {
    this.initServer()
    this.middlewares()
    this.routes()
  }

  async initServer () {
    this.app = express()
    this.server = http.createServer(this.app)
    this.io = ioClass.listen(this.server)
    mongodb.init()
  }

  middlewares () {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use((req, res, next) => {
      req.io = this.io
      return next()
    })
  }

  routes () {
    this.app.use('/user', userRoute)
    this.app.use('/authenticate', authenticateRoute)
    this.app.use('/address', addressRoute)
    this.app.use('/products', productsRoute)
    this.app.use('/admin', adminRoute)
  }
}

module.exports = new App().server
