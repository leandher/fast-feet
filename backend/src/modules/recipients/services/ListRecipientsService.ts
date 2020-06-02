import { injectable, inject } from 'tsyringe'

import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository'
import Recipient from '@modules/recipients/infra/typeorm/entities/Recipient'

@injectable()
export default class ListRecipientsService {
  constructor (
    @inject('RecipientsRepository')
    private recipientsRepository: IRecipientsRepository
  ) {}

  async execute (): Promise<Recipient[]> {
    const recipients = await this.recipientsRepository.findAll()

    return recipients
  }
}
