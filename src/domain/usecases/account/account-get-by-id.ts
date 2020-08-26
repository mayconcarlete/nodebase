import { TAccount } from "../../models/account/account";

export interface IGetAccountById {
    getById(id:string):Promise<TAccount>
}