import { TAccount } from "../../models/account/account";
import { TAccountDelete } from "../../models/account/account-delete";

export interface IDeleteAccount{
    delete(account:TAccountDelete):Promise<string | TAccount>
}