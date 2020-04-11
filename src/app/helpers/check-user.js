const User = require('../mongodb/models/User')
const bcrypt = require('bcryptjs')

exports.checkUser = async (req, res, next) => {
    const {id} = req.id
    const {password} = req.body
  
    if(!password || password.length <6){
        return res.status(400).json({middlewareMsg:'Invalid Password'})
    }
    const user = await User.findOne(id)
    const passwordResult = await bcrypt.compare(password, user.password)
    if(!passwordResult){
        return res.status(401).json({msg:'Password not valid'})
    }
    next()
}