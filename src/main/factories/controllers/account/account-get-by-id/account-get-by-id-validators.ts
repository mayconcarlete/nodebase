import { ValidatorComposite, CheckFields, CheckType } from "../../../../../validators";

export const makeGetAccountByIdValidators = ():ValidatorComposite => {
    const validatorsArray = []
    const field = 'id'
    validatorsArray.push(new CheckFields(field))
    validatorsArray.push(new CheckType(field,'string'))
    return new ValidatorComposite(validatorsArray)    
}