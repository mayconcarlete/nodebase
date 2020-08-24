import { AccountCreateController } from "../../../../../presentation/controllers/account/account-create";
import { makeAccountValidation } from "./account-create-validations";

export const makeAccountCreate = ():AccountCreateController => {
    return new AccountCreateController(makeAccountValidation())
}