import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateRecipientsService from '@modules/recipients/services/CreateRecipientsService'
import ListRecipientsService from '@modules/recipients/services/ListRecipientsService'

export default class RecipientsController {
  async index (request: Request, response: Response): Promise<Response> {
    try {
      const listRecipients = container.resolve(ListRecipientsService)

      const recipients = await listRecipients.execute()

      return response.json(recipients)
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  async create (request: Request, response: Response): Promise<Response> {
    try {
      const { street, number, complement, state, city, cep } = request.body

      const createRecipient = container.resolve(CreateRecipientsService)

      const recipient = await createRecipient.execute({
        street,
        number,
        complement,
        state,
        city,
        cep
      })
      return response.json(recipient)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
}
