import { Router } from 'express'

import deliveryManRouter from '@modules/deliveryman/infra/http/routes/deliveryman.routes'
import recipientsRouter from '@modules/recipients/infra/http/routes/recipients.routes'
import profilesRouter from '@modules/users/infra/http/routes/profiles.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import usersRouter from '@modules/users/infra/http/routes/users.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/profile', profilesRouter)
routes.use('/recipients', recipientsRouter)
routes.use('/deliveryman', deliveryManRouter)

export default routes
