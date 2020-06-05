import { Response, Request } from 'express'

import { container } from 'tsyringe'

import CancelDeliveryService from '@modules/deliveryman/services/CancelDeliveryService'
import FinishDeliveryService from '@modules/deliveryman/services/FinishDeliveryService'
import ListDeliveryManOrdersService from '@modules/deliveryman/services/ListDeliveryManOrdersService'
import StartDeliveryService from '@modules/deliveryman/services/StartDeliveryService'

export default class DeliveryManOrderController {
  async index (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const listDeliveryManOrders = container.resolve(ListDeliveryManOrdersService)
    const orders = await listDeliveryManOrders.execute(Number(id))

    return response.json(orders)
  }

  async startDelivery (request: Request, response: Response): Promise<Response> {
    try {
      const { deliveryManId, orderId } = request.params
      const startDelivery = container.resolve(StartDeliveryService)

      const order = await startDelivery.execute(Number(orderId), Number(deliveryManId))

      return response.json(order)
    } catch (error) {
      return response.status(error.statusCode || 500).json(error)
    }
  }

  async finishDelivery (request: Request, response: Response): Promise<Response> {
    try {
      const { orderId, deliveryManId } = request.params
      const { signature } = request.body
      const finishDelivery = container.resolve(FinishDeliveryService)

      const order = await finishDelivery.execute(Number(orderId), Number(deliveryManId), String(signature))

      return response.json(order)
    } catch (error) {
      return response.status(error.statusCode || 500).json(error)
    }
  }

  async cancel (request: Request, response: Response): Promise<Response> {
    try {
      const { orderId } = request.params

      const cancelDelivery = container.resolve(CancelDeliveryService)

      const order = await cancelDelivery.execute(Number(orderId))

      return response.json(order)
    } catch (error) {
      return response.status(error.statusCode || 500).json(error)
    }
  }
}
