import { ValidatorComposite, CheckFields, LengthValidator } from "../../../../../validators";

export const makeAccountDeleteValidators = ():ValidatorComposite => {
    const validatorsArray = []
    const fields = ['id', 'password']
    for(const field of fields){
        validatorsArray.push(new CheckFields(field))
    }
    validatorsArray.push(new LengthValidator('password', 6, 10))
    return new ValidatorComposite(validatorsArray)
}