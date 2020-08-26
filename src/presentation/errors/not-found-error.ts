export class NotFound extends Error{
    constructor(paramName:string){
        super(`Can't find: ${paramName}`)
        this.name ='NotFound'
    }
}