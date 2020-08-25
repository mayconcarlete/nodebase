import { Express, Router } from 'express'
import { adaptRoute } from '../../adapter/route-adapter'
import { makeAccountCreate } from '../../factories/controllers/account/account-create/account-create'
import { makeAccountAuthenticate } from '../../factories/controllers/account/authenticate/account-authenticate'
const router = Router()

router.post('/', adaptRoute(makeAccountCreate()))


export default router