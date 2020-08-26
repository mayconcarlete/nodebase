import { TAccount } from "../../../../domain/models/account/account";

export interface ILoadAccounts{
    loadAll():Promise<TAccount[]>
}