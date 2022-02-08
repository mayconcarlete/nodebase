import {Request, Response, NextFunction} from 'express'


export const validatePassword = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
  const { password, confirmPassword } = req.body.email
  if(password === confirmPassword){
    next()
  }
  res.status(400).send({error: 'password and confirmPassword are different'})
}