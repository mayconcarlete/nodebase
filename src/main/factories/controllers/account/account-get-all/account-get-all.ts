import { TypeOrmAdapter } from "../../../../../infra/db/typeorm-adapter";
import { GetAllAccountsController } from "../../../../../presentation/controllers/account/account-get-all";
import { GetAllAccounts } from "../../../../../data/usecases/account/account-get-all";


export const makeGetAllAccounts = ():GetAllAccountsController => {
    const loadAccountsDb = new TypeOrmAdapter()
    const getAllAccounts = new GetAllAccounts(loadAccountsDb)
    return new GetAllAccountsController(getAllAccounts)
}