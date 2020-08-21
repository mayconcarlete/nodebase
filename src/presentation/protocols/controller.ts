import {THttpRequest,THttpResponse} from '../models/http-req-res'


export interface IController {
    getAll(req:THttpRequest):Promise<THttpResponse>
    getById(req:THttpRequest):Promise<THttpResponse>
    create(req:THttpRequest):Promise<THttpResponse>
    update(req:THttpRequest):Promise<THttpResponse>
    delete(req:THttpRequest):Promise<THttpRequest>
}