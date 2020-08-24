import { IValidator } from "../presentation/protocols";
import { InvalidParamError } from "../presentation/errors";

export class CompareFieldsValidator implements IValidator{

    private readonly field:string
    private readonly fieldToCompare:string

    constructor(field:string, fieldToCompare:string){
        this.field = field
        this.fieldToCompare = fieldToCompare
    }

    validate(data: any): Error | undefined {
        if(data[this.field] !== data[this.fieldToCompare]){
            return new InvalidParamError(this.fieldToCompare)
        }
        return undefined
    }
    
}