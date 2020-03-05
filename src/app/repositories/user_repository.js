const User = require('../mongodb/models/User')

class UserRepository {
  async index () {
    const users = await User.find()
    return users
  }

  async getUserById (id) {
    const user = await User.findById(id)
    return user
  }

  async getByEmail (email) {
    const user = await User.findOne({ email })
    return user
  }

  async store (user) {
    const newUser = await User.create(user)
    return newUser
  }

  async updateUserEmail (id, user) {
    const { name, email, password } = user
    try {
      const userUpdated = await User.findByIdAndUpdate(id, {
        $set: {
          name,
          email,
          password
        }
      })
      return userUpdated
    } catch (error) {
      return error
    }
  }
}

module.exports = new UserRepository()
