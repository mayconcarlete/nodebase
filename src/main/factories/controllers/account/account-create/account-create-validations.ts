import {CheckFields,ValidatorComposite, EmailValidator, CompareFieldsValidator, LengthValidator} from '../../../../../validators/'
import { EmailValidatorAdapter } from '../../../../../infra/validator/email-validator'
import { CreateAccount } from '../../../../../data/usecases/account/account-create'

export const makeAccountValidation = ():ValidatorComposite => {
    const validatorsArray = []
    
    const fields = ['name', 'email', 'password', 'passwordConfirmation']
    for(const field of fields){
        validatorsArray.push(new CheckFields(field))    
    }
    
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const emailValidator = new EmailValidator(emailValidatorAdapter)
    const compareFields = new CompareFieldsValidator('password', 'passwordConfirmation')
    const nameSize = new LengthValidator('name', 2, 20)
    const passwordSize = new LengthValidator('password', 6, 10)

    validatorsArray.push(nameSize, passwordSize, compareFields, emailValidator)

    return new ValidatorComposite(validatorsArray)
}