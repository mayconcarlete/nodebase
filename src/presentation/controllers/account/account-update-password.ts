import { IController, IValidator } from "../../protocols";
import { THttpRequest, THttpResponse } from "../../models/http-req-res";
import { serverError, badRequest, ok } from "../../helpers/http-response";
import { IUpdateAccount } from "../../../domain/usecases/account/account-update";
import { InvalidParamError } from "../../errors";


export class UpdateAccountPasswordController implements IController{
    private readonly validator:IValidator
    private readonly updateAccountPassword:IUpdateAccount
    constructor(validator:IValidator,updateAccountPassword:IUpdateAccount){
        this.validator = validator
        this.updateAccountPassword = updateAccountPassword
    }
  
    async handle(req: THttpRequest): Promise<THttpResponse> {
       try{
        const error = this.validator.validate(Object.assign({}, {id:req.params.id}, req.body))
        if(error){
            return badRequest(error)
        }
        const {password, newPassword, newPasswordConfirmation} = req.body
        const id = req.params.id
        const updatedAccount = await this.updateAccountPassword.updateAccount({
                id,
                password,
                newPassword,
                newPasswordConfirmation
            }
        )
        if(typeof(updatedAccount) === 'string'){
            return badRequest(new InvalidParamError(updatedAccount))
        }
        return ok(updatedAccount)
       }catch(e){
           return serverError(e)
       }
    }

}