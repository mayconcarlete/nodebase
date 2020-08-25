import { ICreateAccount } from "../../../domain/usecases/account/account-create";
import { TAccount, TAccountParams } from "../../../domain/models/account/account";
import { IEncrypt } from "../../protocols/criptography/encrypter-field";
import { IAddDB } from "../../protocols/db/account/account-create";

export class CreateAccount implements ICreateAccount{
    private readonly encrypter:IEncrypt
    private readonly addAccount:IAddDB
    

    constructor(encrypter:IEncrypt, addAccount:IAddDB){
        this.encrypter = encrypter
        this.addAccount = addAccount
    }
    
    async create(data: TAccountParams): Promise<TAccount> {

        const passwordEncrypted = await this.encrypter.encrypt(data.password)
        const newAccount = await this.addAccount.add(Object.assign({}, data, {password:passwordEncrypted}))
        return newAccount
    }
}