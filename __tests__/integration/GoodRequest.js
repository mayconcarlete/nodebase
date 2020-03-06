const request = require('supertest')
const app = require('../../src/app')

class GoodRequest {
  async makeGoodRequest () {
    const user = {
      name: 'valid_name',
      email: 'valid_mail@mail.com',
      password: 'valid_password',
      confirmPassword: 'valid_password',
      phone: '2737631084'
    }
    await request(app).post('/user').send(user)
    const token = await request(app).post('/authenticate').send({
      email: user.email,
      password: user.password
    })
    return token
  }
}

module.exports = new GoodRequest()
