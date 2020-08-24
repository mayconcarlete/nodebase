export interface IValidator{
    validate(data:any):Error | undefined
}