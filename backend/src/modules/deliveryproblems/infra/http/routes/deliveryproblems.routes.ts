import { Router } from 'express'

import { celebrate, Segments } from 'celebrate'

import Joi from '@hapi/joi'
import DeliveryProblemsController from '@modules/deliveryproblems/infra/http/controllers/DeliveryProblemsController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const deliveryProblemsRouter = Router()
const deliveryProblemsController = new DeliveryProblemsController()

deliveryProblemsRouter.get(
  '/orders-problems',
  ensureAuthenticated,
  deliveryProblemsController.findOrders,
)
deliveryProblemsRouter.get(
  '/:orderId/problems',
  deliveryProblemsController.find,
)
deliveryProblemsRouter.post(
  '/:orderId/problems',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
    },
  }),
  deliveryProblemsController.create,
)

export default deliveryProblemsRouter
