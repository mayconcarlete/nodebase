import { AccountCreateController } from "../../../../../presentation/controllers/account/account-create";
import { makeAccountValidation } from "./account-create-validations";

const makeAccountCreator = ():AccountCreateController => {
    return new AccountCreateController(makeAccountValidation())
}