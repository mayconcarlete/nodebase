const User = require('../mongodb/models/User')
const bcrypt = require('bcryptjs')
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

  async updateUserEmail (id, email) {
    try {
      const emailUpdated = await User.findByIdAndUpdate(id, {
        $set: {
          email
        }
      }, { new: true })
      return emailUpdated
    } catch (error) {
      return error
    }
  }

  async updateUserPassword (id, password) {
    try {
      const passwordUpdated = await User.findByIdAndUpdate(id, {
        $set: {
          password: await bcrypt.hash(password, 8)
        }
      }, { new: true })
      return passwordUpdated
    } catch (error) {
      return error
    }
  }

  async updateUserName (id, name) {
    try {
      const nameUpdated = await User.findByIdAndUpdate(id, {
        $set: {
          name
        }
      }, { new: true })
      return nameUpdated
    } catch (error) {
      return error
    }
  }

  async updateUserPhone (id, phone) {
    try {
      const phoneUpdated = await User.findByIdAndUpdate(id, {
        $set: {
          phone
        }
      }, { new: true })
      return phoneUpdated
    } catch (error) {
      return error
    }
  }
}

module.exports = new UserRepository()
