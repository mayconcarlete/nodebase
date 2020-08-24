import { IEmailValidator } from "../../validators/interfaces";
import validator from 'validator'
export class EmailValidatorAdapter implements IEmailValidator{
    isEmail(email: string): boolean {
        const result = validator.isEmail(email)
        return result
    }

}