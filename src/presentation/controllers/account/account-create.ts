import { IController, IValidator } from "../../protocols";
import { THttpRequest, THttpResponse } from "../../models/http-req-res";
import { badRequest } from "../../helpers/http-response";
import { InvalidParamError } from "../../errors";
import { ICreateAccount } from "../../../domain/usecases/account/account-create";
import { IAuthenticator } from "../../protocols/authenticator";

export class AccountCreateController implements IController{
    private readonly validators: IValidator
    private readonly createAccount:ICreateAccount
    private readonly authenticator: IAuthenticator
    
    constructor(validators:IValidator, createAccount:ICreateAccount,authenticator: IAuthenticator) {
        this.validators = validators
        this.createAccount = createAccount
        this.authenticator = authenticator
    }

    async handle(req: THttpRequest): Promise<THttpResponse> {
        try{
            const error = this.validators.validate(req.body)
            if(error){
                return badRequest(error)
            }
            const {name, password, email} = req.body
            const newAccount = await this.createAccount.create({name, email, password})
            if(!newAccount){
                return badRequest(new InvalidParamError('email'))
            }

            const authUser = this.authenticator.auth({
                email:newAccount.email,
                id:newAccount.id
            })

            return {
                statusCode:200,
                body:{
                    id:newAccount.id,
                    isActive:newAccount.isActive,
                    name:newAccount.name,
                    email:newAccount.email,
                    jwt: authUser
                }
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