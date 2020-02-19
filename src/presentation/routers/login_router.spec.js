const LoginRouter = require('./login_router')
const MissingParamError = require('../helpers/missing_param_error')

const makeSut = () => {
    return new LoginRouter()
}

describe('Login Router', () => {
    test('Should Return 400 if email is not provided', () => {
        httpRequest = {
            body: {
                password: 'any_password'
            }
        }
        const sut = makeSut()
        httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })

    test('Should Return 400 if password is not provided', () => {
        httpRequest = {
            body: {
                email: 'any_email'
            }
        }
        const sut = makeSut()
        httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })

    test('Should Return 500 if httpRequest is not provided', () => {
        const sut = makeSut()
        httpResponse = sut.route()
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should Return 500 if httpRequest has not body', () => {
        const sut = makeSut()
        const httpRequest = {}
        httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })

})
