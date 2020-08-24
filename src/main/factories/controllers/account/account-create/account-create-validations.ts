import {ValidatorComposite, EmailValidator, CompareFieldsValidator, LengthValidator} from '../../../../../validators/'
import { EmailValidatorAdapter } from '../../../../../infra/validator/email-validator'

export const makeAccountValidation = ():ValidatorComposite => {
    
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const emailValidator = new EmailValidator(emailValidatorAdapter)
    const compareFields = new CompareFieldsValidator('password', 'passwordConfirmation')
    const nameSize = new LengthValidator('name', 2, 20)
    const passwordSize = new LengthValidator('password', 6, 10)

    const validatorsArray = []
    validatorsArray.push(nameSize, passwordSize, compareFields, emailValidator)

    return new ValidatorComposite(validatorsArray)
}