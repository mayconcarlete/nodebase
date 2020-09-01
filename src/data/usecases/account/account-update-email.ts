import { TAccount } from "../../../domain/models/account/account";
import { ILoadAccountById } from "../../../domain/usecases/account/account-get-by-id";
import { ILoadAccountByEmail } from "../../protocols/db/account/load-account-by-email";
import {  IUpdateAccountAdapter} from "../../protocols/db/account/account-update-adapter";
import { IUncrypt } from "../../protocols/criptography/encrypter-field";
import { IUpdateAccount } from "../../../domain/usecases/account/account-update";
import { TAccountUpdate } from "../../../domain/models/account/account-update";

export class UpdateAccountEmail implements IUpdateAccount{
    private readonly loadAccountById:ILoadAccountById
    private readonly loadAccountByEmail:ILoadAccountByEmail
    private readonly updateAccountEmailAdapter:IUpdateAccountAdapter
    private readonly uncryptPassword: IUncrypt

    constructor(loadAcountById:ILoadAccountById, loadAccountByEmail:ILoadAccountByEmail, updateAccountEmailAdapter:IUpdateAccountAdapter, uncryptPassword: IUncrypt ){
        this.loadAccountById = loadAcountById
        this.loadAccountByEmail = loadAccountByEmail
        this.updateAccountEmailAdapter = updateAccountEmailAdapter
        this.uncryptPassword = uncryptPassword
    }
    async updateAccount(accountUpdate: TAccountUpdate): Promise<TAccount | string> {
        const checkEmailOnDb = await this.loadAccountByEmail.load(accountUpdate.email)
            if(!checkEmailOnDb){
                const userAccount = await this.loadAccountById.getById(accountUpdate.id)
                if(userAccount){
                    const uncryptPassword = await this.uncryptPassword.uncrypt(accountUpdate.password, userAccount.password)
                    if(uncryptPassword){
                        const updatedAccount = await this.updateAccountEmailAdapter.updateAccount({
                            id:accountUpdate.id,
                            email:accountUpdate.email
                        })
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
