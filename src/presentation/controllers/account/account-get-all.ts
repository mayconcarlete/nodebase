import { IController } from "../../protocols";
import { THttpRequest, THttpResponse } from "../../models/http-req-res";
import { IGetAllAccounts } from "../../../domain/usecases/account/account-get-all";
import { ok, serverError } from '../../helpers/http-response';

export class GetAllAccountsController implements IController{
    private readonly getAllAccounts:IGetAllAccounts
    constructor(getAllAccounts:IGetAllAccounts){
        this.getAllAccounts = getAllAccounts
    }

    async handle(req: THttpRequest): Promise<THttpResponse> {
        try{
            const accounts =await  this.getAllAccounts.getAll()
            return ok(accounts)
        }catch(e){
            return serverError(e)
        }
    }

}