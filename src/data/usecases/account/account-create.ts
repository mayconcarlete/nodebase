import { ICreateAccount } from "../../../domain/usecases/account/account-create";
import { TAccount, TAccountParams } from "../../../domain/models/account/account";
import { IEncrypt } from "../../protocols/criptography/encrypter-field";
import { IAddDB } from "../../protocols/db/account/account-create";
import { ILoadAccountByEmail } from "../../protocols/db/account/load-account-by-email";

export class CreateAccount implements ICreateAccount{
    private readonly encrypter:IEncrypt
    private readonly addAccount:IAddDB
    private readonly loadAccountByEmail:ILoadAccountByEmail

    constructor(encrypter:IEncrypt, addAccount:IAddDB, loadAccountByEmail:ILoadAccountByEmail){
        this.encrypter = encrypter
        this.addAccount = addAccount
        this.loadAccountByEmail = loadAccountByEmail
    }
    
    async create(data: TAccountParams): Promise<TAccount> {
        const account = await this.loadAccountByEmail.load(data.email)
        if(!account){
            const passwordEncrypted = await this.encrypter.encrypt(data.password)
            const newAccount = await this.addAccount.add(Object.assign({}, data, {password:passwordEncrypted}))
            return newAccount
        }
    }
}