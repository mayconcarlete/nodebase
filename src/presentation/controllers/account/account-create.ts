import { IController, IValidator } from "../../protocols";
import { THttpRequest, THttpResponse } from "../../models/http-req-res";
import { badRequest } from "../../helpers/http-response";
import { MissingParamError } from "../../errors";
import { ICreateAccount } from "../../../domain/usecases/account/account-create";
import { create } from "domain";

export class AccountCreateController implements IController{
    private readonly validators: IValidator
    private readonly createAccount:ICreateAccount

    constructor(validators:IValidator, createAccount:ICreateAccount) {
        this.validators = validators
        this.createAccount = createAccount
    }

    async handle(req: THttpRequest): Promise<THttpResponse> {
        try{
            const error = this.validators.validate(req.body)
            if(error){
                return badRequest(error)
            }
            const {name, password, email} = req.body
            const newAccount = await this.createAccount.create({name, email, password})
            return {
                statusCode:200,
                body:newAccount
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