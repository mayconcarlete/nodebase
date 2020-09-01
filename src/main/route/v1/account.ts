import { Router } from 'express'
import { adaptRoute } from '../../adapter/route-adapter'
import { makeAccountCreate } from '../../factories/controllers/account/account-create/account-create'
import { makeGetAllAccounts } from '../../factories/controllers/account/account-get-all/account-get-all'
import { makeGetAccountById } from '../../factories/controllers/account/account-get-by-id/account-get-by-id'
import { makeUpdateAccountEmailController } from '../../factories/controllers/account/account-update-email/account-update-email'
const router = Router()

router.get('/',adaptRoute(makeGetAllAccounts()))
router.get('/:id', adaptRoute(makeGetAccountById()))
router.post('/', adaptRoute(makeAccountCreate()))
router.put('/:id', adaptRoute(makeUpdateAccountEmailController()))

export default router