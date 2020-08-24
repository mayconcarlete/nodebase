import { THttpResponse } from "../models/http-req-res";

export const badRequest = (error:Error):THttpResponse => {
    return {
        statusCode:400,
        body:error.message
    }
}