import { AccountDeleteController } from "../../../../../presentation/controllers/account/account-delete";
import { makeAccountDeleteValidators } from "./account-delete-validators";
import { TypeOrmAdapter } from "../../../../../infra/db/typeorm-adapter";
import { DeleteAccount } from "../../../../../data/usecases/account/account-delete";
import { BcryptAdapter } from "../../../../../infra/bcrypt/bcrypt-adapter";

export const makeAccountDelete = ():AccountDeleteController => {
    const validators = makeAccountDeleteValidators()
    const typeOrmAdapter = new TypeOrmAdapter()
    const saltRounds = 10
    const bcryptAdapter = new BcryptAdapter(saltRounds)
    const deleteAccount = new DeleteAccount(typeOrmAdapter, bcryptAdapter,typeOrmAdapter)
    return new AccountDeleteController(validators, deleteAccount)
}