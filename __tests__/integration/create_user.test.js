const request = require('supertest')
const app = require('../../src/app')
const { User } = require('../../src/app/models')
const sut = require('../../src/app/controllers/user_controller')
const factory = require('../factories')
const truncate = require('../utils/truncate')

const user = {
    name: 'valid_name',
    email: 'valid_mail@mail.com',
    password: 'valid_password',
    confirmPassword: 'valid_password'
}

describe('Integration test of create user route', () => {
    beforeEach(async () => {
        await truncate()
    })
    it('should return error 400 if password and confirm password are different', async () => {

        const response = await request(app).post('/user').send({
            email: user.email,
            name: user.name,
            password: user.password,
            confirmPassword: 'different password'
        })
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
        const newUser = await User.create(user)
        const response = await request(app).post('/user').send(user)
        expect(response.status).toBe(400)
    })
    it('should return error 200 if user was created', async () => {
        const response = await request(app).post('/user').send(user)
        expect(response.status).toBe(200)
    })
})