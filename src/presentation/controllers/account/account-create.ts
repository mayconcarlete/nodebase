import { IController, IValidator } from "../../protocols";
import { THttpRequest, THttpResponse } from "../../models/http-req-res";
import { badRequest } from "../../helpers/http-response";
import { MissingParamError } from "../../errors";

export class AccountCreateController implements IController{
    private readonly validators: IValidator
    
    constructor(validators:IValidator) {
        this.validators = validators
    }

    async handle(req: THttpRequest): Promise<THttpResponse> {
        try{
            const error = this.validators.validate(req.body)
            if(error){
                return badRequest(error)
            }
            
            return {
                statusCode:200,
                body:req.body
            }
        }catch(e){
            console.log(`Error:${e}`)
            return {
                statusCode:500,
                body:e  
            }
        }
    }
    
}