import { AccountCreateController } from "../../../../../presentation/controllers/account/account-create";
import { makeAccountValidation } from "./account-create-validatiors";
import { BcryptAdapter } from "../../../../../infra/bcrypt/bcrypt-adapter";
import { TypeOrmAdapter } from "../../../../../infra/db/typeorm-adapter";
import { CreateAccount } from "../../../../../data/usecases/account/account-create";
import { JwtAdapter } from "../../../../../infra/jsonwebtoken/jwt";

export const makeAccountCreate = ():AccountCreateController => {

    const encrypter = new BcryptAdapter(10)
    const typeOrmAdapter = new TypeOrmAdapter()
    const authenticator = new JwtAdapter()
    const createAccount = new CreateAccount(encrypter, typeOrmAdapter,typeOrmAdapter)
    
    return new AccountCreateController(makeAccountValidation(), createAccount, authenticator)
}