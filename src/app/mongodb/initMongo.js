const url = process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/dbtestes' : 'mongodb://localhost:27017/database'
const mongoose = require('mongoose')
class MongoDb {
  constructor () {
    this.init()
  }

  init () {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    require('./models/Address')
    require('./models/User')
  }
}
module.exports = new MongoDb()
