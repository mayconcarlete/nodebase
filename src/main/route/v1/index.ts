import {Router} from 'express'
import accountRoute from './account'
import authenticateRoute from './authenticate'

const router = Router()

router.use('/accounts', accountRoute )
router.use('/authenticate', authenticateRoute)

export default router