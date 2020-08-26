import { TAccount } from "../../../../domain/models/account/account";

export interface IGetAccountByIdAdapter{
    getById(id:string):Promise<TAccount>
}