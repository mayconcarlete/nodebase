import { TAccount } from "../../models/account/account";
import { TAccountUpdateEmail } from "../../models/account/account-update-email";

export interface IUpdateAccountEmail{
    updateEmail(account:TAccountUpdateEmail):Promise<TAccount | string >
}