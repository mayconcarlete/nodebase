const bcrypt = require('bcryptjs')
const UserRepository = require('../repositories/user_repository')
const AuthenticateService = require('../middlewares/auth')

class AuthenticateController {
  async store (req, res) {
    const { email, password } = req.body
    try {
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: 'Email or password must be provided' })
      }
      const user = await UserRepository.getByEmail(email)
      if (!user) {
        return res.status(401).json({ message: 'User not found' })
      }

      const result = await bcrypt.compare(req.body.password, user.password)
      if (!result) {
        return res.status(401).json({ message: 'Incorrect password' })
      }

      const token = await AuthenticateService.generateToken(user)

      return res.json({
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        roles:user.roles,
        token
      })
    } catch (error) {
      return res.status(500).json({ message: 'Erro on server', error })
    }
  }
}

module.exports = new AuthenticateController()
