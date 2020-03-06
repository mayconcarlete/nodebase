const request = require('supertest')
const app = require('../../../src/app')
const mongoose = require('mongoose')
const GoodRequest = require('../GoodRequest')

describe('Test Update email route /user/updateemail', () => {
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
  it('Should return 401 if user try update email without token', async () => {
    const emailUpdated = {
      email: 'jsoerval@hotmail.com'
    }
    const response = await request(app).put('/user/updateemail').send(emailUpdated)
    expect(response.status).toBe(401)
  })
  it('Should return 400 if email is invalid', async () => {
    const response = await GoodRequest.makeGoodRequest()
    const token = response.body.token
    const updateEmail = await request(app).put('/user/updateemail').send({
      token,
      email: 'invalid_email'
    })
    expect(updateEmail.status).toBe(400)
  })
  it('Should return 400 if email is valid but it already exists in DB', async () => {
    const response = await GoodRequest.makeGoodRequest()
    const token = response.body.token
    const updateEmail = await request(app).put('/user/updateemail').send({
      token,
      email: 'valid_mail@mail.com'
    })
    expect(updateEmail.status).toBe(400)
  })
  it('Should return ')
})
