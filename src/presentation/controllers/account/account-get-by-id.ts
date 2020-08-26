import { IController, IValidator } from "../../protocols";
import { THttpRequest, THttpResponse } from "../../models/http-req-res";
import { serverError, badRequest, ok, notFound } from "../../helpers/http-response";
import { IGetAccountById } from "../../../domain/usecases/account/account-get-by-id";
import { InvalidParamError } from "../../errors";


export class GetAccountByIdController implements IController{
    private readonly validators:IValidator
    private readonly getAccountById:IGetAccountById

    constructor(validators:IValidator, getAccountById:IGetAccountById){
        this.validators = validators
        this.getAccountById = getAccountById
    }
    
    async handle(req: THttpRequest): Promise<THttpResponse> {
        try{
            const error = await this.validators.validate(req.params)
            if(error){
                return badRequest(error)
            }
            const account = await this.getAccountById.getById(req.params.id)
            if(!account){
                return notFound(new InvalidParamError('id'))
            }
            return ok(account)
        }catch(e){  
            return serverError(e)
        }
    }

}