import { TAccount } from "./account";

export interface IGetAllAccounts {
    getAll():Promise<TAccount[]>
}