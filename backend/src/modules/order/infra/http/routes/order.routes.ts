import { Router } from 'express'

import { celebrate, Segments } from 'celebrate'

import Joi from '@hapi/joi'
import OrderController from '@modules/order/infra/http/controllers/OrderController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const orderRouter = Router()
const orderController = new OrderController()

orderRouter.use(ensureAuthenticated)

orderRouter.get('/', orderController.index)

orderRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      product: Joi.string().required(),
      recipient: Joi.object({
        id: Joi.number().integer().required(),
      }).required(),
      deliveryMan: Joi.object({
        id: Joi.number().integer().required(),
      }).required(),
    },
  }),
  orderController.create,
)

orderRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      product: Joi.string(),
      recipient: Joi.object({
        id: Joi.number().integer(),
      }),
      deliveryMan: Joi.object({
        id: Joi.number().integer(),
      }),
    },
  }),
  orderController.update,
)

orderRouter.delete('/:id', orderController.remove)

export default orderRouter
