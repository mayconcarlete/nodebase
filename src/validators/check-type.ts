import { IValidator } from "../presentation/protocols";
import { type } from "os";
import { InvalidParamError } from "../presentation/errors";

export class CheckType implements IValidator{
    private readonly paramName:string
    private readonly typeCheck:string
    constructor(paramName:string, typeCheck:string){
        this.paramName = paramName
        this.typeCheck = typeCheck
    }
    validate(data: any): Error {
        if(data[this.paramName] && typeof(data[this.paramName]) === this.typeCheck){
            return 
        }
        return new InvalidParamError(this.paramName)
    }

}