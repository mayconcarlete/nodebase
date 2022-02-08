import {Request, Response, NextFunction} from 'express'
import validator from 'validator'

export const validateEmail = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
  const { email } = req.body.email
  try{
    if(validator.isEmail(email)){
      next()
    }
  }catch(e){
    res.status(400).send({error: 'invalid email'})
  }
}