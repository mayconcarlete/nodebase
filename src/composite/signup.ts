import { Request, Response, NextFunction} from 'express'
import {validateEmail, validatePassword} from '../middlewares'

export type ExpressMiddleware = (req: Request, res: Response, next:NextFunction) => Promise<void>
export type Composite = (...fns:ExpressMiddleware[]) => Promise<void>

export const compositeStrategy: Composite = (
  ...fns
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fns.reduce(a
  }
}