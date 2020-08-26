import { IGetAllAccounts } from "../../../domain/usecases/account/account-get-all"
import { TAccount } from "../../../domain/models/account/account";
import { ILoadAccounts } from "../../protocols/db/account/load-accounts";

export class GetAllAccounts implements IGetAllAccounts{
    private readonly loadAccounts:ILoadAccounts
    
    constructor(loadAccounts:ILoadAccounts){
        this.loadAccounts = loadAccounts
    }
    
    async getAll(): Promise<TAccount[]> {
        const accounts = await this.loadAccounts.loadAll()
        return accounts
    }
}