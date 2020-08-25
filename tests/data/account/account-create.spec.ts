import { ICreateAccount } from "../../../src/domain/usecases/account/account-create"
import { IAddDB } from "../../../src/data/protocols/db/account/account-create"
import { CreateAccount } from "../../../src/data/usecases/account/account-create"
import { IEncrypt } from "../../../src/data/protocols/criptography/encrypter-field"
import { BcryptAdapter } from "../../../src/infra/bcrypt/bcrypt-adapter"
import { TypeOrmAdapter } from "../../../src/infra/db/typeorm-adapter"
import { TAccountParams } from "../../../src/domain/models/account/account"

type SutTypes = {
    sut:ICreateAccount,
    encrypter:IEncrypt,
    addAccount:IAddDB
}
const makeSut = ():SutTypes => {

    const saltRounds = 10
    const encrypter = new BcryptAdapter(saltRounds)
    const addAccount = new TypeOrmAdapter()
    const sut = new CreateAccount(encrypter, addAccount)
    
    return {
        sut,
        encrypter,
        addAccount
    }
}
describe('Account Create Data', () => {
    test('Should call add method with correct params', async () => {
        const {sut, encrypter, addAccount} = makeSut()
        const accountParam:TAccountParams = {
            name:"valid_name",
            email:"valid_mail@mail.com",
            password:"valid_password"
        }
        const addAccountSpy = jest.spyOn(addAccount,'add')
        jest.spyOn(addAccount,'add').mockImplementationOnce(() => {
            return new Promise(resolve => {
                resolve({
                    name:"valid_name",
                    email:"valid_mail@mail.com",
                    password:'hashedPassword',
                    id:'any_id'
                })
            })
        })
        jest.spyOn(encrypter, 'encrypt').mockImplementationOnce(() => {
            return new Promise(resolve => {
                resolve('hashedPassword')
            })
        })

        await sut.create(accountParam)

        expect(addAccountSpy).toHaveBeenCalledWith({
            name:"valid_name",
            email:"valid_mail@mail.com",
            password:'hashedPassword'
        })
    })
})