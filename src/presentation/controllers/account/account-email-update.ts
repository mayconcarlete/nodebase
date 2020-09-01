import { IController, IValidator } from "../../protocols";
import { THttpRequest, THttpResponse } from "../../models/http-req-res";
import { badRequest, serverError, notFound, ok } from "../../helpers/http-response";
import { IUpdateAccountEmail } from "../../../domain/usecases/account/account-update-email";
import { NotFound } from "../../errors";


export class UpdateAccountEmailController implements IController{
    private readonly validator:IValidator
    private readonly updateAccountEmail:IUpdateAccountEmail
    
    constructor(validator:IValidator, updateAccountEmail:IUpdateAccountEmail){
        this.validator = validator
        this.updateAccountEmail = updateAccountEmail
    }
    
    async handle(req: THttpRequest): Promise<THttpResponse> {
        try{
            const error = this.validator.validate(Object.assign({}, {id:req.params.id}, req.body))
            if(error){
                return badRequest(error)
            }
            const {email, password} = req.body
            const id = req.params.id
            const updatedAccountEmail = await this.updateAccountEmail.updateEmail({email, id, password})
            if(updatedAccountEmail === typeof(String)){
                return notFound(new NotFound(updatedAccountEmail))
            }
            return ok(updatedAccountEmail)
        }catch(e){
            console.log(e)
            return serverError(e)
        }
    }
}