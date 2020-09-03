import { IDeleteAccount } from "../../../src/domain/usecases/account/account-delete"
import { DeleteAccount } from "../../../src/data/usecases/account/account-delete"
import { TypeOrmAdapter } from "../../../src/infra/db/typeorm-adapter"
import { LoadAccountByIdStub } from "../../mocks/loads/load-account-by-id-stub"
import { UncryptPasswordAdapterStub } from "../../mocks/bcrypt/uncrypt-stub"
import { DeleteAccountStub } from "../../mocks/loads/delete-account-stub"
import { ILoadAccountById } from "../../../src/domain/usecases/account/account-get-by-id"
import { IUncrypt } from "../../../src/data/protocols/criptography/encrypter-field"
import { IDeleteAdapter } from "../../../src/data/protocols/db/account/account-delete"
import { TAccount } from "../../../src/domain/models/account/account"
import { TAccountDelete } from "../../../src/domain/models/account/account-delete"

const httpRequest:TAccountDelete = {
    id:'valid_id',
    password:'password'
}

const validAccount:TAccount = {
    name:"name_updated",
    email:"valid_mail@mail.com",
    password:'hashedPassword',
    id:'valid_id',
    isActive:false
}

type SutTypes = {
    sut:IDeleteAccount
    loadAccountById:ILoadAccountById
    uncryptPassword:IUncrypt
    deleteAccountAdapter:IDeleteAdapter
}

const makeSut = ():SutTypes => {
    const loadAccountById = new LoadAccountByIdStub()
    const uncryptPassword = new UncryptPasswordAdapterStub()
    const deleteAccountAdapter = new DeleteAccountStub()
    const sut = new DeleteAccount(loadAccountById,uncryptPassword,deleteAccountAdapter)
    return {
        sut,
        loadAccountById,
        uncryptPassword,
        deleteAccountAdapter
    } 
}

describe('Account Delete', () => {
    test('Ensure to loadAccountById to have been called with correct params', async() =>{
        const {sut, loadAccountById} = makeSut()
        const loadAccountByIdSpy = jest.spyOn(loadAccountById, 'getById')
        await sut.delete(httpRequest)
        expect(loadAccountByIdSpy).toHaveBeenCalledWith('valid_id')
    })
    test('Ensure to loadAccountById return a string error if doenst find an account', async () =>{
        const {sut, loadAccountById} = makeSut()
        jest.spyOn(loadAccountById, 'getById').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
        const result = await sut.delete(httpRequest)
        expect(result). toEqual('Conta não encontrada')
    })
    test('Ensure to AccountDelete throws if loadAccountById throws', async() => {
        const {sut, loadAccountById} = makeSut()
        jest.spyOn(loadAccountById, 'getById').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => {
                throw new Error()
            })
        })
        await expect(sut.delete(httpRequest))
        .rejects
        .toThrow()
    })
    test('Ensure ')
})