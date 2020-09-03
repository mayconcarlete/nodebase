import { TAccount } from "../../models/account/account";
import { TAccountDelete } from "../../models/account/account-delete";

export interface IDelete{
    delete(account:TAccountDelete):Promise<TAccount| string>
}