import { IController, IValidator } from "../../protocols";
import { THttpRequest, THttpResponse } from "../../models/http-req-res";
import { serverError, badRequest, ok } from "../../helpers/http-response";
import { IDeleteAccount } from "../../../domain/usecases/account/account-delete";
import { InvalidParamError } from "../../errors";

export class AccountDeleteController implements IController{
    
    private readonly validator:IValidator
    private readonly deleteAccount:IDeleteAccount

    constructor(validator:IValidator, deleteAccount:IDeleteAccount){
        this.validator = validator
        this.deleteAccount = deleteAccount
    }
    async handle(req: THttpRequest): Promise<THttpResponse> {
        try{
            const error = this.validator.validate(Object.assign({}, req.body,{id:req.params.id} ))
            if(error){
                return badRequest(error)
            }
            const {id, password} = req.body
            const accountDeleted = await this.deleteAccount.delete({id, password})
            if(typeof(accountDeleted) === 'string'){
                return badRequest(new InvalidParamError(accountDeleted))
            }
            return ok(accountDeleted)
        }catch(e){
            console.log(e)
            return serverError(e)
        }
    }

}