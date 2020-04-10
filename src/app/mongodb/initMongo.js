//const url = process.env.NODE_ENV === 'test' ? 
//'mongodb://localhost:27017/dbtestes' :
const url = process.env.DB_SERVER
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
