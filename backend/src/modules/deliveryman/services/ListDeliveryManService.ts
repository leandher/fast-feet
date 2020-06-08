import { injectable, inject } from 'tsyringe'

import DeliveryMan from '@modules/deliveryman/infra/typeorm/entities/DeliveryMan'
import IDeliveryManRepository from '@modules/deliveryman/repositories/IDeliveryManRepository'

@injectable()
export default class ListDeliveryManService {
  constructor (
    @inject('DeliveryManRepository')
    private deliveryManRepository: IDeliveryManRepository,
  ) {}

  async execute (name: string): Promise<DeliveryMan[]> {
    const deliveryMen = await this.deliveryManRepository.findAll(name)
    return deliveryMen
  }
}
