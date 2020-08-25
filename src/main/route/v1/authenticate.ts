import {Router} from 'express'
import { adaptRoute } from '../../adapter/route-adapter'
import { makeAccountAuthenticate } from '../../factories/controllers/account/authenticate/account-authenticate'
const router = Router()

router.post('/', adaptRoute(makeAccountAuthenticate()))

export default router