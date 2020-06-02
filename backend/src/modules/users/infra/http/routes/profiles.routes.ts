import { Router } from 'express'

import ProfileController from '@modules/users/infra/http/controllers/ProfileController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', profileController.get)

export default profileRouter
