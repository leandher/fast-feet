import { Router } from 'express'

import deliveryManRouter from '@modules/deliveryman/infra/http/routes/deliveryman.routes'
import orderRouter from '@modules/order/infra/http/routes/order.routes'
import recipientsRouter from '@modules/recipients/infra/http/routes/recipients.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import usersRouter from '@modules/users/infra/http/routes/users.routes'

const routes = Router()

routes.use('/deliveryman', deliveryManRouter)
routes.use('/order', orderRouter)
routes.use('/recipients', recipientsRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)

export default routes
