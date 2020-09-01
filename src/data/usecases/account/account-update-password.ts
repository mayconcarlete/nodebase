import { IUpdateAccountPassword } from "../../../domain/usecases/account/account-update-password";
import { TAccountUpdatePassword } from "../../../domain/models/account/account-update-password";
import { TAccount } from "../../../domain/models/account/account";
import { ILoadAccountById } from "../../../domain/usecases/account/account-get-by-id";
import { IUncrypt } from "../../protocols/criptography/encrypter-field";

export class UpdateAccountPassword implements IUpdateAccountPassword{
    private readonly loadAccountById:ILoadAccountById
    private readonly uncryptPassword:IUncrypt
    
    constructor(loadAccountById:ILoadAccountById, uncryptPassword:IUncrypt){
        this.loadAccountById = loadAccountById
        this.uncryptPassword = uncryptPassword
    }
    
    async updatePassword(account: TAccountUpdatePassword): Promise<string | TAccount> {
        const loadAccount = await this.loadAccountById.getById(account.id)
        if(loadAccount){
            const uncrypt = await this.uncryptPassword.uncrypt(account.password, loadAccount.password)
            if(uncrypt){
                
            }else{
                return 'Invalid Password'
            }
        }else{
            return 'Invalid Account'
        }
    }
}