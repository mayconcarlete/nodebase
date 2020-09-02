import { IUpdateAccount } from "../../../domain/usecases/account/account-update";
import { TAccountUpdate } from "../../../domain/models/account/account-update";
import { TAccount } from "../../../domain/models/account/account";
import { ILoadAccountById } from "../../../domain/usecases/account/account-get-by-id";
import { IUncrypt } from "../../protocols/criptography/encrypter-field";
import { IUpdateAccountAdapter } from "../../protocols/db/account/account-update-adapter";

export class UpdateAccountName implements IUpdateAccount{
    
    private readonly loadAccountById:ILoadAccountById
    private readonly uncryptPassword:IUncrypt
    private readonly updateAccountName:IUpdateAccountAdapter

    constructor(loadAccountById:ILoadAccountById, uncryptPassword:IUncrypt, updateAccountName:IUpdateAccountAdapter){
        this.loadAccountById = loadAccountById
        this.uncryptPassword = uncryptPassword
        this.updateAccountName = updateAccountName
    }
    
    async updateAccount(account: TAccountUpdate): Promise<string | TAccount> {
        const {id, name, password} = account
        const loadAccount = await this.loadAccountById.getById(id)
        if(loadAccount){
            const uncryptPassword = await this.uncryptPassword.uncrypt(password, loadAccount.password)
            if(uncryptPassword){
                const accountUpdated = await this.updateAccountName.updateAccount({id, name})
                if(accountUpdated){
                    return accountUpdated
                }else{
                    return 'Não foi possível atualizar nome'
                }
            }else{
                return 'Error ao decryptar password'
            }
        }else{
            return 'Usuário não encontrado'
        }
    }   
}