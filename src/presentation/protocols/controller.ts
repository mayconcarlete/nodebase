import {THttpRequest,THttpResponse} from '../models/http-req-res'


export interface IController {
    handle(req:THttpRequest):Promise<THttpResponse>
}