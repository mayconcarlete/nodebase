import { ILoadAccountById } from "../../../src/domain/usecases/account/account-get-by-id";
import { TAccount } from "../../../src/domain/models/account/account";
import { ILoadAccountByEmail } from "../../../src/data/protocols/db/account/load-account-by-email";

const validAccount:TAccount = {
    name:"valid_name",
    email:"valid_mail@mail.com",
    password:'hashedPassword',
    id:'any_id',
    isActive:true
}

export class LoadAccountByEmailStub implements ILoadAccountByEmail{
    async load(email: string): Promise<TAccount | undefined> {
        return undefined
    }
}