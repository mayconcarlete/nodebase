import {CompareFieldsValidator} from '../../src/validators'
import { InvalidParamError } from '../../src/presentation/errors'

const field ='password'
const fieldToCompare = 'passwordConfirmation'

const makeSut = ():CompareFieldsValidator => {
    const sut = new CompareFieldsValidator(field, fieldToCompare)
    return sut
}

describe('Compare Field validation', () => {
    test('Should return an error if passwords are different', () => {
        const sut = makeSut()
        const httpRequest= {
            body:{
                [field]:'any_value',
                [fieldToCompare]:'different_value'
            }
        }
        const result = sut.validate(httpRequest.body)
        expect(result).toEqual(new InvalidParamError(fieldToCompare))
    })
    test('Should be falsy if password and password confirmation are equals', () => {
        const sut = makeSut()
        const httpRequest = {
            body:{
                [field]:'valid_password',
                [fieldToCompare]:'valid_password'
            }
        }

        const result = sut.validate(httpRequest.body)
        expect(result).toBeFalsy()
    })
})