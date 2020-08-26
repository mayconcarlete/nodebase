import { IGetAccountById } from "../../../domain/usecases/account/account-get-by-id";
import { IGetAccountByIdAdapter } from "../../protocols/db/account/account-get-by-id";
import { TAccount } from "../../../domain/models/account/account";

export class GetAccountById implements IGetAccountById{
    private readonly dbAdapter:IGetAccountByIdAdapter
    constructor(dbAdapter:IGetAccountByIdAdapter){
        this.dbAdapter = dbAdapter
    }
    async getById(id: string): Promise<TAccount> {
        const account = await this.dbAdapter.getById(id)
        if(account){
            return account
        }
        return undefined
    }
}