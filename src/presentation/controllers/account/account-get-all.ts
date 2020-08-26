import { IController } from "../../protocols";
import { THttpRequest, THttpResponse } from "../../models/http-req-res";
import { IGetAllAccounts } from "../../../domain/models/account/get-all-accounts";

export class GetAllAccountsController implements IController{
    private readonly getAllAccounts:IGetAllAccounts
    constructor(getAllAccounts:IGetAllAccounts){
        this.getAllAccounts = getAllAccounts
    }

    async handle(req: THttpRequest): Promise<THttpResponse> {
        try{
            const accounts =await  this.getAllAccounts.getAll()
            return {
                statusCode:200,
                body:accounts
            }
        }catch(e){
            return {
                statusCode:500,
                body:e
            }
        }
    }

}