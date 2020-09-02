import { IUpdateAccount } from "../../../domain/usecases/account/account-update";
import { TAccountUpdate } from "../../../domain/models/account/account-update";
import { TAccount } from "../../../domain/models/account/account";
import { ILoadAccountById } from "../../../domain/usecases/account/account-get-by-id";
import { IUncrypt, IEncrypt } from "../../protocols/criptography/encrypter-field";

export class UpdateAccountPassword implements IUpdateAccount{
    
    private readonly loadAccountById:ILoadAccountById
    private readonly uncryptPassword:IUncrypt
    private readonly updateAccountPassword:IUpdateAccount
    private readonly encryptPassword:IEncrypt
    
    constructor(loadAccountById:ILoadAccountById, uncryptPassword:IUncrypt, updateAccountPassoword:IUpdateAccount,encryptPassword:IEncrypt){
        this.loadAccountById = loadAccountById
        this.uncryptPassword = uncryptPassword
        this.updateAccountPassword = updateAccountPassoword
        this.encryptPassword = encryptPassword
    }
    
    async updateAccount(account: TAccountUpdate): Promise<string | TAccount> {
        const accountLoaded = await this.loadAccountById.getById(account.id)
        if(accountLoaded){
            const uncryptedPasswordResult = await this.uncryptPassword.uncrypt(account.password, accountLoaded.password)
            if(uncryptedPasswordResult){
                const encryptedPassword = await this.encryptPassword.encrypt(account.newPassword)
                if(encryptedPassword){
                    const accountUpdated = await this.updateAccountPassword.updateAccount({id:account.id, password:encryptedPassword})
                    if(accountUpdated){
                        return accountUpdated
                    }else{
                        return 'Cant update account'
                    }
                }else{
                    return 'Error to encrypt password'
                }
            }else{
                return 'Invalid Password'
            }
        }else{
            return 'Invalid Id'
        }
    }

}