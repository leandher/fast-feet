import { injectable, inject } from 'tsyringe'

import IOrderRepository from '@modules/order/repositories/IOrderRepository'
import AppError from '@shared/errors/AppError'

@injectable()
export default class RemoveOrderService {
  constructor (
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) { }

  async execute (id: number): Promise<boolean> {
    const rows = await this.orderRepository.remove(id)

    if (rows < 1) throw new AppError('Delivery man not found')

    return true
  }
}
