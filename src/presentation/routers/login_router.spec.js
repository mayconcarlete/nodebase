const LoginRouter = require('./login_router')
const MissingParamError = require('../helpers/missing_param_error')
const UnauthorizedError = require('../helpers/unauthorized_error')
const makeSut = () => {
    class AuthUseCaseSpy {
        auth(email, password) {
            this.email = email
            this.password = password
        }
    }
    const authUseCaseSpy = new AuthUseCaseSpy()
    const sut = new LoginRouter(authUseCaseSpy)
    return { authUseCaseSpy, sut }
}

describe('Login Router', () => {
    test('Should Return 400 if email is not provided', () => {
        httpRequest = {
            body: {
                password: 'any_password'
            }
        }
        const { sut } = makeSut()
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
        const { sut } = makeSut()
        httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })

    test('Should Return 500 if httpRequest is not provided', () => {
        const { sut } = makeSut()
        httpResponse = sut.route()
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should Return 500 if httpRequest has not body', () => {
        const { sut } = makeSut()
        const httpRequest = {}
        httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should call AuthUseCase if correct params is provided', () => {
        const { sut, authUseCaseSpy } = makeSut();
        httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password'
            }
        }
        sut.route(httpRequest)
        expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
        expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
    })

    test('Should Return 401 when invalid credentials are provided', () => {
        httpRequest = {
            body: {
                email: 'invalid_email@mail.com',
                password: 'invalid_password'
            }
        }
        const { sut } = makeSut()
        const httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(401)
        expect(httpResponse.body).toEqual(new UnauthorizedError())
    })
})
