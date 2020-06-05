import { Request, Response } from 'express'

import { container } from 'tsyringe'

import CreateDeliveryProblemService from '@modules/deliveryproblems/services/CreateDeliveryProblemService'
import ListDeliveryProblemsByOrderService from '@modules/deliveryproblems/services/ListDeliveryProblemsByOrderService'
import ListOrderWithProblemsService from '@modules/deliveryproblems/services/ListOrderWithProblemsService'

export default class DeliveryProblemsController {
  async find (request: Request, response: Response): Promise<Response> {
    const { orderId } = request.params

    const listProblems = container.resolve(ListDeliveryProblemsByOrderService)

    const problems = await listProblems.execute(Number(orderId))

    return response.json(problems)
  }

  async findOrders (request: Request, response: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrderWithProblemsService)

    const orders = await listOrders.execute()

    return response.json(orders)
  }

  async create (request: Request, response: Response): Promise<Response> {
    try {
      const { description } = request.body
      const { orderId } = request.params

      const createProblem = container.resolve(CreateDeliveryProblemService)

      const problem = await createProblem.execute({
        description,
        order: { id: Number(orderId) },
      })

      return response.json(problem)
    } catch (error) {
      return response.status(error.errorCode || 500).json(error)
    }
  }
}
