// //Yup Validator Class
// const sut = require('../../src/app/services/yup_service')

// describe('Unit test to check Yup Validate', () => {
//     it('Should return true if fields are correct', async () => {

//         const fields = {
//             email: 'valid_email@email.com',
//             name: 'valid_name',
//             password: 'valid_password',
//             confirmPassword: 'valid_password'
//         }
//         const result = await sut.checkFields(fields)
//         expect(result).toBe(true)
//     })
//     it('should return false if email are incorrect', async () => {
//         const fields = {
//             email: 'invalid_email',
//             name: 'valid_name',
//             password: 'valid_password',
//             confirmPassword: 'valid_password'
//         }
//         const result = await sut.checkFields(fields)
//         expect(result).toBe(false)
//     })
//     it('should return false if name are incorrect', async () => {
//         const fields = {
//             email: 'valid_email@email.com',
//             name: 'x', //min 3 characters
//             password: 'valid_password',
//             confirmPassword: 'valid_password'
//         }
//         const result = await sut.checkFields(fields)
//         expect(result).toBe(false)
//     })
//     it('should return false if password are incorrect', async () => {
//         const fields = {
//             email: 'valid_email@email.com',
//             name: 'valid_name',
//             password: '12345',//min 6 characters
//             confirmPassword: 'valid_password'
//         }
//         const result = await sut.checkFields(fields)
//         expect(result).toBe(false)
//     })
//     it('should return false if confirm password are incorrect', async () => {
//         const fields = {
//             email: 'valid_email@email.com',
//             name: 'valid_name',
//             password: 'valid_password',
//             confirmPassword: undefined //undefined confirm password
//         }
//         const result = await sut.checkFields(fields)
//         expect(result).toBe(false)
//     })
// })