import { ICreateAccount } from "../../../src/domain/usecases/account/account-create"
import { IAddDB } from "../../../src/data/protocols/db/account/account-create"
import { CreateAccount } from "../../../src/data/usecases/account/account-create"
import { IEncrypt } from "../../../src/data/protocols/criptography/encrypter-field"
import { BcryptAdapter } from "../../../src/infra/bcrypt/bcrypt-adapter"
import { TAccountParams, TAccount } from "../../../src/domain/models/account/account"
import { ILoadAccountByEmail } from "../../../src/data/protocols/db/account/load-account-by-email"

const accountParams = {
    name:"valid_name",
    email:"valid_mail@mail.com",
    password:"valid_password"
}

const validAccount:TAccount = {
    name:"valid_name",
    email:"valid_mail@mail.com",
    password:'hashedPassword',
    id:'any_id',
    isActive:true
}
class LoadAccountByEmailStub implements ILoadAccountByEmail{
    async load(email: string): Promise<TAccount> {
        return undefined
    }

}
class CreateAccountStub implements IAddDB{
    async add(account: TAccountParams): Promise<TAccount> {
        return validAccount
    } 
}

type SutTypes = {
    sut:ICreateAccount,
    encrypter:IEncrypt,
    addAccount:IAddDB,
    loadAccountByEmail:ILoadAccountByEmail
}
const makeSut = ():SutTypes => {
    const saltRounds = 10
    const encrypter = new BcryptAdapter(saltRounds)
    const addAccount = new CreateAccountStub()
    const loadAccountByEmail = new LoadAccountByEmailStub()
    const sut = new CreateAccount(encrypter, addAccount, loadAccountByEmail)  
    return {
        sut,
        encrypter,
        addAccount,
        loadAccountByEmail
    }
}

describe('Account Create Data', () => {
    test('Should call loadAccounByEmail with correct param', async () => {
        const {sut,loadAccountByEmail} = makeSut()
        const loadAccountByEmailSpy = jest.spyOn(loadAccountByEmail, 'load')
        
        await sut.create(accountParams)
        expect(loadAccountByEmailSpy).toHaveBeenCalledWith("valid_mail@mail.com")
    })
    test('Should create account if load account return falsy', async () => {
        const {sut, loadAccountByEmail} = makeSut()
        jest.spyOn(loadAccountByEmail, 'load').mockImplementationOnce(async () => {
            return new Promise(resolve => {
                resolve(undefined)
            })
        })
        const result = await sut.create(accountParams)
        expect(result).toEqual(validAccount)
    })
    test('Should call add method with correct params', async () => {
        const {sut, addAccount, encrypter} = makeSut()
        const addAccountSpy = jest.spyOn(addAccount,'add')
        jest.spyOn(encrypter, 'encrypt').mockReturnValueOnce(new Promise(resolve => resolve('hashedPassword')))
        await sut.create(accountParams)
        expect(addAccountSpy).toHaveBeenCalledWith({
            name:"valid_name",
            email:"valid_mail@mail.com",
            password:'hashedPassword'
        })
    })
})