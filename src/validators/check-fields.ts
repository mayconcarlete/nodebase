import { IValidator } from "../presentation/protocols";
import { MissingParamError } from "../presentation/errors";

export class CheckFields implements IValidator{
    private readonly field:string
    
    constructor(field:string){
        this.field = field
    }
    
    validate(data: any): Error | undefined {
        if(!data[this.field]){
            return new MissingParamError(this.field)
        }
    }
}