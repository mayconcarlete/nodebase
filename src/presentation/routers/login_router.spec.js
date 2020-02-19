class LoginRouter {
    route(httpRequest) {
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
})
