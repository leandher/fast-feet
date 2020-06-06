import { Router } from 'express'

import multer from 'multer'

import multerConfig from '@config/multer'
import DeliveryManOrderController from '@modules/deliveryman/infra/http/controllers/DeliveryManOrderController'

const deliveryManOrdersRouter = Router()
const upload = multer(multerConfig)

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
  upload.single('signature'),
  deliveryManOrderController.finishDelivery,
)

export default deliveryManOrdersRouter
