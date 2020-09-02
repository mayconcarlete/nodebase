import { UpdateAccountPasswordController } from "../../../../../presentation/controllers/account/account-update-password";
import { UpdateAccountName } from "../../../../../data/usecases/account/account-update-name";
import { TypeOrmAdapter } from "../../../../../infra/db/typeorm-adapter";
import { BcryptAdapter } from "../../../../../infra/bcrypt/bcrypt-adapter";
import { UpdateAccountNameController } from "../../../../../presentation/controllers/account/account-update-name";
import { makeAccountUpdateNameValidators } from "./account-update-name-validators";

export const makeUpdateAccountName = ():UpdateAccountNameController =>{
    const typeOrmAdapter = new TypeOrmAdapter()
    const saltRounds = 10
    const uncryptAdapter = new BcryptAdapter(saltRounds)
    const updateAccountName = new UpdateAccountName(typeOrmAdapter,uncryptAdapter,typeOrmAdapter)
    return new UpdateAccountNameController(makeAccountUpdateNameValidators(), updateAccountName)
}