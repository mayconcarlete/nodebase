import { TAccount, TAccountParams } from "../../models/account/account";

export interface ICreateAccount {
    add(data:TAccountParams):Promise<TAccount>
}