import { TAccount } from "../../../../domain/models/account/account";
import { TAccountUpdate } from "../../../../domain/models/account/account-update";

export interface IUpdateAccountAdapter{
    updateAccount(accountUpdate:TAccountUpdate):Promise<TAccount| string>
}