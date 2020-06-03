import { injectable, inject } from 'tsyringe'

import ICreateDeliveryManDTO from '@modules/deliveryman/dtos/ICreateDeliveryManDTO'
import DeliveryMan from '@modules/deliveryman/infra/typeorm/entities/DeliveryMan'
import DeliveryManRepository from '@modules/deliveryman/infra/typeorm/repositories/DeliveryManRepository'
import AppError from '@shared/errors/AppError'

@injectable()
export default class CreateDeliveryManService {
  constructor (
    @inject('DeliveryManRepository')
    private deliveryManRepository: DeliveryManRepository,
  ) {}

  async execute (deliveryMan: ICreateDeliveryManDTO): Promise<DeliveryMan> {
    const checkDeliveryManExists = await this.deliveryManRepository.findByEmail(
      deliveryMan.email,
    )

    if (checkDeliveryManExists) { throw new AppError('Email address already used.') }

    return this.deliveryManRepository.create(deliveryMan)
  }
}
