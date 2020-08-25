export interface IEncrypt{
    encrypt(plainText:string):Promise<string>
}

export interface IUncrypt {
    uncrypt(password:string, cypherText:string):Promise<boolean>
}