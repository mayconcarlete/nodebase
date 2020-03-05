const jwt = require('jsonwebtoken')
//const { promisify } = require('util')

class AuthenticateService {
  async generateToken (user) {
    const token = jwt.sign(
      { name: user.name, id: user._id, email: user.email },
      process.env.SALT_KEY,
      { expiresIn: '1d' }
    )
    return token
  }

  async decodeToken (token) {
    const data = jwt.decode(token, process.env.SALT_KEY)
    return data
  }

  async authorize (req, res, next) {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token']
    if (!token) {
      return res.status(401).json({
        message: 'Token must be provided'
      })
    } else {
      jwt.verify(token, process.env.SALT_KEY, function (error, decoded) {
        if (error) {
          return res.status(401).json({ message: 'Invalid Token' })
        } else {
          req.id = decoded.id
          next()
        }
      })
    }
  }

  async isAdmin (req, res, next) {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token']
    if (!token) {
      return res.status(401).json({ message: 'Token must be provided' })
    }
    jwt.verify(token, process.env.SALT_KEY, function (err, decoded) {
      if (error) {
        return res.status(401).json({ message: 'Invalid token' })
      } else {
        if (decoded.roles.included('admin')) {
          next()
        } else {
          return res
            .status(403)
            .json({ message: 'Only admins can use this route.' })
        }
      }
    })
  }
}

module.exports = new AuthenticateService()

// module.exports = async (req, res, next) => {
//     const authHeader = req.headers.authorization
//     if (!authHeader) {

//         return res.status(401).json({
//             message: 'token not provided'
//         })
//     }
//     const [, token] = authHeader.split(' ')
//     try {
//         const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
//         req.userId = decoded.user.id
//         return next()
//     } catch (error) {
//         return res.status(401).json({
//             message: 'token invalid'
//         })
//     }
// }
