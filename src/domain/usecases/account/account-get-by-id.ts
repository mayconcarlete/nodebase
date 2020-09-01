import { TAccount } from "../../models/account/account";

export interface ILoadAccountById {
    getById(id:string):Promise<TAccount | undefined>
}