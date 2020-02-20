const LoginRouter = require('./login_router')
const MissingParamError = require('../helpers/missing_param_error')
const UnauthorizedError = require('../helpers/unauthorized_error')
const ServerError = require('../helpers/server_error copy')
const makeSut = () => {

    const authUseCaseSpy = makeAuthUseCase()
    authUseCaseSpy.accessToken = 'valid_token'
    const sut = new LoginRouter(authUseCaseSpy)
    return { authUseCaseSpy, sut }
}
const makeAuthUseCase = () => {
    class AuthUseCaseSpy {
        async auth(email, password) {
            this.email = email
            this.password = password
            return this.accessToken
        }
    }
    return new AuthUseCaseSpy()
}
const makeAuthUseCaseWithError = () => {
    class AuthUseCaseSpy {
        async auth(email, password) {
            throw new Error()
        }
    }
    return new AuthUseCaseSpy()
}
describe('Login Router', () => {
    test('Should Return 200 valid credentials are provided', async () => {
        const { sut, authUseCaseSpy } = makeSut()
        httpRequest = {
            body: {
                email: 'valid_email@mail.com',
                password: 'valid_password'
            }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body.accessToken).toEqual(authUseCaseSpy.accessToken)
    })
    test('Should Return 400 if email is not provided', async () => {
        httpRequest = {
            body: {
                password: 'any_password'
            }
        }
        const { sut } = makeSut()
        httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })
    test('Should Return 400 if password is not provided', async () => {
        httpRequest = {
            body: {
                email: 'any_email'
            }
        }
        const { sut } = makeSut()
        httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })
    test('Should Return 401 when invalid credentials are provided', async () => {
        httpRequest = {
            body: {
                email: 'invalid_email@mail.com',
                password: 'invalid_password'
            }
        }
        const { sut, authUseCaseSpy } = makeSut()
        authUseCaseSpy.accessToken = null
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(401)
        expect(httpResponse.body).toEqual(new UnauthorizedError())
    })
    test('Should Return 500 if httpRequest is not provided', async () => {
        const { sut } = makeSut()
        httpResponse = await sut.route()
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })
    test('Should Return 500 if httpRequest has not body', async () => {
        const { sut } = makeSut()
        const httpRequest = {}
        httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })
    test('Should Return 500 if no AuthUseCase is provided', async () => {
        const sut = new LoginRouter()
        httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password'
            }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })
    test('Should Return 500 if AuthUseCase has no auth method', async () => {
        class AuthUseCaseSpy {
        }
        const authUseCaseSpy = new AuthUseCaseSpy()
        const sut = new LoginRouter(authUseCaseSpy)
        httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password'
            }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })
    test('Should Return 500 if AuthUseCase throws', async () => {

        const authUseCaseSpy = makeAuthUseCaseWithError()
        authUseCaseSpy.accessToken = 'valid_token'
        const sut = new LoginRouter(authUseCaseSpy)

        httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password'
            }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })
    test('Should call AuthUseCase if correct params is provided', async () => {
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

})
