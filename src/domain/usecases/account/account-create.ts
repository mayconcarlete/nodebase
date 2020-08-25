import { TAccount, TAccountParams } from "../../models/account/account";

export interface ICreateAccount {
    create(data:TAccountParams):Promise<TAccount>
}