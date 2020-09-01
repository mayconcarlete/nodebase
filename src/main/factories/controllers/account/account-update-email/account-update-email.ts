import { UpdateAccountEmailController } from "../../../../../presentation/controllers/account/account-email-update"
import { makeUpdateAccountEmailValidators } from "./account-update-email-validators"
import { UpdateAccountEmail } from "../../../../../data/usecases/account/account-update-email"
import { TypeOrmAdapter } from "../../../../../infra/db/typeorm-adapter"
import { BcryptAdapter } from "../../../../../infra/bcrypt/bcrypt-adapter"

export const makeUpdateAccountEmailController = ():UpdateAccountEmailController => {
    const makeValidators = makeUpdateAccountEmailValidators()
    const dbAdapter = new TypeOrmAdapter()
    const saltRounds = 10
    const uncryptAdapter = new BcryptAdapter(saltRounds)
    const updateEmailAccountEmail = new UpdateAccountEmail(dbAdapter, dbAdapter, dbAdapter, uncryptAdapter)
    
    return new UpdateAccountEmailController(makeValidators, updateEmailAccountEmail)
}