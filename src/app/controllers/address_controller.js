const AddressRepository = require('../repositories/address_repository')
class AddressController {
  async store (req, res) {
    const id = req.id
    const address = {
      ownerId: id,
      street: req.body.street,
      neighborhood: req.body.neighborhood,
      city: req.body.city,
      zipCode: req.body.zipCode,
      number: req.body.number,
      note: req.body.note
    }
    try {
      const newAddress = await AddressRepository.store(address)
      console.log(newAddress)
      return res.status(200).json(newAddress)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async index (req, res) {
    const { id } = req.params
    try {
      const addresses = await AddressRepository.getAddressesByUserId(id)
      return res.json(addresses)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}

module.exports = new AddressController()
