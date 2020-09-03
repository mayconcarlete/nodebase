import { IAuthenticateAccount } from "../../../domain/usecases/authenticate/authenticate";
import { TAccountAuthenticateParams, TAccountAuthenticated } from "../../../domain/models/account/account-authenticate";
import { ILoadAccountByEmail } from "../../protocols/db/account/load-account-by-email";
import { IAuthenticator } from "../../../presentation/protocols/authenticator";
import { IUncrypt } from "../../protocols/criptography/encrypter-field";

export class AccountAuthenticate implements IAuthenticateAccount{
    private readonly loadAccountByEmail: ILoadAccountByEmail
    private readonly authenticator:IAuthenticator
    private readonly uncryptPassword:IUncrypt
    
    constructor(loadAccountByEmail:ILoadAccountByEmail, authenticator:IAuthenticator, uncryptPassword:IUncrypt){
        this.loadAccountByEmail = loadAccountByEmail
        this.authenticator = authenticator
        this.uncryptPassword = uncryptPassword
    }
    
    async auth(account: TAccountAuthenticateParams): Promise<TAccountAuthenticated> {
        const accountLoaded = await this.loadAccountByEmail.load(account.email)
        if(accountLoaded){
            const compare = await this.uncryptPassword.uncrypt(account.password, accountLoaded.password)
            if(compare){
                const jwt = this.authenticator.auth({
                    email:accountLoaded.email,
                    id:accountLoaded.id
                })
                return {
                    email:accountLoaded.email,
                    id:accountLoaded.id,
                    name:accountLoaded.name,
                    jwt
                }
            }
        }
    }

}