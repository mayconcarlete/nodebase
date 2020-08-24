import { LengthValidator } from '../src/validators'
import { InvalidParamError } from '../src/presentation/errors'

const field = 'name'
const makeSut = ():LengthValidator => {
    const sut = new LengthValidator(field,2, 20)
    return sut
}

describe('Test Length size of field class', () => {
    test('Should return invalid param error if field length are shorter then minimum', () => {
        const sut = makeSut()
        const httpRequest = {
            body:{
                [field]:"a"
            }
        }

        const result = sut.validate(httpRequest.body)
        expect(result).toEqual(new InvalidParamError(field))
    })
    test('Should return invalid param error if field length are bigger then maximum', () => {
        const sut = makeSut()
        const httpRequest = {
            body:{
                [field]:'Maximum test lenght value'
            }
        }
        const result = sut.validate(httpRequest.body)
        expect(result).toEqual(new InvalidParamError(field))
    })
    test('Should be falsy if field length are ok', ()=>{
        const sut = makeSut()
        const httpRequest = {
            body:{
                [field]:'Happy Case'
            }
        }
        const result = sut.validate(httpRequest.body)
        expect(result).toBeFalsy()
    })
})