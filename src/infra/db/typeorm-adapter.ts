import { IAddDB } from "../../data/protocols/db/account/account-create";
import { TAccount, TAccountParams } from "../../domain/models/account/account";
import {User} from './entity/'
import { getRepository } from "typeorm";
import { ILoadAccountByEmail } from "../../data/protocols/db/account/load-account-by-email";
export class TypeOrmAdapter implements IAddDB, ILoadAccountByEmail{
    
    async load(email: string): Promise<TAccount> {
        const user = getRepository(User)
        const loadedUser = await user.findOne({email})
        return loadedUser
    }
    
    async add(account: TAccountParams): Promise<TAccount> {
        const user = getRepository(User)
        const newAccount = await user.save(account)
        return newAccount
    }

}