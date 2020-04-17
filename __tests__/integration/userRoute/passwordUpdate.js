const request = require('supertest')
const app = require('../../../src/app')
const mongoose = require('mongoose')
const GoodRequest = require('../GoodRequest')
const user = {
  name: 'valid_name',
  email: 'valid_mail@mail.com',
  password: 'valid_password',
  confirmPassword: 'valid_password',
  phone: '2737631084'
}

describe('Integration test of update user password route', () => {
  beforeEach(async () => {
    await mongoose.connection.dropCollection('users', (err) => {
      if (err) {

      }
    })
  })
  afterAll(async () => {
    await mongoose.connection.dropCollection('users', (err) => {
      if (err) {
      }
    })
  })

  it('should return error 400 if wrong params are passed', async () => {
    const response = await GoodRequest.makeGoodRequest()
    const token = response.body.token
    const updatePassword = await request(app).put('/user/updatepassword').send({ token })
    expect(updatePassword.status).toBe(400)
  })
  it('Should return 400 if password are invalid', async () => {

  })
  // it('should return error 200 if user was created', async () => {
  //   const response = await request(app).post('/user').send(user)
  //   expect(response.status).toBe(200)
  // })
})
