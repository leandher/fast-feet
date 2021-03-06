import { Request, Response } from 'express'

import { container } from 'tsyringe'

import CreateRecipientsService from '@modules/recipients/services/CreateRecipientsService'
import ListRecipientsService from '@modules/recipients/services/ListRecipientsService'
import UpdateRecipientsService from '@modules/recipients/services/UpdateRecipientsService'

export default class RecipientsController {
  async index (request: Request, response: Response): Promise<Response> {
    try {
      const { q } = request.query
      const listRecipients = container.resolve(ListRecipientsService)

      const recipients = await listRecipients.execute(String(q || ''))

      return response.json(recipients)
    } catch (error) {
      return response.status(error.statusCode || 500).json(error)
    }
  }

  async create (request: Request, response: Response): Promise<Response> {
    try {
      const { street, number, complement, state, city, cep, district, name } = request.body

      const createRecipient = container.resolve(CreateRecipientsService)

      const recipient = await createRecipient.execute({
        street,
        number,
        complement,
        state,
        city,
        cep,
        district,
        name,
      })
      return response.json(recipient)
    } catch (error) {
      return response.status(error.statusCode || 500).json(error)
    }
  }

  async update (request: Request, response: Response): Promise<Response> {
    try {
      const { street, number, complement, state, city, cep, district, name } = request.body
      const { id } = request.params

      const updateRecipient = container.resolve(UpdateRecipientsService)

      const recipient = await updateRecipient.execute({
        id: Number(id),
        street,
        number,
        complement,
        state,
        city,
        cep,
        name,
        district,
      })
      return response.json(recipient)
    } catch (error) {
      return response.status(error.statusCode || 500).json(error)
    }
  }
}
