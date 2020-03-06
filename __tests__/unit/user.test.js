// const User = require('../../src/app/mongodb/models/User')
// const bcrypt = require('bcryptjs')
// const userTest = {
//   name: 'valid_name',
//   email: 'valid_mail@mail.com',
//   password: 'valid_password',
//   confirmPassword: 'valid_password'
// }
// describe('User', () => {
//   it('should encrypt user password', async () => {
//     const user = await User.create({
//       name: 'Rafael',
//       email: 'rafaelsrios@hotmail.com',
//       password: '123456'
//     })
//     const compareHash = await bcrypt.compare('123456', user.password_hash)
//     expect(compareHash).toBe(true)
//   })
// })
