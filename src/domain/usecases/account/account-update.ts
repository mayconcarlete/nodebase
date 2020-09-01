import { TAccount } from "../../models/account/account";
import { TAccountUpdate } from "../../models/account/account-update";

export interface IUpdateAccount{
    updateAccount(account:TAccountUpdate):Promise<string | TAccount>
}