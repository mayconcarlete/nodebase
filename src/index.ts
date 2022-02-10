// import express, {Request, Response, NextFunction} from 'express'
// import {validateEmail, validatePassword} from './middlewares'

// const app = express()

// app.post('/', validateEmail, validatePassword)

// const PORT = 4000
// app.listen(PORT, () => {
//   console.log('we are online on port: ', PORT)
// })
const a = (val) => val
const b = (val) => `b${val}`
const c = (val) => `c${val}`

type composite = (fn: Function[]) => void

const compositeApp = (...fns) => {
  return (val) => {
    return fns.reduce((acc, fn) => fn(acc), val)
  }
}

console.log(compositeApp(a,b,c)('z'))