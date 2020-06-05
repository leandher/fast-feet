import { injectable, inject } from 'tsyringe'

import Order from '@modules/order/infra/typeorm/entities/Order'
import OrderRepository from '@modules/order/infra/typeorm/repositories/OrderRepository'
import AppError from '@shared/errors/AppError'

@injectable()
export default class CancelDeliveryService {
  constructor (
    @inject('OrderRepository')
    private orderRepository: OrderRepository,
  ) {}

  async execute (id: number): Promise<Order> {
    const order = await this.orderRepository.findById(id)

    if (!order) throw new AppError('Order not found')
    if (order.startDate || order.endDate) throw new AppError('This order can not be edited')

    Object.assign(order, { canceledAt: new Date() })

    return this.orderRepository.save(order)
  }
}
