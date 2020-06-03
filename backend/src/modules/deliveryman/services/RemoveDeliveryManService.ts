import { injectable, inject } from 'tsyringe'

import IDeliveryManRepository from '@modules/deliveryman/repositories/IDeliveryManRepository'
import AppError from '@shared/errors/AppError'

@injectable()
export default class RemoveDeliveryManService {
  constructor (
    @inject('DeliveryManRepository')
    private deliveryManRepository: IDeliveryManRepository,
  ) { }

  async execute (id: number): Promise<boolean> {
    const rows = await this.deliveryManRepository.remove(id)

    if (rows < 1) throw new AppError('Delivery man not found')

    return true
  }
}
