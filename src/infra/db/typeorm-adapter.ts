import { IAddDB } from "../../data/protocols/db/account/account-create";
import { TAccount, TAccountParams } from "../../domain/models/account/account";
import {User} from './entity/'
import { getRepository } from "typeorm";
import { ILoadAccountByEmail } from "../../data/protocols/db/account/load-account-by-email";
import { ILoadAccounts } from "../../data/protocols/db/account/load-accounts";
import { ILoadAccountById } from "../../domain/usecases/account/account-get-by-id";
import { IUpdateAccountAdapter } from "../../data/protocols/db/account/account-update-adapter";
import { TAccountUpdate } from "../../domain/models/account/account-update";
import { IDeleteAccount } from "../../domain/usecases/account/account-delete";
import { TAccountDelete } from "../../domain/models/account/account-delete";
import { IDeleteAdapter } from "../../data/protocols/db/account/account-delete";

export class TypeOrmAdapter implements 
    IAddDB, 
    ILoadAccountByEmail,
    ILoadAccounts,
    ILoadAccountById,
    IUpdateAccountAdapter,
    IDeleteAdapter
    {
    async deleteDb(id: string): Promise<TAccount> {
        const user = getRepository(User)
        const accountToDelete = await user.findOne(id)
        accountToDelete.isActive = false
        await user.save(accountToDelete)
        return accountToDelete
    }
    async updateAccount(accountUpdate: TAccountUpdate): Promise<TAccount> {
        const user = getRepository(User)
        const accountToUpdate = await user.findOne(accountUpdate.id)
        Object.keys(accountUpdate).forEach( key => {
            accountToUpdate[key] = accountUpdate[key]
        })
        await user.save(accountToUpdate)
        return accountToUpdate
    }
   
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