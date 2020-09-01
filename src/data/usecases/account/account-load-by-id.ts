import { ILoadAccountById } from "../../../domain/usecases/account/account-get-by-id";
import { ILoadAccountByIdAdapter } from "../../protocols/db/account/account-load-by-id";
import { TAccount } from "../../../domain/models/account/account";

export class GetAccountById implements ILoadAccountById{
    private readonly dbAdapter:ILoadAccountByIdAdapter
    constructor(dbAdapter:ILoadAccountByIdAdapter){
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