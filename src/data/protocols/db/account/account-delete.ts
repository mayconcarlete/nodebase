import { TAccount } from "../../../../domain/models/account/account";

export interface IDeleteAdapter{
    deleteDb(id:string):Promise<TAccount | undefined>
}