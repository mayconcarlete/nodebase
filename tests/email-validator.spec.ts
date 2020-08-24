import {EmailValidator} from '../src/validators/'
import { IEmailValidator } from '../src/validators/interfaces'
import { InvalidParamError } from '../src/presentation/errors'

class EmailValidatorAdaperStub implements IEmailValidator{
    isEmail(email: string): boolean {
        return true
    }

}
type SutTypes = {
    sut:EmailValidator,
    emailValidatorAdapter: EmailValidatorAdaperStub
}

const makeSut = ():SutTypes =>{
    const emailValidatorAdapter = new EmailValidatorAdaperStub()
    const sut = new EmailValidator(emailValidatorAdapter)
    return {
        sut,
        emailValidatorAdapter
    }
}

describe('Test Email Validator', () => {
    test('Ensure isEmail will be called with correct params', () => {
        const {sut, emailValidatorAdapter} = makeSut()
        const emailValidatorAdapterSpy = jest.spyOn(emailValidatorAdapter, 'isEmail')
        const httpRequest = {
            body:{
                email:'any_mail@mail.com'
            }
        }
        sut.validate(httpRequest.body)
        expect(emailValidatorAdapterSpy).toHaveBeenCalledWith('any_mail@mail.com')
    })
    test('Should return Invalid param error if email are incorrect', () => {
        const {sut, emailValidatorAdapter} = makeSut()
        const httpRequest = {
            body:{
                email:'invalid_email@mail.com'
            }
        }
        jest.spyOn(emailValidatorAdapter, 'isEmail').mockReturnValueOnce(false)
        const result = sut.validate(httpRequest.body)
        expect(result).toEqual(new InvalidParamError('email'))
    })
    test('Should throw if isEmail method throws', () => {
        const {sut, emailValidatorAdapter} = makeSut()
        const httpRequest = {
            body:{
                email:'any_mail@mail.com'
            }
        }
        jest.spyOn(emailValidatorAdapter, 'isEmail').mockImplementationOnce(() => {
            throw Error()
        })
        expect(sut.validate).toThrow()
    })
    test('Should be falsy if email is correct', () => {
        const {sut, emailValidatorAdapter} = makeSut()
        const httpRequest= {
            body:{
                email:'valid_mail@mail.com'
            }
        }
        const result = sut.validate(httpRequest.body)
        expect(result).toBeFalsy()
    })
})