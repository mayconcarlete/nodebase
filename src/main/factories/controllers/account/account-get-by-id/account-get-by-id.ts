import { GetAllAccountsController } from "../../../../../presentation/controllers/account/account-get-all";
import { GetAccountByIdController } from "../../../../../presentation/controllers/account/account-get-by-id";
import { makeGetAccountByIdValidators } from "./account-get-by-id-validators";
import { GetAccountById } from "../../../../../data/usecases/account/account-load-by-id";
import { TypeOrmAdapter } from "../../../../../infra/db/typeorm-adapter";

export const makeGetAccountById = ():GetAccountByIdController =>{
    const getAccountByIdAdapter = new TypeOrmAdapter()
    const getAccountById = new GetAccountById(getAccountByIdAdapter)
    return new GetAccountByIdController(makeGetAccountByIdValidators(), getAccountById)
}