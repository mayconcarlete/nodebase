import { IEmailValidator } from "../interfaces";
import validator from 'validator'

export class ValidatorAdapter implements IEmailValidator{
    isEmail(email: string): boolean {
        return validator.isEmail(email)
    }   
}