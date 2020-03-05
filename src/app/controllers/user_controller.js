const yupService = require('../services/yup_service')
const bcrypt = require('bcryptjs')
const UserRepository = require('../repositories/user_repository')

class UserController {
  async store (req, res) {
    const { email, name, password, confirmPassword } = req.body
    try {
      if (!(await yupService.checkFields(req.body))) {
        return res.status(400).json({ error: 'Invalid params' })
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Password doesnt match' })
      }
      const userExists = await UserRepository.getByEmail(email)
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' })
      }

      const user = { email, name, password: await bcrypt.hash(password, 8) }
      const newUser = await UserRepository.store(user)
      return res
        .status(200)
        .json({ msg: 'Cadastro realizado with success', newUser })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async updateEmail (req, res) {
    const id = req.id
    const { email } = req.body
    try {
      const isEmail = yupService.checkEmail(email)
      if (!isEmail) {
        return res.status(400).json({ message: 'Invalid format.' })
      }
      const isEmailAvailable = await UserRepository.getByEmail(email)
      if (isEmailAvailable) {
        return res.status(400).json({ message: 'Email is not available' })
      }
      const userUpdated = await UserRepository.updateUserEmail
      console.log('valor de email: ' + isEmailAvailable)
    } catch (error) {
      res.status(500).json({ message: 'Ocorreu um erro interno.' })
    }
  }

  async show (req, res) {
    const email = req.params.email
    try {
      const user = await UserRepository.getByEmail(email)
      if (!user || user === []) {
        return res.status(400).json({ message: 'User not found' })
      }
      return res.json(user)
    } catch (error) {
      return res.status(500).json({ message: 'Internal error' })
    }
  }
}
module.exports = new UserController()
