const yup = require('yup')

class YupService {
    async checkFields(fields) {
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            name: yup.string().required().min(3),
            password: yup.string().required().min(6),
            confirmPassword: yup.string().required()
        })
        const result = await schema.isValid(fields)
        return result
    }
}

module.exports = new YupService()