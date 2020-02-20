const MissingParamError = require('./missing_param_error')
const UnauthorizedError = require('./unauthorized_error')
const ServerError = require('./server_error copy')
module.exports = class HttpResponse {
    static ok(data) {
        return {
            statusCode: 200,
            body: data
        }
    }

    static badRequest(paramName) {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName)
        }
    }
    static unauthorizedError() {
        return {
            statusCode: 401,
            body: new UnauthorizedError()
        }
    }
    static serverError() {
        return {
            statusCode: 500,
            body: new ServerError()
        }
    }

}