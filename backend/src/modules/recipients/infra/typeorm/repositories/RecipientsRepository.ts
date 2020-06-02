import { getRepository, Repository } from 'typeorm'
import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository'
import Recipient from '@modules/recipients/infra/typeorm/entities/Recipient'
import ICreateRecipientDTO from '@modules/recipients/dtos/ICreateRecipientDTO'

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

  async create ({ cep, city, complement, state, street, number }: ICreateRecipientDTO): Promise<Recipient> {
    const recipient = this.ormRepository.create({ cep, city, complement, state, street, number })

    const createdRecipient = await this.ormRepository.save(recipient)

    return createdRecipient
  }
}
