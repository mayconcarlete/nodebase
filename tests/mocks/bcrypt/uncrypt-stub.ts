import { IUncrypt } from "../../../src/data/protocols/criptography/encrypter-field";

export class UncryptPasswordAdapterStub implements IUncrypt{
    async uncrypt(password: string, cypherText: string): Promise<boolean> {
        return true
    }
}