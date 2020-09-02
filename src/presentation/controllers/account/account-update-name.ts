import { IController, IValidator } from "../../protocols";
import { THttpRequest, THttpResponse } from "../../models/http-req-res";
import { serverError, badRequest, ok } from "../../helpers/http-response";
import { IUpdateAccount } from "../../../domain/usecases/account/account-update";
import { InvalidParamError } from "../../errors";

export class UpdateAccountNameController implements IController{
    private readonly validator:IValidator
    private readonly updateAccountName:IUpdateAccount
    constructor(validator:IValidator, updateAccountName:IUpdateAccount){
        this.validator = validator
        this.updateAccountName = updateAccountName
    }
    async handle(req: THttpRequest): Promise<THttpResponse> {
        try{
            const {name, password} = req.body
            const id = req.params.id
            const errors = this.validator.validate(Object.assign({}, {id}, req.body))
            if(errors){
                return badRequest(errors)
            }
            const updatedAccount = await this.updateAccountName.updateAccount({id, name, password})
            if(typeof(updatedAccount) === 'string'){
                return badRequest(new InvalidParamError(updatedAccount))
            }
            return ok(updatedAccount)
        }catch(e){
            return serverError(e)
        }
    }

}