import { injectable, inject } from 'tsyringe'

import ICreateOrderDTO from '@modules/order/dtos/ICreateOrderDTO'
import Order from '@modules/order/infra/typeorm/entities/Order'
import IOrderRepository from '@modules/order/repositories/IOrderRepository'

@injectable()
export default class CreateOrderService {
  constructor (
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  async execute (order: ICreateOrderDTO): Promise<Order> {
    const createdOrder = await this.orderRepository.create(order)

    return this.orderRepository.findById(createdOrder.id)
  }
}
