import { AccountAuthenticate } from "../../../../../data/usecases/account/account-authenticate";
import { makeAuthenticateValidators } from "./account-authenticate-validators";
import { AccountAuthenticateController } from "../../../../../presentation/controllers/account/account-authenticate";
import { TypeOrmAdapter } from "../../../../../infra/db/typeorm-adapter";
import { JwtAdapter } from "../../../../../infra/jsonwebtoken/jwt";
import { BcryptAdapter } from "../../../../../infra/bcrypt/bcrypt-adapter";

export const makeAccountAuthenticate = ():AccountAuthenticateController => {
    const loadAccountByEmail = new TypeOrmAdapter()
    const authenticator = new JwtAdapter()
    const saltRounds = 10
    const uncrypt = new BcryptAdapter(saltRounds)
    const authenticate = new AccountAuthenticate(loadAccountByEmail, authenticator, uncrypt)
    return new AccountAuthenticateController(makeAuthenticateValidators(), authenticate)
}