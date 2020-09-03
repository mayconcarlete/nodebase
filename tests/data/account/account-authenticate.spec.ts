import { IAuthenticateAccount } from "../../../src/domain/usecases/account/account-authenticate"
import { ILoadAccountByEmail } from "../../../src/data/protocols/db/account/load-account-by-email"
import { AccountAuthenticate } from "../../../src/data/usecases/account/account-authenticate"
import { IAuthenticator } from "../../../src/presentation/protocols/authenticator"
import { TAccount } from "../../../src/domain/models/account/account"
import { TAccountAuthenticateParams } from "../../../src/domain/models/account/account-authenticate"
import { TJwtData } from "../../../src/presentation/models/jwt-data"
import { IUncrypt } from "../../../src/data/protocols/criptography/encrypter-field"

const account:TAccount = {
    name:"valid_name",
    email:"valid_mail@mail.com",
    password:'hashedPassword',
    id:'any_id',
    isActive:true
}

const accountParams:TAccountAuthenticateParams = {
    email:'valid_mail@mail.com',
    password:'valid_password'
}
class LoadAccountByEmailStub implements ILoadAccountByEmail{
    async load(email:string):Promise<TAccount>{
        return account
    }
}
class UncryptPasswordStub implements IUncrypt{
    async uncrypt(password: string, cypherText: string): Promise<boolean> {
        return true
    }

}
class JwtStub implements IAuthenticator{
    auth(account: TJwtData): string {
       return 'jwt'
    }

}
type SutTypes = {
    sut:IAuthenticateAccount,
    loadAccountByEmail:ILoadAccountByEmail,
    authenticator:IAuthenticator,
    uncryptPassword:IUncrypt
}

const makeSut = ():SutTypes => {
    const authenticator = new JwtStub()
    const loadAccountByEmail = new LoadAccountByEmailStub()
    const uncryptPassword = new UncryptPasswordStub()
    const sut = new AccountAuthenticate(loadAccountByEmail, authenticator, uncryptPassword)
    return {
        sut,
        loadAccountByEmail,
        authenticator,
        uncryptPassword
    }
}

describe('Account Authenticate', () => {
    test('Should call load account with correct params', async () => {
        const {sut, loadAccountByEmail} = makeSut()
        const authenticatorSpy = jest.spyOn(loadAccountByEmail, 'load')
        await sut.auth(accountParams)
        expect(authenticatorSpy).toHaveBeenCalledWith('valid_mail@mail.com')
    })
    test('Should throw if load account throws', async() => {
        const{sut, loadAccountByEmail} = makeSut()
        jest.spyOn(loadAccountByEmail, 'load').mockImplementationOnce(async () => {
           return new Promise(()=>{
               throw new Error()
           })
        })
        const promise = sut.auth(accountParams)
        await expect(promise).rejects.toThrow()
    })
    test('Should be falsy if password provided doenst match with from DB', async () => {
        const {sut, uncryptPassword} = makeSut()
        jest.spyOn(uncryptPassword, 'uncrypt').mockReturnValueOnce(new Promise(resolve => resolve(false)))
        const result = await sut.auth(accountParams)
        expect(result).toBeFalsy()
    })
    test('should call uncrypt with correct values', async () => {
        const {sut, uncryptPassword } = makeSut()
        const uncryptSpy = jest.spyOn(uncryptPassword, 'uncrypt')
        await sut.auth(accountParams)
        expect(uncryptSpy).toHaveBeenCalledWith(accountParams.password,account.password )
    })
    test('should throw if uncrypt throws', async () => {
        const {sut, uncryptPassword} = makeSut()
        jest.spyOn(uncryptPassword, 'uncrypt').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => {
                throw new Error()
            })
        })  
        await expect(sut.auth(accountParams))
        .rejects
        .toThrow()
    })
    test('should return jwt if and hashed password match', async () => {
        const {sut} = makeSut()
        const result = await sut.auth(accountParams)
        expect(result).toEqual(Object.assign({},{id:result.id, name:result.name, jwt:'jwt', email:result.email}))
    })

})