import { injectable, inject } from 'tsyringe'

import DeliveryMan from '@modules/deliveryman/infra/typeorm/entities/DeliveryMan'
import DeliveryManRepository from '@modules/deliveryman/infra/typeorm/repositories/DeliveryManRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id: number;
  name: string;
  email: string;
  avatarId: string;
}

@injectable()
export default class UpdateDeliveryManService {
  constructor (
    @inject('DeliveryManRepository')
    private deliveryManRepository: DeliveryManRepository,
  ) {}

  async execute ({ avatarId, email, name, id }: IRequest): Promise<DeliveryMan> {
    const deliveryMan = await this.deliveryManRepository.findById(id)

    if (!deliveryMan) throw new AppError('Delivery man not found')

    if (deliveryMan.email !== email) {
      const checkDeliveryManExists = await this.deliveryManRepository.findByEmail(email)

      if (checkDeliveryManExists) {
        throw new AppError('Email address already used.')
      }
    }

    Object.assign(deliveryMan, { avatarId, email, name })

    return this.deliveryManRepository.save(deliveryMan)
  }
}
