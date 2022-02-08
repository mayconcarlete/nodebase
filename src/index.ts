import express, {Request, Response, NextFunction} from 'express'
import {validateEmail, validatePassword} from './middlewares'

const app = express()

app.post('/', validateEmail, validatePassword)

const PORT = 4000
app.listen(PORT, () => {
  console.log('we are online on port: ', PORT)
})