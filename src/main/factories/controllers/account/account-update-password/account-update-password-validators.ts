import { ValidatorComposite, CheckFields, CompareFieldsValidator } from "../../../../../validators";

export const makeAccountUpdatePasswordValidator = ():ValidatorComposite =>{
    const validatorsArray = []
    const fields = ['id', 'password', 'newPassword', 'newPasswordConfirmation']
    
    for(const field of fields){
        validatorsArray.push(new CheckFields(field))
    }
    validatorsArray.push(new CompareFieldsValidator('newPassword', 'newPasswordConfirmation'))
    
    return new ValidatorComposite(validatorsArray)
}