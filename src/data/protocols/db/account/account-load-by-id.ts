import { TAccount } from "../../../../domain/models/account/account";

export interface ILoadAccountByIdAdapter{
    getById(id:string):Promise<TAccount>
}