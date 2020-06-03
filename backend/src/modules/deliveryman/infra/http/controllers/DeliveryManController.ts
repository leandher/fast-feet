import { Request, Response } from 'express'

import { container } from 'tsyringe'

import CreateDeliveryManService from '@modules/deliveryman/services/CreateDeliveryManService'
import ListDeliveryManService from '@modules/deliveryman/services/ListDeliveryManService'
import RemoveDeliveryManService from '@modules/deliveryman/services/RemoveDeliveryManService'
import UpdateDeliveryManService from '@modules/deliveryman/services/UpdateDeliveryManService'

export default class DeliveryManController {
  async index (request: Request, response: Response): Promise<Response> {
    try {
      const listDeliveryMan = container.resolve(ListDeliveryManService)
      const deliveryMen = await listDeliveryMan.execute()

      return response.json(deliveryMen)
    } catch (error) {
      return response.status(error.statusCode || 500).json(error)
    }
  }

  async create (request: Request, response: Response): Promise<Response> {
    try {
      const { name, avatarId, email } = request.body

      const createDeliveryMan = container.resolve(CreateDeliveryManService)
      const deliveryMan = await createDeliveryMan.execute({ name, avatarId, email })

      return response.json(deliveryMan)
    } catch (error) {
      return response.status(error.statusCode || 500).json(error)
    }
  }

  async update (request: Request, response: Response): Promise<Response> {
    try {
      const { name, avatarId, email } = request.body
      const { id } = request.params

      const updateDeliveryMan = container.resolve(UpdateDeliveryManService)
      const deliveryMan = await updateDeliveryMan.execute({ name, avatarId, email, id: Number(id) })

      return response.json(deliveryMan)
    } catch (error) {
      return response.status(error.statusCode || 500).json(error)
    }
  }

  async remove (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const removeDeliveryMan = container.resolve(RemoveDeliveryManService)

      const removed = await removeDeliveryMan.execute(Number(id))

      return response.json({ removed })
    } catch (error) {
      return response.status(error.statusCode || 500).json(error)
    }
  }
}
