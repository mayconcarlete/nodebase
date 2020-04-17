const goodRequest = require('../GoodRequest')
const request = require('supertest')
const app = require('../../../src/app')
const mongoose = require('mongoose')
const adminController = require('../../../src/app/controllers/admin_controller')
const addressController = require('../../../src/app/controllers/address_controller')
const express = require('express')

const sut = addressController

describe('Test admin route', ()=>{
      test('Should return 400 if invalid params are pass', async ()=>{
        const req = express.request
        const res = express.response
        req.body ={         
            name:"maycon",
            email:"maycon.carlete@hotmail.com",
            phone:"123123123123",
            password:"123456",
            confirmPassword:"123456"
        }
        const response = await sut.store(req, res)
        expect(response.status).toBe(200)
      })
    })  
