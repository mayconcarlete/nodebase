// import express, {Request, Response, NextFunction} from 'express'
// import {validateEmail, validatePassword} from './middlewares'

// const app = express()

// app.post('/', validateEmail, validatePassword)

// const PORT = 4000
// app.listen(PORT, () => {
//   console.log('we are online on port: ', PORT)
// })


const a = (req, res, next) => {
  req.param = 1
  next()
}
const b = (req, res, next) => {
  req.body = 2
  next()
}


type composite = (fn: Function[]) => void

const compositeApp = (...fns) => {
  return (req, res, next) => {
    return fns.reduce((acc, fn) => fn(acc.req, acc.res, acc.next), {req, res, next})
  }
}

console.log(compositeApp(a, b)({param:{}, body:{}}, {}, () => console.log('next')))
