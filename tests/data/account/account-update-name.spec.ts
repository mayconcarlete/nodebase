import { IUpdateAccount } from "../../../src/domain/usecases/account/account-update"
import { ILoadAccountById } from "../../../src/domain/usecases/account/account-get-by-id"
import { IUncrypt } from "../../../src/data/protocols/criptography/encrypter-field"
import { IUpdateAccountAdapter } from "../../../src/data/protocols/db/account/account-update-adapter"
import { UpdateAccountName } from "../../../src/data/usecases/account/account-update-name"
import { LoadAccountByIdStub } from "../../mocks/loads/load-account-by-id-stub"
import { UncryptPasswordAdapterStub } from "../../mocks/bcrypt/uncrypt-stub"
import { TAccountUpdate } from "../../../src/domain/models/account/account-update"
import { TAccount } from "../../../src/domain/models/account/account"
import { TAccountUpdateName } from "../../../src/domain/models/account/account-update-name"

const httpRequest:TAccountUpdateName = {
    id:'valid_id',
    password:'password',
    name:'new_name'
}

const validAccount:TAccount = {
    name:"name_updated",
    email:"valid_mail@mail.com",
    password:'hashedPassword',
    id:'valid_id',
    isActive:true
}
type SutTypes = {
    sut:IUpdateAccount
    loadAccountById:ILoadAccountById
    uncryptPassword:IUncrypt
    updateAccountName:IUpdateAccountAdapter
}

class UpdateAccountNameStub implements IUpdateAccount{
    async updateAccount(account: TAccountUpdate): Promise<string | TAccount> {
        return validAccount  
    }
}

const makeSut = ():SutTypes =>{
    const updateAccountName = new UpdateAccountNameStub()
    const uncryptPassword = new UncryptPasswordAdapterStub()
    const loadAccountById = new LoadAccountByIdStub()
    const sut = new UpdateAccountName(loadAccountById,uncryptPassword,updateAccountName)
    return {
        sut,
        uncryptPassword,
        loadAccountById,
        updateAccountName
    }
}

describe('Update Account Name', () =>{
    test('Ensure call loadAccountById with correct params', async () =>{
        const {sut, loadAccountById} = makeSut()
        const loadAccountByIdSpy = jest.spyOn(loadAccountById, 'getById')
        await sut.updateAccount(httpRequest)
        expect(loadAccountByIdSpy).toHaveBeenCalledWith('valid_id')
    })
    test('Ensure loadAccountById return a string error if doesnt found an account', async() => {
        const {sut, loadAccountById} = makeSut()
        jest.spyOn(loadAccountById, 'getById').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
        const result = await sut.updateAccount(httpRequest)
        expect(result).toEqual('Usuário não encontrado')
    })
    test('Ensure updateAccountName throws if loadAccountById throws', async()=>{
        const {sut, loadAccountById} = makeSut()
        jest.spyOn(loadAccountById, 'getById').mockImplementationOnce(async () =>{
            return new Promise((resolve, reject)=>{
                throw new Error()
            })
        })
        await expect(sut.updateAccount(httpRequest))
        .rejects
        .toThrow()
    })
    test('Ensure to call uncrypt method with correct params', async () => {
        const {sut, uncryptPassword} = makeSut()
        const uncryptPasswordSpy = jest.spyOn(uncryptPassword, 'uncrypt')
        await sut.updateAccount(httpRequest)
        expect(uncryptPasswordSpy).toHaveBeenCalledWith('password','hashedPassword')
    })
    test('Ensure to return a string if uncrypt method return false', async () =>{
        const {sut, uncryptPassword} = makeSut()
        jest.spyOn(uncryptPassword, 'uncrypt').mockReturnValueOnce(new Promise(resolve => resolve(false)))
        const result = await sut.updateAccount(httpRequest)
        expect(result).toEqual('Error ao decryptar password')
    })
    test('Ensure to accountUpdateName throws if uncrypt throws', async() => {
        const {sut, uncryptPassword} = makeSut()
        jest.spyOn(uncryptPassword, 'uncrypt').mockImplementationOnce(async ()=>{
            return new Promise(()=>{
                throw new Error()
            })
        }) 
        await expect(sut.updateAccount(httpRequest))
        .rejects
        .toThrow()
    })
    test('Ensure updateAccount method to have been called with correct params', async() =>{
        const {sut, updateAccountName} = makeSut()
        const updateAccountNameSpy = jest.spyOn(updateAccountName, 'updateAccount')
        await sut.updateAccount(httpRequest)
        expect(updateAccountNameSpy).toHaveBeenCalledWith({
            id:'valid_id',
            name:'new_name'
        })
    })
    test('Ensure updateAccount method return a string error if updateaccound doesnt works', async () =>{
        const {sut, updateAccountName} = makeSut()
        jest.spyOn(updateAccountName, 'updateAccount').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
        const result = await sut.updateAccount(httpRequest)
        expect(result).toEqual('Não foi possível atualizar nome')
    })
    test('Ensure updateAccountName throws if updateAccount method throws', async () =>{
        const {sut, updateAccountName} = makeSut()
        jest.spyOn(updateAccountName, 'updateAccount').mockImplementationOnce(async () =>{
            return new Promise(()=>{
                throw new Error()
            })
        })
        await expect(sut.updateAccount(httpRequest))
        .rejects
        .toThrow()
    })
    test('Ensure to return an updated account if everything works well', async() =>{
        const {sut} = makeSut()
        const result = await sut.updateAccount(httpRequest)
        expect(result).toEqual({
            name:"name_updated",
            email:"valid_mail@mail.com",
            password:'hashedPassword',
            id:'valid_id',
            isActive:true
        })
    })
})