class LoginRouter {
    route(httpRequest) {
        if (!httpRequest.body.email) {
            return {
                statusCode: 400
            }
        }
    }
}

describe('Login Router', () => {
    test('Should Return 400 if no email is provided', () => {
        httpRequest = {
            body: {
                password: 'any_password'
            }
        }
        const sut = new LoginRouter()
        httpResponse = sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
})
