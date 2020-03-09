const Address = require('../mongodb/models/Address')

class AddressRepository {
  async store (address) {
    const newAdress = await Address.create(address)
    return newAdress
  }

  async getAddressesByUserId (id) {
    const addresses = await Address.find({}).populate('ownerId')
    return addresses
  }

  async getAddressAndUpdate (id, address) {
    const { ownerId, street, neighborhood, city, state, zipCode, number, note } = address
    try {
      const userUpdated = await Address.findByIdAndUpdate(id, {
        $set: {
          ownerId,
          street,
          neighborhood,
          city,
          state,
          zipCode,
          number,
          note
        }
      }, { new: true })
      return userUpdated
    } catch (error) {
      return error
    }
  }
}

module.exports = new AddressRepository()
