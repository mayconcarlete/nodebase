import { UpdateAccountPasswordController } from "../../../../../presentation/controllers/account/account-update-password";
import { makeAccountUpdatePasswordValidator } from "./account-update-password-validators";
import { UpdateAccountPassword } from "../../../../../data/usecases/account/account-update-password";
import { TypeOrmAdapter } from "../../../../../infra/db/typeorm-adapter";
import { BcryptAdapter } from "../../../../../infra/bcrypt/bcrypt-adapter";

export const makeAccountUpdatePassword = ():UpdateAccountPasswordController => {
    const validators = makeAccountUpdatePasswordValidator()
    const dbAdapter = new TypeOrmAdapter()
    const saltRounds = 10
    const encrypter = new BcryptAdapter(saltRounds)
    const updateAccountPassword = new UpdateAccountPassword(dbAdapter,encrypter,dbAdapter,encrypter)
    return new UpdateAccountPasswordController(validators, updateAccountPassword)
}