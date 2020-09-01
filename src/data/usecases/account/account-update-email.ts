import { IUpdateAccountEmail } from "../../../domain/usecases/account/account-update-email";
import { TAccountUpdateEmail } from "../../../domain/models/account/account-update-email";
import { TAccount } from "../../../domain/models/account/account";
import { ILoadAccountById } from "../../../domain/usecases/account/account-get-by-id";
import { IValidator } from "../../../presentation/protocols";
import { ILoadAccountByEmail } from "../../protocols/db/account/load-account-by-email";
import { IUpdateAccountEmailDb } from "../../protocols/db/account/account-update-email";
import { IUncrypt } from "../../protocols/criptography/encrypter-field";

export class UpdateAccountEmail implements IUpdateAccountEmail{
    private readonly loadAccountById:ILoadAccountById
    private readonly loadAccountByEmail:ILoadAccountByEmail
    private readonly updateAccountEmailAdapter:IUpdateAccountEmailDb
    private readonly uncryptPassword: IUncrypt

    constructor(loadAcountById:ILoadAccountById, loadAccountByEmail:ILoadAccountByEmail, updateAccountEmailAdapter:IUpdateAccountEmailDb, uncryptPassword: IUncrypt ){
        this.loadAccountById = loadAcountById
        this.loadAccountByEmail = loadAccountByEmail
        this.updateAccountEmailAdapter = updateAccountEmailAdapter
        this.uncryptPassword = uncryptPassword
    }

    async updateEmail(account: TAccountUpdateEmail): Promise< TAccount| string> {    
        const checkEmailOnDb = await this.loadAccountByEmail.load(account.email)
            if(!checkEmailOnDb){
                const userAccount = await this.loadAccountById.getById(account.id)
                if(userAccount){
                    const uncryptPassword = await this.uncryptPassword.uncrypt(account.password, userAccount.password)
                    if(uncryptPassword){
                        const updatedAccount = await this.updateAccountEmailAdapter.updateEmailDb(account.id, account.email)
                        if(updatedAccount){
                            return updatedAccount
                        }
                        return 'Cant update user'
                    }
                    else{
                        return 'Password doesnt match'
                    }
                }
                else{
                    return 'Id doesnt found'
                }
            }
            else{
                return 'Email already exists on db'
            }
    }
}
