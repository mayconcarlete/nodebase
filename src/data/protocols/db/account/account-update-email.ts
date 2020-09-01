import { TAccount } from "../../../../domain/models/account/account";

export interface IUpdateAccountEmailDb{
    updateEmailDb(id:string, email:string):Promise<TAccount>
}