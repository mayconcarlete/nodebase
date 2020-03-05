const yup = require('yup')

class YupService {
  async checkEmail (email) {
    const schema = yup.object().shape({
      email: yup.string().required()
    })
    const result = schema.isValid(email)
    return result
  }

  async checkFields (fields) {
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      name: yup
        .string()
        .required()
        .min(3),
      password: yup
        .string()
        .required()
        .min(6),
      confirmPassword: yup.string().required()
    })
    const result = await schema.isValid(fields)
    return result
  }

  async checkAddress (address) {
    const schema = yup.object().shape({
      ownerId: yup.string().required(),
      street: yup.string().required(),
      neighborhood: yup.string().required(),
      state: yup.string().required(),
      city: yup.string().required(),
      zipCode: yup.string().required(),
      number: yup.string().required(),
      note: yup.string()
    })
    const result = await schema.isValid(address)
    return result
  }
}

module.exports = new YupService()
