/*const url = process.env.NODE_ENV === 'test' ? 
'mongodb://127.0.0.1:27017/' : process.env.DB_SERVER
*/

const url = 'mongodb://127.0.0.1:27017/'

const mongoose = require('mongoose')
class MongoDb {
  constructor () {
    this.init()
  }

  init () {
    console.log(`Usando a url: ${url}`)
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true })
    require('./models/Address')
    require('./models/User')
    require('./models/ProductsItems')
    require('./models/CategoryProducts')
  }
}
module.exports = new MongoDb()
