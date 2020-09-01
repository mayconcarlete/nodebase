import { UpdateAccountEmail } from "../../../src/data/usecases/account/account-update-email"
import { ILoadAccountById } from "../../../src/domain/usecases/account/account-get-by-id"
import { ILoadAccountByEmail } from "../../../src/data/protocols/db/account/load-account-by-email"
import { IUpdateAccountAdapter } from "../../../src/data/protocols/db/account/account-update-adapter"
import { LoadAccountByIdStub } from "../../mocks/loads/load-account-by-id-stub"
import { LoadAccountByEmailStub } from "../../mocks/loads/load-account-by-email-stub"
import { TAccount } from "../../../src/domain/models/account/account"
import { TAccountUpdateEmail } from "../../../src/domain/models/account/account-update-email"
import { IUncrypt } from "../../../src/data/protocols/criptography/encrypter-field"
import { TAccountUpdate } from "../../../src/domain/models/account/account-update"

type SutTypes = {
    sut:UpdateAccountEmail
    loadAccountById:ILoadAccountById
    loadAccountByEmail:ILoadAccountByEmail
    uncryptPassword:IUncrypt
    updateAccountEmailAdapter:IUpdateAccountAdapter
}
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

class UpdateAccountEmailStub implements IUpdateAccountAdapter{
    async updateAccount(accountUpdate: TAccountUpdate): Promise<string | TAccount> {
        return validAccount
    }
}
class UncryptPasswordAdapter implements IUncrypt{
    async uncrypt(password: string, cypherText: string): Promise<boolean> {
        return true
    }

}
const makeSut = ():SutTypes => {
    const loadAccountById = new LoadAccountByIdStub()
    const loadAccountByEmail = new LoadAccountByEmailStub()
    const updateAccountEmailAdapter = new UpdateAccountEmailStub()
    const uncryptPassword = new UncryptPasswordAdapter()
    const sut = new UpdateAccountEmail(loadAccountById, loadAccountByEmail,  updateAccountEmailAdapter, uncryptPassword)
    return {sut, loadAccountById,loadAccountByEmail, updateAccountEmailAdapter, uncryptPassword}
}

describe('Update Account Email class', ()=>{
    test('Ensure checkEmailOnDb to have been called with correct params', async () => {
        const {sut, loadAccountByEmail} = makeSut()
        const loadAccountByEmailSpy = jest.spyOn(loadAccountByEmail, 'load')
        await sut.updateAccount(httpRequest)
        expect(loadAccountByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com')
    })
    test('Ensure updateEmail throws if checkEmailOnDb throw', async () => {
        const {sut, loadAccountByEmail} = makeSut()
        jest.spyOn(loadAccountByEmail, 'load').mockImplementation(async () =>{
          throw new Error()
        })
        const result = sut.updateAccount(httpRequest)
        await expect(result).rejects.toThrow()
    })
    test('Ensure updateEmail return a string if email already exists', async () => {
        const {sut, loadAccountByEmail} = makeSut()
        jest.spyOn(loadAccountByEmail, 'load').mockReturnValueOnce(new Promise(resolve=>resolve(validAccount)))
        const result = await sut.updateAccount(httpRequest)
        expect(result).toEqual("Email already exists on db")
    })
    test('Ensure loadAccountById to have been called with correct params', async ()=>{
        const {sut, loadAccountById} = makeSut()
        const loadAccountByIdSpy = jest.spyOn(loadAccountById, 'getById')
        await sut.updateAccount(httpRequest)
        expect(loadAccountByIdSpy).toHaveBeenCalledWith('valid_id')
    })
    test('Ensure updateEmail throws if loadAccountById throw', async() => {
        const {sut, loadAccountById} = makeSut()
        jest.spyOn(loadAccountById, 'getById').mockImplementationOnce(async () => {
            return new Promise((resolve, reject)=>{
                throw new Error()
            })
        })
        const result = sut.updateAccount(httpRequest)
        expect(result).rejects.toThrow()
    })
    test('Ensure updateEmail return a string if loadAccountById return undefined', async ()=>{
        const {sut, loadAccountById} = makeSut()
        jest.spyOn(loadAccountById, 'getById').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
        const result = await sut.updateAccount(httpRequest)
        expect(result).toEqual("Id doesnt found")
    })
    test('Ensure uncryptPassword to have been called with correct params', async ()=>{
        const {sut, uncryptPassword} = makeSut()
        const uncryptPasswordSpy = jest.spyOn(uncryptPassword, 'uncrypt')
        await sut.updateAccount(httpRequest)
        expect(uncryptPasswordSpy).toHaveBeenCalledWith('password','hashedPassword')
    })
    test('Ensure updateEmail throw if uncryptPassword throw', async () => {
        const {sut, uncryptPassword} = makeSut()
        jest.spyOn(uncryptPassword, 'uncrypt').mockImplementationOnce(async () => {
            return new Promise(() => {
                throw new Error()
            })
        })
        sut.updateAccount(httpRequest)
        await expect(sut.updateAccount).rejects.toThrow()
    })
    test('Ensure updateEmail return a string if uncryptPassword fails', async ()=>{
        const {sut, uncryptPassword} = makeSut()
        jest.spyOn(uncryptPassword, 'uncrypt').mockReturnValueOnce(new Promise(resolve => resolve(false)))
        const result = await sut.updateAccount(httpRequest)
        expect(result).toEqual("Password doesnt match")
    })
    test('Ensure updateAccountEmailAdapter to have been called with', async () => {
        const {sut, updateAccountEmailAdapter} = makeSut()
        const updateAccountEmailAdapterSpy = jest.spyOn(updateAccountEmailAdapter, 'updateEmailDb') 
        await sut.updateEmail(httpRequest)
        expect(updateAccountEmailAdapterSpy).toHaveBeenCalledWith( 'valid_id',"valid_email@mail.com")
    })
    test('Ensure updateAccount throws if udpateAccountEmailAdapter throws', async () =>{
        const {sut, updateAccountEmailAdapter} = makeSut()
        jest.spyOn(updateAccountEmailAdapter, 'updateAccount').mockImplementationOnce(()=>{
            return new Promise(()=>{
                throw new Error()
            })
        })
        await expect(sut.updateEmail(httpRequest))
        .rejects
        .toThrow()
    })
    test('Ensure updateEmail return a string if updateAccountEmailAdapter fails', async () =>{
        const {sut, updateAccountEmailAdapter} = makeSut()
        jest.spyOn(updateAccountEmailAdapter, 'updateEmailDb').mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                resolve(undefined)
            })
        })
        const result = await sut.updateEmail(httpRequest)
        expect(result).toEqual("Cant update user")
    })
    test('Should return an updated user if everything is ok', async () => {
        const {sut} = makeSut()
        const result = await sut.updateEmail(httpRequest)
        expect(result).toEqual(validAccount)
    })
})