import { TAccountAuthenticateParams, TAccountAuthenticated } from "../../models/account/account-authenticate";

export interface IAuthenticateAccount {
    auth(account:TAccountAuthenticateParams):Promise<TAccountAuthenticated>
}
