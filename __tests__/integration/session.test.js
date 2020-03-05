const request = require('supertest')
const app = require('../../src/app')
const mongoose = require('mongoose')
const User = require('../../src/app/mongodb/models/User')
const user = {
    name: 'valid_name',
    email: 'valid_mail@mail.com',
    password: 'valid_password',
    confirmPassword: 'valid_password'
}
describe('Authentication', () => {
    beforeEach(async () => {
        await User.create(user)
        await mongoose.connection.dropCollection("users")
      
    })
    afterAll(async()=>{
        await mongoose.connection.dropCollection("users")
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
    // it('should authenticate with valid credentials', async () => {
    //     const user = await factory.create('User')
    //     const response = await request(app).post('/authenticate').send({
    //         email: user.email,
    //         password: 'valid_password'
    //     })
    //     expect(response.status).toBe(200)
    // })

    // it('should not authenticate with invalid credentials', async () => {
    //     const user = await factory.create('User')
    //     const response = await request(app).post('/authenticate').send({
    //         email: user.email,
    //         password: 'invalid_password'
    //     })
    //     expect(response.status).toBe(401)
    // })
    // it('should return JWT when user authenticate', async () => {
    //     const user = await factory.create('User')
    //     const response = await request(app).post('/authenticate').send({
    //         email: user.email,
    //         password: 'valid_password'
    //     })

    //     expect(response.body).toHaveProperty('token')
    // })
    // it('should access route when authenticated', async () => {
    //     const user = await factory.create('User')
    //     const getToken = await request(app).post('/authenticate').send({
    //         email: user.email,
    //         password: 'valid_password'
    //     })
    //     const response = await request(app).get('/dashboard').set('Authorization', `Bearer ${getToken.body.token}`)
    //     expect(response.status).toBe(200)
    // })
    // it('should not be abble to access with an invalid jwt token', async () => {
    //     const user = await factory.create('User')
    //     const response = await request(app).get('/dashboard').set('Authorization', `Bearer invalid_token`)
    //     expect(response.status).toBe(401)
    // })
})