export class EmailOrPasswordInvalid extends Error{
    constructor(){
        super(`Email or Password are wrong.`)
        this.name = 'EmailOrPasswordInvalid'
    }
}