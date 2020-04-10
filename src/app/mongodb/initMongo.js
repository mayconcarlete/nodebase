const url = process.env.NODE_ENV === 'test' ? 
'mongodb://maykids:w2w2w2w2@ds221609.mlab.com:21609/tests' : process.env.DB_SERVER
const mongoose = require('mongoose')
class MongoDb {
  constructor () {
    this.init()
  }

  init () {
    console.log(`Usando a url: ${url}`)
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    require('./models/Address')
    require('./models/User')
  }
}
module.exports = new MongoDb()
