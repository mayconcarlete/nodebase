import bcrypt from 'bcrypt'
import { IEncrypt } from '../../data/protocols/criptography/encrypter-field';

export class BcryptAdapter implements IEncrypt{
    private readonly saltRounds:number
    constructor(saltRounds:number){
        this.saltRounds = saltRounds
    }
    async encrypt(plainText: string): Promise<string> {
        const encryptedText = await bcrypt.hashSync(plainText, this.saltRounds)  
        return encryptedText 
    }
}