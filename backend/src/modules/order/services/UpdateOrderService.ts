import { injectable, inject } from 'tsyringe'

import Order from '@modules/order/infra/typeorm/entities/Order'
import OrderRepository from '@modules/order/infra/typeorm/repositories/OrderRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id: number;
  product: string;
  signature?: string;
  canceledAt?: Date;
  startDate?: Date;
  endDate?: Date;
}

@injectable()
export default class UpdateOrderService {
  constructor (
    @inject('OrderRepository')
    private orderRepository: OrderRepository,
  ) {}

  async execute ({ id, product, startDate, endDate, canceledAt, signature }: IRequest): Promise<Order> {
    const order = await this.orderRepository.findById(id)

    if (!order) throw new AppError('Delivery man not found')

    Object.assign(order, { product, startDate, endDate, canceledAt, signature })

    return this.orderRepository.save(order)
  }
}
