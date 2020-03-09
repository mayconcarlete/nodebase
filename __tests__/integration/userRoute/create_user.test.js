const request = require('supertest')
const app = require('../../../src/app')
const mongoose = require('mongoose')

const user = {
  name: 'valid_name',
  email: 'valid_mail@mail.com',
  password: 'valid_password',
  confirmPassword: 'valid_password',
  phone: '2737631084'
}

describe('Integration test of create user route', () => {
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
  it('should return error 400 if password and confirm password are different', async () => {
    const wrongConfirm = {
      name: user.name,
      email: 'maycon.carlete@hotmail.com',
      password: user.password,
      confirmPassword: 'wrong_password',
      phone: user.phone
    }
    const response = await request(app).post('/user').send(wrongConfirm)
    expect(response.status).toBe(400)
  })
  it('should return error 400 if wrong params are passed', async () => {
    const invalidUser = {
      name: 'a',
      email: 'invalid_mail',
      password: 'invalid_pass',
      confirmPassword: 'invalid'
    }
    const response = await request(app).post('/user').send(invalidUser)
    expect(response.status).toBe(400)
  })
  it('should return error 400 if user already exists in DB', async () => {
    await request(app).post('/user').send(user)
    const response = await request(app).post('/user').send(user)
    await mongoose.connection.dropCollection('users')
    expect(response.status).toBe(400)
  })
  it('should return error 200 if user was created', async () => {
    const response = await request(app).post('/user').send(user)
    expect(response.status).toBe(200)
  })
})
