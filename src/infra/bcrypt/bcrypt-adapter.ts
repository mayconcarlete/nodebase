import bcrypt from 'bcrypt'
import { IEncrypt, IUncrypt } from '../../data/protocols/criptography/encrypter-field';

export class BcryptAdapter implements IEncrypt, IUncrypt{
    private readonly saltRounds:number
    constructor(saltRounds:number){
        this.saltRounds = saltRounds
    }
    async encrypt(plainText: string): Promise<string> {
        const encryptedText = await bcrypt.hashSync(plainText, this.saltRounds)  
        return encryptedText 
    }
    async uncrypt(password:string, cypherText:string):Promise<boolean>{
        const result = await bcrypt.compareSync(password,cypherText)
        return result
    }
}