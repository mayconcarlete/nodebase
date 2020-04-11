const goodRequest = require('../GoodRequest')
const request = require('supertest')
const app = require('../../../src/app')
const mongoose = require('mongoose')
const adminController = require('../../../src/app/controllers/admin_controller')

describe('Test admin route', ()=>{
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
    it('Should return 400 if email not provided', async()=>{
        const sut = adminController
        const newAdmin = {
            token:'12345678798798798',
            name:"maycon",
            password:'123456' ,
            confirmPassword:'123456',
            phone:'12345678910'
        }
        const req = {req:{body:{
            newAdmin
        }}}
        const res = {
            status:1,
            body:{}
        }
        const response =await sut.store(req, res)
        expect(response.status).toBe(400)
    })
})