import { Request, Response } from 'express'

import { container } from 'tsyringe'

import CreateOrderService from '@modules/order/services/CreateOrderService'
import ListOrderService from '@modules/order/services/ListOrderService'
import RemoveOrderService from '@modules/order/services/RemoveOrderService'
import UpdateOrderService from '@modules/order/services/UpdateOrderService'
import Queues from '@shared/infra/lib/Queues'

export default class OrderController {
  async index (request: Request, response: Response): Promise<Response> {
    try {
      const listOrder = container.resolve(ListOrderService)
      const orders = await listOrder.execute()

      return response.json(orders)
    } catch (error) {
      return response.status(error.statusCode || 500).json(error)
    }
  }

  async create (request: Request, response: Response): Promise<Response> {
    try {
      const { deliveryMan, recipient, product } = request.body

      const createOrder = container.resolve(CreateOrderService)
      const order = await createOrder.execute({
        deliveryMan,
        recipient,
        product,
      })

      Queues.add('NewOrderMail', { order })

      return response.json(order)
    } catch (error) {
      return response.status(error.statusCode || 500).json(error)
    }
  }

  async update (request: Request, response: Response): Promise<Response> {
    try {
      const {
        deliveryMan, recipient, product,
      } = request.body
      const { id } = request.params

      const updateOrder = container.resolve(UpdateOrderService)
      const order = await updateOrder.execute({
        deliveryMan,
        recipient,
        product,
        id: Number(id),
      })

      return response.json(order)
    } catch (error) {
      return response.status(error.statusCode || 500).json(error)
    }
  }

  async remove (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const removeOrder = container.resolve(RemoveOrderService)

      const removed = await removeOrder.execute(Number(id))

      return response.json({ removed })
    } catch (error) {
      return response.status(error.statusCode || 500).json(error)
    }
  }
}
