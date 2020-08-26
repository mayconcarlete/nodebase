import { TAccount } from "../../models/account/account";

export interface IGetAllAccounts {
    getAll():Promise<TAccount[]>
}