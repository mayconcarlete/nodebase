import { ValidatorComposite, CheckFields, CompareFieldsValidator, LengthValidator } from "../../../../../validators";

export const makeAccountUpdatePasswordValidator = ():ValidatorComposite =>{
    const validatorsArray = []
    const fields = ['id', 'password', 'newPassword', 'newPasswordConfirmation']
    
    for(const field of fields){
        validatorsArray.push(new CheckFields(field))
    }
    validatorsArray.push(new LengthValidator('password', 6, 10))
    validatorsArray.push(new LengthValidator('newPassword', 6, 10))
    validatorsArray.push(new CompareFieldsValidator('newPassword', 'newPasswordConfirmation'))
    
    return new ValidatorComposite(validatorsArray)
}