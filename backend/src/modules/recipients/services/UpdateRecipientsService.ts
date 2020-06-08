import { inject, injectable } from 'tsyringe'

import Recipient from '@modules/recipients/infra/typeorm/entities/Recipient'
import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id: number;
  name: string;
  street: string;
  number: string;
  complement: string;
  state: string;
  city: string;
  cep: string;
  district: string;
}

@injectable()
export default class UpdateRecipientsService {
  constructor (
    @inject('RecipientsRepository')
    private recipientsRepository: IRecipientsRepository,
  ) {}

  async execute ({
    id,
    street,
    number,
    complement,
    state,
    city,
    cep,
    name,
    district,
  }: IRequest): Promise<Recipient> {
    const recipient = await this.recipientsRepository.findById(id)

    if (!recipient) throw new AppError('Recipient not found')

    Object.assign(recipient, { street, number, complement, state, city, cep, district, name })

    return this.recipientsRepository.save(recipient)
  }
}
