const yupService = require('../services/yup_service')
const bcrypt = require('bcryptjs')
const UserRepository = require('../repositories/user_repository')
const User = require('../mongodb/models/User')

class UserController {
  async store (req, res) {
    const { email, name, password, confirmPassword, phone } = req.body
    const emailLowerCase = email.toLowerCase()
    try {
      if (!(await yupService.checkFields(req.body))) {
        return res.status(400).json({ error: 'Invalid params' })
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Password doesnt match' })
      }
      const userExists = await UserRepository.getByEmail(emailLowerCase)
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' })
      }

      const user = { email:emailLowerCase, phone, name, password: await bcrypt.hash(password, 8), roles:'user' }
      const newUser = await UserRepository.store(user)
      return res
        .status(200)
        .json({
          email: newUser.email,
          phone: newUser.phone,
          name: newUser.name,
          id: newUser._id
        })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error })
    }
  }

  async updateEmail (req, res) {
    const id = req.id
    const { email } = req.body

    try {
      if (!email) {
        return res.status(400).json({ message: 'Param email must be provided' })
      }
      const isEmail = await yupService.checkEmail(req.body)
      if (!isEmail) {
        return res.status(400).json({ message: 'Invalid email format.' })
      }
      const isEmailAvailable = await UserRepository.getByEmail(email)
      if (isEmailAvailable) {
        return res.status(400).json({ message: 'Email is not available' })
      }
      const userUpdated = await UserRepository.updateUserEmail(id, email)
      return res
      .json({
        email: userUpdated.email,
        phone: userUpdated.phone,
        name: userUpdated.name,
        id: userUpdated._id
      })
    } catch (error) {
      res.status(500).json({ message: 'Ocorreu um erro interno.' })
    }
  }

  async updatePassword (req, res) {
    const id = req.id
    try {
      if (!req.body.newPassword) {
        return res.status(400).json({ message: 'Password must be provided' })
      }
      if (!req.body.confirmNewPassword) {
        return res.status(400).json({ message: 'New Password Confirmation must be provided' })
      }
      if(req.body.newPassword!==req.body.confirmNewPassword){
        return res.status(400).json({ message: 'New Password Confirmation and new password does not match' })
      }
      if (req.body.newPassword.length <6 ) {
        return res.status(400).json({ message: 'New password must have at least 6 characters' })
      }
      const userUpdated = await UserRepository.updateUserPassword(id, req.body.newPassword)
      return res
      .json({
        email: userUpdated.email,
        phone: userUpdated.phone,
        name: userUpdated.name,
        id: userUpdated._id
      })
    } catch (error) {
      return res.status(500).json({ message: 'Internal error.' })
    }
  }

  async updateName (req, res) {
    const id = req.id
    try {
      const isName = await yupService.checkName(req.body)
      if (!isName) {
        return res.status(400).json({ message: 'Invalid name, name must need to have at least 3 characters' })
      }
      const userUpdated = await UserRepository.updateUserName(id, req.body.name)
      return res
      .json({
        email: userUpdated.email,
        phone: userUpdated.phone,
        name: userUpdated.name,
        id: userUpdated._id
      })
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
      const userUpdated = await UserRepository.updateUserPhone(id, req.body.phone)
      return res
      .json({
        email: userUpdated.email,
        phone: userUpdated.phone,
        name: userUpdated.name,
        id: userUpdated._id
      })
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
      return res
      .json({
        email: user.email,
        phone: user.phone,
        name: user.name,
        id: user._id
      })
    } catch (error) {
      return res.status(500).json({ message: 'Internal error' })
    }
  }

  async delete (req, res) {
    const id = req.id
    try {
      const userUpdated = await User.findByIdAndUpdate(id,{
        isDeleted:true
      }, {new:true})
      return res
      .json({
        email: userUpdated.email,
        phone: userUpdated.phone,
        name: userUpdated.name,
        id: userUpdated._id,
        isDeleted: userUpdated.isDeleted
      })
    } catch (error) {
      return res.status(500).json({ message: 'Erro de servidro' })
    }
  }
}
module.exports = new UserController()
