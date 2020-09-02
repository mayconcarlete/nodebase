import { ValidatorComposite, CheckFields, LengthValidator } from "../../../../../validators"

export const makeAccountUpdateNameValidators = ():ValidatorComposite =>{
    const validatorsArray = []
    const fields = ['id', 'name', 'password']
    
    for(const field of fields){
        validatorsArray.push(new CheckFields(field))
    }
    validatorsArray.push(new LengthValidator('name', 2, 20))
    return new ValidatorComposite(validatorsArray)
}