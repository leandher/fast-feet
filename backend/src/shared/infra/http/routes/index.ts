import { Router } from 'express'

import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import profilesRouter from '@modules/users/infra/http/routes/profiles.routes'
import recipientsRouter from '@modules/recipients/infra/http/routes/recipients.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/profile', profilesRouter)
routes.use('/recipients', recipientsRouter)

export default routes
