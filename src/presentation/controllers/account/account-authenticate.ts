import { IController, IValidator } from "../../protocols";
import { THttpRequest, THttpResponse } from "../../models/http-req-res";
import { IAuthenticateAccount } from "../../../domain/usecases/account/account-authenticate";
import { badRequest } from "../../helpers/http-response";

export class AccountAuthenticateController implements IController{
    
    private readonly validator:IValidator
    private readonly authenticate:IAuthenticateAccount

    constructor(validator:IValidator, authenticate:IAuthenticateAccount){
        this.validator = validator
        this.authenticate = authenticate
    }
    async handle(req: THttpRequest): Promise<THttpResponse> {
        try{
            const error = this.validator.validate(req.body)
            if(error){
                return badRequest(error)
            }
            const {email, password} = req.body
            const auth = await this.authenticate.auth({email, password})
            if(!auth){
                return {
                    statusCode:404,
                    body:new Error('Cant make login')
                }
            }
            return {
                statusCode:200,
                body:auth
            }
        }catch(e){
            return {
                statusCode:500,
                body: new Error('Vertigo')
            }
        }
        
    }

}