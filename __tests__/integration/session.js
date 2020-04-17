const request = require('supertest')
const app = require('../../src/app')
const mongoose = require('mongoose')
const GoodRequest = require('./GoodRequest')

const user = {
  name: 'valid_name',
  email: 'valid_mail@mail.com',
  password: 'valid_password',
  confirmPassword: 'valid_password',
  phone: '2733218600'
}

describe('Authentication', () => {
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
  it('should return 400 if email not exists', async () => {
    const response = await request(app).post('/authenticate').send({ password: 'valid_password' })
    expect(response.status).toBe(400)
  })
  it('should return 400 if password not exists', async () => {
    const response = await request(app).post('/authenticate').send({ email: 'valid_mail@mail.com' })
    expect(response.status).toBe(400)
  })

  it('should return 400 if email is valid but doenst exist on DB', async () => {
    const response = await request(app).post('/authenticate').send(
      {
        email: 'valid_mail@mail.com',
        password: 'valid_password'
      })
    expect(response.status).toBe(401)
  })
  it('should authenticate with valid credentials', async () => {
    // await request(app).post('/user').send(user)
    // const response = await request(app).post('/authenticate').send({
    //   email: user.email,
    //   password: user.password
    // })
    const response = await GoodRequest.makeGoodRequest()
    expect(response.status).toBe(200)
  })

  it('should not authenticate with invalid credentials', async () => {
    await request(app).post('/user').send(user)
    const response = await request(app).post('/authenticate').send({
      email: user.email,
      password: 'invalid_password'
    })

    expect(response.status).toBe(401)
  })
  it('should return JWT when user authenticate', async () => {
    const response = await GoodRequest.makeGoodRequest()
    expect(response.body).toHaveProperty('token')
  })
})
