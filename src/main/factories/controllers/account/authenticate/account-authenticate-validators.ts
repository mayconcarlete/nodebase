import { ValidatorComposite, CheckFields, EmailValidator, LengthValidator } from "../../../../../validators";
import { EmailValidatorAdapter } from "../../../../../infra/validator/email-validator";

export const makeAuthenticateValidators = ():ValidatorComposite => {
    const fields = ['email', 'password']
    const validatorArray = [] 

    for (const field of fields) {
        validatorArray.push(new CheckFields(field))
    }

    const emailValidatorAdapter = new EmailValidatorAdapter()
    validatorArray.push(new EmailValidator(emailValidatorAdapter))

    validatorArray.push(new LengthValidator('password', 6,10))

    return new ValidatorComposite(validatorArray)
}