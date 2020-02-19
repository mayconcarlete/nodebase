class LoginRouter {
    route(httpRequest) {
        if (!httpRequest) {
            return {
                statusCode: 500
            }
        }
        if (!httpRequest.body) {
            return HttpResponse.serverError()
        }
        const { email, password } = httpRequest.body
        if (!email) {
            return HttpResponse.badRequest('email')
        }
        if (!password) {
            return HttpResponse.badRequest('password')
        }
    }
}
class HttpResponse {
    static badRequest(paramName) {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName)
        }
    }
    static serverError() {
        return {
            statusCode: 500
        }
    }
}

class MissingParamError extends Error {
    constructor(paramName) {
        super('Missing param: ' + paramName)
        this.name = 'MissingParamError'
    }
}

describe('Login Router', () => {
    test('Should Return 400 if email is not provided', () => {
        httpRequest = {
            body: {
                password: 'any_password'
            }
        }
        const sut = new LoginRouter()
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
        const sut = new LoginRouter()
        httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })

    test('Should Return 500 if httpRequest is not provided', () => {
        const sut = new LoginRouter()
        httpResponse = sut.route()
        expect(httpResponse.statusCode).toBe(500)
    })
    test('Should Return 500 if httpRequest has not body', () => {
        const sut = new LoginRouter()
        const httpRequest = {}
        httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })
})
