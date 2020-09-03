import { IDelete } from "../../../domain/usecases/account/account-delete";
import { TAccountDelete } from "../../../domain/models/account/account-delete";
import { TAccount } from "../../../domain/models/account/account";
import { ILoadAccountById } from "../../../domain/usecases/account/account-get-by-id";
import { IUncrypt } from "../../protocols/criptography/encrypter-field";
import { IDeleteAdapter } from "../../protocols/db/account/account-delete";

export class DeleteAccount implements IDelete{
    
    private readonly loadAccountById:ILoadAccountById
    private readonly uncryptPassword:IUncrypt
    private readonly deleteAccountAdapter:IDeleteAdapter

    constructor(loadAccountById:ILoadAccountById, uncryptPassword:IUncrypt, deleteAccountAdapter:IDeleteAdapter){
        this.loadAccountById = loadAccountById
        this.uncryptPassword = uncryptPassword
        this.deleteAccountAdapter = deleteAccountAdapter
    }

    async delete(account: TAccountDelete): Promise<string | TAccount> {
        const loadAccount = await this.loadAccountById.getById(account.id)
        if(loadAccount){
            const uncryptPassword = this.uncryptPassword.uncrypt(account.password, loadAccount.password)
            if(uncryptPassword){
                const deletedAccount = await this.deleteAccountAdapter.deleteDb(account.id)
                if(deletedAccount){
                    return deletedAccount
                }else{
                    return 'Não foi possivel deletar conta'
                }
            }else{
                return 'Password inválido'
            }
        }else{
            return 'Conta não encontrada'
        }
    }
}