import { UpdateAccountPassword } from "../../../src/data/usecases/account/account-update-password"
import { ILoadAccountById } from "../../../src/domain/usecases/account/account-get-by-id"
import { IUpdateAccount } from "../../../src/domain/usecases/account/account-update"
import { LoadAccountByIdStub } from "../../mocks/loads/load-account-by-id-stub"
import { TAccount } from "../../../src/domain/models/account/account"
import { IUncrypt, IEncrypt } from "../../../src/data/protocols/criptography/encrypter-field"
import { UncryptPasswordAdapterStub } from "../../mocks/bcrypt/uncrypt-stub"
import { TAccountUpdate } from "../../../src/domain/models/account/account-update"
import { TAccountUpdatePassword } from "../../../src/domain/models/account/account-update-password"

const httpRequest:TAccountUpdatePassword = {
    id:'valid_id',
    password:'password',
    newPassword:'new_password',
    newPasswordConfirmation:'new_password'
}
const validAccount:TAccount = {
    name:"valid_name",
    email:"valid_mail@mail.com",
    password:'newhashedPassword',
    id:'valid_id',
    isActive:true
}

type SutTypes = {
    sut:IUpdateAccount
    loadAccountById:ILoadAccountById
    uncryptPassword:IUncrypt
    updateAccountPasswordStub:IUpdateAccount
    encryptPassword:IEncrypt
}
class EncryptPasswordStub implements IEncrypt{
    async encrypt(plainText: string): Promise<string| undefined> {
        return 'encrypted_password'
    }

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
    const encryptPassword:IEncrypt = new EncryptPasswordStub()
    const sut = new UpdateAccountPassword(loadAccountById, uncryptPassword, updateAccountPasswordStub, encryptPassword)
    return {
        sut,
        loadAccountById,
        uncryptPassword,
        updateAccountPasswordStub,
        encryptPassword
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
        expect(uncryptPasswordSpy).toHaveBeenCalledWith(httpRequest.password, 'hashedPassword')
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
            return new Promise(() => {
                throw new Error()
            })
        })
        await expect(sut.updateAccount(httpRequest))
        .rejects
        .toThrow()
    })
    test('Ensure encrypt to have been called with correct params', async () => {
        const {sut, encryptPassword} = makeSut()
        const encryptPasswordSpy = jest.spyOn(encryptPassword, 'encrypt')
        await sut.updateAccount(httpRequest)
        expect(encryptPasswordSpy).toHaveBeenCalledWith('new_password')
    })
    test('Ensure encrypt method return an error string if encrypt fails', async() => {
        const {sut, encryptPassword} = makeSut()
        jest.spyOn(encryptPassword, 'encrypt').mockImplementationOnce(async() => {
            return new Promise(resolve => resolve(undefined))
        })
        const result = await sut.updateAccount(httpRequest)
        expect(result).toEqual('Error to encrypt password')
    })
    test('Ensure updateAccountPassword throws if encrypt method throws', async () =>{
        const {sut, encryptPassword} = makeSut()
        jest.spyOn(encryptPassword, 'encrypt').mockImplementationOnce(async ()=>{
            return new Promise(() =>{
                throw new Error()
            })
        })
        await expect(sut.updateAccount(httpRequest))
        .rejects
        .toThrow()
    })
    test('Ensure updateAccountPassword to have been called with correct params', async () =>{
        const {sut, updateAccountPasswordStub} = makeSut()
        const updateAccountPasswordStubSpy = jest.spyOn(updateAccountPasswordStub, 'updateAccount')
        await sut.updateAccount(httpRequest)
        expect(updateAccountPasswordStubSpy).toHaveBeenCalledWith({
            id:'valid_id',
            password:'encrypted_password'
        })
    })
    test('Ensure updateAccountPassword return an error if update wrong', async() =>{
        const {sut, updateAccountPasswordStub} = makeSut()
        jest.spyOn(updateAccountPasswordStub, 'updateAccount').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
        const result = await sut.updateAccount(httpRequest)
        expect(result).toEqual('Cant update account')
    })
    test('Ensure updateAccountPassword throws if updateAccount method throws', async () =>{
        const {sut, updateAccountPasswordStub} = makeSut()
        jest.spyOn(updateAccountPasswordStub, 'updateAccount').mockImplementationOnce(async () => {
            return new Promise(()=>{
                throw new Error()
            })
        })
        await expect(sut.updateAccount(httpRequest))
        .rejects
        .toThrow()
    })
    test('Ensure to return an updatedAccount when update works well', async () =>{
        const {sut} = makeSut()
        const result = await sut.updateAccount(httpRequest)
        expect(result).toEqual({
            name:"valid_name",
            email:"valid_mail@mail.com",
            password:'newhashedPassword',
            id:'valid_id',
            isActive:true
        })
    })
})