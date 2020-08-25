export interface IEncrypt{
    encrypt(plainText:string):Promise<string>
}