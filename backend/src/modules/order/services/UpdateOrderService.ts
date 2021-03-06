import { injectable, inject } from 'tsyringe'

import ICreateOrderDTO from '@modules/order/dtos/ICreateOrderDTO'
import Order from '@modules/order/infra/typeorm/entities/Order'
import OrderRepository from '@modules/order/infra/typeorm/repositories/OrderRepository'
import AppError from '@shared/errors/AppError'

interface IRequest extends ICreateOrderDTO {
  id: number;
}

@injectable()
export default class UpdateOrderService {
  constructor (
    @inject('OrderRepository')
    private orderRepository: OrderRepository,
  ) {}

  async execute ({ id, deliveryMan, recipient, product }: IRequest): Promise<Order> {
    const order = await this.orderRepository.findById(id)

    if (!order) throw new AppError('Order not found')
    if (order.startDate || order.endDate) throw new AppError('This order can not be edited')

    Object.assign(order, { deliveryMan, recipient, product })

    return this.orderRepository.save(order)
  }
}
