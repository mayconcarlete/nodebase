import { IController, IValidator } from "../../protocols";
import { THttpRequest, THttpResponse } from "../../models/http-req-res";
import { IAuthenticateAccount } from "../../../domain/usecases/authenticate/authenticate";
import { badRequest, notFound, serverError, ok } from "../../helpers/http-response";
import { NotFound, EmailOrPasswordInvalid } from "../../errors";


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
                return notFound(new EmailOrPasswordInvalid())
            }
            return ok(auth)
        }catch(e){
           return serverError(e)
        }   
    }
}