import { TAccountParams, TAccount } from "../../../../domain/models/account/account";

export interface IAddDB{
    add(account:TAccountParams):Promise<TAccount>
}