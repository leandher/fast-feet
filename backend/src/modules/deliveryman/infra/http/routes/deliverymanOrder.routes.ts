import { Router } from 'express'

import { celebrate, Segments } from 'celebrate'

import Joi from '@hapi/joi'

import DeliveryManOrderController from '../controllers/DeliveryManOrderController'

const deliveryManOrdersRouter = Router()
const deliveryManOrderController = new DeliveryManOrderController()

deliveryManOrdersRouter.get(
  '/:id/deliveries',
  deliveryManOrderController.index,
)

deliveryManOrdersRouter.delete(
  '/:orderId/cancel-delivery',
  deliveryManOrderController.cancel,
)

deliveryManOrdersRouter.put(
  '/:deliveryManId/start-delivery/:orderId',
  deliveryManOrderController.startDelivery,
)

deliveryManOrdersRouter.patch(
  '/:deliveryManId/finish-delivery/:orderId',
  celebrate({
    [Segments.BODY]: {
      signature: Joi.string().required(),
    },
  }),
  deliveryManOrderController.finishDelivery,
)

export default deliveryManOrdersRouter
