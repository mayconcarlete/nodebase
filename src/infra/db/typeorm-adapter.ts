import { IAddDB } from "../../data/protocols/db/account/account-create";
import { TAccount, TAccountParams } from "../../domain/models/account/account";
import {User} from './entity/'
import { getRepository } from "typeorm";
import { ILoadAccountByEmail } from "../../data/protocols/db/account/load-account-by-email";
import { ILoadAccounts } from "../../data/protocols/db/account/load-accounts";
import { IGetAccountById } from "../../domain/usecases/account/account-get-by-id";
export class TypeOrmAdapter implements 
    IAddDB, 
    ILoadAccountByEmail,
    ILoadAccounts,
    IGetAccountById
    {
    async getById(id: string): Promise<TAccount> {
        const user = getRepository(User)
        const account = await user.findOne(id)
        return account
    }
    async loadAll(): Promise<TAccount[]> {
        const user = getRepository(User)
        const accounts = await user.find()
        return accounts
    }
    
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