const User = require('../mongodb/models/User')

class UserRepository{
    async index(){
        const users = await User.find()
        return users
    }
    async getByEmail(email){
        const user = await User.findOne({email})
        return user
    }
    async store(user){
        const newUser = await User.create(user)
        return newUser 
    }
  
}

module.exports = new UserRepository()