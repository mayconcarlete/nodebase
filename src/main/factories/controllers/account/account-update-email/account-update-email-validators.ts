import { ValidatorComposite, CheckFields, EmailValidator } from "../../../../../validators";
import { EmailValidatorAdapter } from "../../../../../infra/validator/email-validator";

export const makeUpdateAccountEmailValidators = (): ValidatorComposite => {
    const validatorsArray = []
    const fields = ['email', 'id', 'password']
    for(const field of fields){
        validatorsArray.push(new CheckFields(field))
    }

    const emailValidatorAdapter = new EmailValidatorAdapter()
    const emailValidator = new EmailValidator(emailValidatorAdapter)
    validatorsArray.push(emailValidator)

    return new ValidatorComposite(validatorsArray)
}