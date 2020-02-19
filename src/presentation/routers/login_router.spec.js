class LoginRouter {
    route(httpRequest) {
        if (!httpRequest) {
            return {
                statusCode: 500
            }
        }
        if (!httpRequest.body) {
            return {
                statusCode: 500
            }
        }
        const { email, password } = httpRequest.body
        if (!email || !password) {
            return {
                statusCode: 400
            }
        }

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
