import { Router } from 'express'

import { celebrate, Segments } from 'celebrate'

import Joi from '@hapi/joi'
import DeliveryManController from '@modules/deliveryman/infra/http/controllers/DeliveryManController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const deliveryManRouter = Router()
const deliveryManController = new DeliveryManController()

deliveryManRouter.use(ensureAuthenticated)

deliveryManRouter.get('/', deliveryManController.index)

deliveryManRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      avatarId: Joi.string().required(),
    },
  }),
  deliveryManController.create,
)

deliveryManRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      avatarId: Joi.string().required(),
    },
  }),
  deliveryManController.update,
)

deliveryManRouter.delete('/:id', deliveryManController.remove)

export default deliveryManRouter
