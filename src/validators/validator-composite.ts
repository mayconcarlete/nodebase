import { IValidator } from "../presentation/protocols";

export class ValidatorComposite implements IValidator{
    private readonly validatorsArray:IValidator[]
    
    constructor(validatorsArray:IValidator[]){
        this.validatorsArray = validatorsArray
    }
    
    validate(data: any): Error | undefined {
        for (const validator of this.validatorsArray) {
            const error = validator.validate(data)
            if(error){
                return error
            }
        }
    }

}