import { getRepository, Repository } from 'typeorm'

import ICreateRecipientDTO from '@modules/recipients/dtos/ICreateRecipientDTO'
import Recipient from '@modules/recipients/infra/typeorm/entities/Recipient'
import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository'

export default class RecipientsRepository implements IRecipientsRepository {
  private ormRepository: Repository<Recipient>;

  constructor () {
    this.ormRepository = getRepository(Recipient)
  }

  async save (recipient: Recipient): Promise<Recipient> {
    return this.ormRepository.save(recipient)
  }

  async findAll (): Promise<Recipient[]> {
    const recipients = await this.ormRepository.find()

    return recipients
  }

  async findById (id: number): Promise<Recipient> {
    const recipient = await this.ormRepository.findOne(id)

    return recipient
  }

  async create ({ cep, city, complement, state, street, number, district }: ICreateRecipientDTO): Promise<Recipient> {
    const recipient = this.ormRepository.create({ cep, city, complement, state, street, number, district })

    const createdRecipient = await this.ormRepository.save(recipient)

    return createdRecipient
  }
}
