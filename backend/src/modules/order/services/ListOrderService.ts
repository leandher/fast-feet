import { injectable, inject } from 'tsyringe'

import Order from '@modules/order/infra/typeorm/entities/Order'
import IOrderRepository from '@modules/order/repositories/IOrderRepository'

@injectable()
export default class ListOrderService {
  constructor (
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  async execute (): Promise<Order[]> {
    const deliveryMen = await this.orderRepository.findAll()
    return deliveryMen
  }
}
