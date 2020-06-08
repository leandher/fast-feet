import { injectable, inject } from 'tsyringe'

import Recipient from '@modules/recipients/infra/typeorm/entities/Recipient'
import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository'

@injectable()
export default class ListRecipientsService {
  constructor (
    @inject('RecipientsRepository')
    private recipientsRepository: IRecipientsRepository,
  ) {}

  async execute (name: string): Promise<Recipient[]> {
    const recipients = await this.recipientsRepository.findAll(name)

    return recipients
  }
}
