import { IAddDB } from "../../data/protocols/db/account/account-create";
import { TAccount, TAccountParams } from "../../domain/models/account/account";
import {User} from './entity/'
import { getRepository } from "typeorm";
export class TypeOrmAdapter implements IAddDB{
    async add(account: TAccountParams): Promise<TAccount> {
        const user = getRepository(User)
        const newAccount = await user.save(account)
        return newAccount
    }

}