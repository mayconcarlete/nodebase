const { factory } = require('factory-girl')
const { User } = require('../src/app/models')

factory.define('User', User, {
    name: 'valid_name',
    email: 'valid_email@hotmail.com',
    password: 'valid_password',
    confirmPassword: 'valid_password'
})

module.exports = factory