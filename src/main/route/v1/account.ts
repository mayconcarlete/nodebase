import { Express, Router } from 'express'
import { adaptRoute } from '../../adapter/route-adapter'
import { makeAccountCreate } from '../../factories/controllers/account/account-create/account-create'
import { makeAccountAuthenticate } from '../../factories/controllers/account/authenticate/account-authenticate'
import { makeGetAllAccounts } from '../../factories/controllers/account/account-get-all/account-get-all'
const router = Router()

router.get('/',adaptRoute(makeGetAllAccounts()))
router.post('/', adaptRoute(makeAccountCreate()))


export default router