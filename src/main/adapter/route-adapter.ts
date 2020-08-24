import { Request, Response} from 'express'
import { IController } from '../../presentation/protocols'
import { THttpRequest } from '../../presentation/models/http-req-res'

export const adaptRoute = (controller:IController) => {
    return async(req:Request, res:Response) => {
        const request:THttpRequest = {
            body:req.body,
            params:req.params
        }
        const result = await controller.handle(request)
        return res.status(result.statusCode).json(result.body)
    }    
}   