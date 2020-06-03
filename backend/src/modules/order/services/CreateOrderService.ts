import { injectable, inject } from 'tsyringe'

import ICreateOrderDTO from '@modules/order/dtos/ICreateOrderDTO'
import Order from '@modules/order/infra/typeorm/entities/Order'
import OrderRepository from '@modules/order/infra/typeorm/repositories/OrderRepository'

@injectable()
export default class CreateOrderService {
  constructor (
    @inject('OrderRepository')
    private orderRepository: OrderRepository,
  ) {}

  async execute (order: ICreateOrderDTO): Promise<Order> {
    return this.orderRepository.create(order)
  }
}
