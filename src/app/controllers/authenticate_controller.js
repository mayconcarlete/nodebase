const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Authenticate {
    async store(req, res) {
        const { email, password } = req.body
        try {
            if (!email || !password) {
                return res.status(400).json({ message: 'Email or password must be provided' })
            }
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return res.status(401).json({ message: 'User not found' })
            }
            if (!(await user.checkPassword(password))) {
                return res.status(401).json({ message: 'Incorrect password' })
            }
            const token = await jwt.sign({ user }, process.env.APP_SECRET)
            return res.json({ token })
        } catch (error) {
            return res.status(500).json({ message: 'Erro on server' })
        }
    }
}

module.exports = new Authenticate()

