const yupService = require('../services/yup_service')
const bcrypt = require('bcryptjs')
const UserRepository = require('../repositories/user_repository')

class UserController {
  async store (req, res) {
    const { email, name, password, confirmPassword, phone } = req.body
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

      const user = { email, phone, name, password: await bcrypt.hash(password, 8) }
      const newUser = await UserRepository.store(user)
      return res
        .status(200)
        .json({ msg: 'Cadastro realizado with success', newUser })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error })
    }
  }

  async updateEmail (req, res) {
    const id = req.id
    const { email } = req.body

    try {
      const isEmail = await yupService.checkEmail(req.body)
      if (!isEmail) {
        return res.status(400).json({ message: 'Invalid email format.' })
      }
      const isEmailAvailable = await UserRepository.getByEmail(email)
      if (isEmailAvailable) {
        return res.status(400).json({ message: 'Email is not available' })
      }
      const userUpdated = await UserRepository.updateUserEmail(id, email)
      return res.json(userUpdated)
    } catch (error) {
      res.status(500).json({ message: 'Ocorreu um erro interno.' })
    }
  }

  async updatePassword (req, res) {
    const id = req.id
    try {
      const isPassword = await yupService.checkPassword(req.body)
      if (!isPassword) {
        return res.status(400).json({ message: 'Password and Confirm Password must be valid.' })
      }
      const passwordUpdated = await UserRepository.updateUserPassword(id, req.body.password)
      return res.json(passwordUpdated)
    } catch (error) {
      return res.status(500).json({ message: 'Internal error.' })
    }
  }

  async updateName (req, res) {
    const id = req.id
    try {
      const isName = await yupService.checkName(req.body)
      if (!isName) {
        return res.status(400).json({ message: 'Invalid name' })
      }
      const nameUpdated = await UserRepository.updateUserName(id, req.body.name)
      return res.json(nameUpdated)
    } catch (error) {
      return res.status(500).json({ message: 'Internal error.' })
    }
  }

  async updatePhone (req, res) {
    const id = req.id
    try {
      const isPhone = await yupService.checkPhone(req.body)
      if (!isPhone) {
        return res.status(400).json({ message: 'Invalid phone.' })
      }
      const phoneUpdated = await UserRepository.updateUserPhone(id, req.body.phone)
      return res.json(phoneUpdated)
    } catch (error) {
      return res.status(500).json({ message: 'Internal error' })
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
