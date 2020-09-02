import { UpdateAccountPassword } from "../../../src/data/usecases/account/account-update-password"
import { ILoadAccountById } from "../../../src/domain/usecases/account/account-get-by-id"
import { LoadAccountByEmailStub } from "../../mocks/loads/load-account-by-email-stub"
import { IUpdateAccount } from "../../../src/domain/usecases/account/account-update"
import { LoadAccountByIdStub } from "../../mocks/loads/load-account-by-id-stub"
import { TAccount } from "../../../src/domain/models/account/account"
import { TAccountUpdateEmail } from "../../../src/domain/models/account/account-update-email"
import { IUncrypt } from "../../../src/data/protocols/criptography/encrypter-field"
import { UncryptPasswordAdapterStub } from "../../mocks/bcrypt/uncrypt-stub"
import { TAccountUpdate } from "../../../src/domain/models/account/account-update"

const httpRequest:TAccountUpdateEmail = {
    id:'valid_id',
    email:'valid_email@mail.com',
    password:'password'

}
const validAccount:TAccount = {
    name:"valid_name",
    email:"valid_mail@mail.com",
    password:'hashedPassword',
    id:'valid_id',
    isActive:true
}

type SutTypes = {
    sut:IUpdateAccount
    loadAccountById:ILoadAccountById
    uncryptPassword:IUncrypt
    updateAccountPasswordStub:IUpdateAccount
}
class UpdateAccountPasswordStub implements IUpdateAccount{
    async updateAccount(account: TAccountUpdate): Promise<string | TAccount> {
        return validAccount
    }

}
const makeSut = ():SutTypes => {
    const loadAccountById = new LoadAccountByIdStub()
    const uncryptPassword = new UncryptPasswordAdapterStub()
    const updateAccountPasswordStub = new UpdateAccountPasswordStub()
    const sut = new UpdateAccountPassword(loadAccountById, uncryptPassword, updateAccountPasswordStub)
    return {
        sut,
        loadAccountById,
        uncryptPassword,
        updateAccountPasswordStub
    }
}

describe('Account Update Password', () => {
    test('Ensure loadAccountById to have been called with correct params', async () => {
        const {sut, loadAccountById} = makeSut()
        const loadAccountByIdSpy = jest.spyOn(loadAccountById, 'getById')
        await sut.updateAccount(httpRequest)
        expect(loadAccountByIdSpy).toHaveBeenCalledWith('valid_id')
    })    
    test('Ensure loadAccountById return an string id loadAccountById doenst find account', async () => {
        const {sut, loadAccountById} = makeSut()
        jest.spyOn(loadAccountById, 'getById').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
        const result = await sut.updateAccount(httpRequest)
        expect(result).toEqual('Invalid Id')
    })
    test('Ensure AccountUpdatePassword throws if loadAccountById throws', async () => {
        const {sut, loadAccountById} = makeSut()
        jest.spyOn(loadAccountById, 'getById').mockImplementationOnce(async () => {
            throw new Error()
        })
        await expect(sut.updateAccount(httpRequest))
        .rejects
        .toThrow()
    })
    test('Ensure uncrypt to have been called with correct params', async () => {
        const {sut, uncryptPassword} = makeSut()
        const uncryptPasswordSpy = jest.spyOn(uncryptPassword, 'uncrypt')
        await sut.updateAccount(httpRequest)
        expect(uncryptPasswordSpy).toHaveBeenCalledWith(httpRequest.password, validAccount.password)
    })
    test('Ensure AccountUpdatePassowrd return a string if uncrypt return false', async () => {
        const {sut, uncryptPassword} = makeSut()
        jest.spyOn(uncryptPassword, 'uncrypt').mockReturnValueOnce(new Promise(resolve => resolve(false)))
        const result = await sut.updateAccount(httpRequest)
        expect(result).toEqual('Invalid Password')
    })
    test('Ensure AccountUpdatePassword throws if uncrypt throws', async () =>{
        const {sut, uncryptPassword} = makeSut()
        jest.spyOn(uncryptPassword, 'uncrypt').mockImplementationOnce(async () =>{
            return new Promise((resolve, reject) => {
                throw new Error()
            })
        })
        await expect(sut.updateAccount(httpRequest))
        .rejects
        .toThrow()
    })
})