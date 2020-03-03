const yupService = require('../services/yup_service')
const bcrypt = require('bcryptjs')
const UserRepository = require('../repositories/user_repository')

class UserController {
    async storage(req, res) {
        const { email, name, password, confirmPassword } = req.body
        console.log(req.body)
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
            const user = {email, name, password: await bcrypt.hash(password,8)}
            const newUser = await UserRepository.store(user)
            return res.status(200).json({ msg: 'Cadastro realizado with success',newUser})
            } catch (error) {
            return res.status(500).json({ error })
        }
    }
}
module.exports = new UserController()