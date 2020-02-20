const MissingParamError = require('./missing_param_error')

module.exports = class HttpResponse {
    static badRequest(paramName) {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName)
        }
    }
    static unauthorizedError() {
        return {
            statusCode: 401

        }
    }
    static serverError() {
        return {
            statusCode: 500
        }
    }

}