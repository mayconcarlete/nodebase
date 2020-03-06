const yup = require('yup')

class YupService {
  async checkName (data) {
    const schema = yup.object().shape({
      name: yup.string().required().min(3)
    })
    const result = await schema.isValid(data)
    return result
  }

  async checkPhone (data) {
    const schema = yup.object().shape({
      phone: yup.string().required().min(10)
    })
    const result = await schema.isValid(data)
    return result
  }

  async checkEmail (data) {
    const schema = yup.object().shape({
      email: yup.string().email().required()
    })
    const result = await schema.isValid(data)
    return result
  }

  async checkPassword (data) {
    const schema = yup.object().shape({
      password: yup.string().required().min(6),
      confirmPassword: yup.string().required()
    })
    const result = await schema.isValid(data)
    if (!result) {
      return false
    }
    if (data.password !== data.confirmPassword) {
      return false
    }
    return true
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
      phone: yup.string().required().min(10),
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
