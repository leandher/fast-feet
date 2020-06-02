import { injectable, inject } from 'tsyringe'

import ICreateRecipientDTO from '@modules/recipients/dtos/ICreateRecipientDTO'
import Recipient from '@modules/recipients/infra/typeorm/entities/Recipient'
import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository'

@injectable()
export default class CreateRecipientsService {
  constructor (
    @inject('RecipientsRepository')
    private recipientsRepository: IRecipientsRepository,
  ) {}

  async execute (recipient: ICreateRecipientDTO): Promise<Recipient> {
    const createdRecipient = await this.recipientsRepository.create(recipient)

    return createdRecipient
  }
}
