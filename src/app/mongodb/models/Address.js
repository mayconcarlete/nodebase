const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  street: { type: String, required: true },
  neighborhood: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true, default: 'ES' },
  zipCode: { type: String, required: true },
  number: { type: String, required: true },
  note: { type: String }
})

module.exports = mongoose.model('Address', schema)
