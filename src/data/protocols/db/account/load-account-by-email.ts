import { TAccount } from "../../../../domain/models/account/account";

export interface ILoadAccountByEmail {
    load(email:string):Promise<TAccount | undefined>
}