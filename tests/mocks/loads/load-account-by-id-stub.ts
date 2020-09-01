import { ILoadAccountById } from "../../../src/domain/usecases/account/account-get-by-id";
import { TAccount } from "../../../src/domain/models/account/account";

const validAccount:TAccount = {
    name:"valid_name",
    email:"valid_mail@mail.com",
    password:'hashedPassword',
    id:'any_id',
    isActive:true
}

export class LoadAccountByIdStub implements ILoadAccountById{
    async getById(id: string): Promise<TAccount | undefined> {
        return validAccount
    }

}