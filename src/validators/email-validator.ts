import {IEmailValidator} from './interfaces'
import { IValidator } from '../presentation/protocols'
import { InvalidParamError } from '../presentation/errors'

export class EmailValidator implements IValidator {
    
    private readonly emailValidator: IEmailValidator

    constructor(emailValidator:IEmailValidator){
        this.emailValidator = emailValidator
    }

    validate(data: any): Error | undefined {
        const result = this.emailValidator.isEmail(data['email'])
        if(!result){
            return new InvalidParamError('email')
        }
        return undefined
    }

}