import { IValidator } from "../../../src/presentation/protocols";
import { InvalidParamError } from "../../../src/presentation/errors";

export class EmailValidatorStub implements IValidator{
    validate(data: any): Error {
        return undefined
    }
}