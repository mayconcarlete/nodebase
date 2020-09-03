import { IDeleteAdapter } from "../../../src/data/protocols/db/account/account-delete";
import { TAccount } from "../../../src/domain/models/account/account";

const validAccount:TAccount = {
    name:"valid_name",
    email:"valid_mail@mail.com",
    password:'hashedPassword',
    id:'any_id',
    isActive:false
}
export class DeleteAccountStub implements IDeleteAdapter{
    async deleteDb(id: string): Promise<TAccount> {
        return validAccount
    }   
}