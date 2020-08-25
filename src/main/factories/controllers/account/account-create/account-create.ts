import { AccountCreateController } from "../../../../../presentation/controllers/account/account-create";
import { makeAccountValidation } from "./account-create-validations";
import { BcryptAdapter } from "../../../../../infra/bcrypt/bcrypt-adapter";
import { TypeOrmAdapter } from "../../../../../infra/db/typeorm-adapter";
import { CreateAccount } from "../../../../../data/usecases/account/account-create";

export const makeAccountCreate = ():AccountCreateController => {
    const encrypter = new BcryptAdapter(10)
    const addAccount = new TypeOrmAdapter()
    const createAccount = new CreateAccount(encrypter, addAccount)
    return new AccountCreateController(makeAccountValidation(), createAccount)
}