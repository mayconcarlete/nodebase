import { Router } from 'express'
import { adaptRoute } from '../../adapter/route-adapter'
import { makeAccountCreate } from '../../factories/controllers/account/account-create/account-create'
import { makeGetAllAccounts } from '../../factories/controllers/account/account-get-all/account-get-all'
import { makeGetAccountById } from '../../factories/controllers/account/account-get-by-id/account-get-by-id'
import { makeUpdateAccountEmailController } from '../../factories/controllers/account/account-update-email/account-update-email'
import { makeAccountUpdatePassword } from '../../factories/controllers/account/account-update-password/account-update-password'
import { makeUpdateAccountName } from '../../factories/controllers/account/account-update-name/account-update-name'
import { makeAccountDelete } from '../../factories/controllers/account/account-delete/account-delete'

const router = Router()

router.get('/',adaptRoute(makeGetAllAccounts()))
router.get('/:id', adaptRoute(makeGetAccountById()))
router.post('/', adaptRoute(makeAccountCreate()))
router.put('/email/:id', adaptRoute(makeUpdateAccountEmailController()))
router.put('/password/:id', adaptRoute(makeAccountUpdatePassword()))
router.put('/name/:id', adaptRoute(makeUpdateAccountName()))
router.delete('/delete/:id', adaptRoute(makeAccountDelete()))

export default router