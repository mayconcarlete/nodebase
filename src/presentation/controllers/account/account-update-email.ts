import { IController, IValidator } from "../../protocols";
import { THttpRequest, THttpResponse } from "../../models/http-req-res";
import { badRequest, serverError, notFound, ok } from "../../helpers/http-response";
import { NotFound, InvalidParamError } from "../../errors";
import { IUpdateAccount } from "../../../domain/usecases/account/account-update";



export class UpdateAccountEmailController implements IController{
    private readonly validator:IValidator
    private readonly updateAccountEmail:IUpdateAccount
    
    constructor(validator:IValidator, updateAccountEmail:IUpdateAccount){
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
            const updatedAccountEmail = await this.updateAccountEmail.updateAccount({email, id, password})
            if(typeof(updatedAccountEmail) === 'string'){
                return badRequest(new InvalidParamError(updatedAccountEmail))
            }
            return ok(updatedAccountEmail)
        }catch(e){
            console.log(e)
            return serverError(e)
        }
    }
}