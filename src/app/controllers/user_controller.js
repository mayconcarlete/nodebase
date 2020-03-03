const yupService = require('../services/yup_service')


class CreateUser {
    async storage(req, res) {
        const { email, name, password, confirmPassword } = req.body

        try {
            if (!(await yupService.checkFields(req.body))) {
                return res.status(400).json({ error: 'Invalid params' })
            }
            if (password !== confirmPassword) {
                return res.status(400).json({ error: 'Password doesnt match' })
            }
            const userExists = await User.findOne({ where: { email } })
            if (userExists) {
                return res.status(400).json({ error: 'User already exists' })
            }
            return res.status(200).json({ msg: 'Cadastro realizado with success' })
        } catch (error) {
            return res.status(500).json({ error: 'Server error' })
        }
    }
}
module.exports = new CreateUser()