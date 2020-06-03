import { injectable, inject } from 'tsyringe'

import DeliveryManRepository from '@modules/deliveryman/infra/typeorm/repositories/DeliveryManRepository'
import Order from '@modules/order/infra/typeorm/entities/Order'
import OrderRepository from '@modules/order/infra/typeorm/repositories/OrderRepository'
import AppError from '@shared/errors/AppError'

@injectable()
export default class FinishDeliveryService {
  constructor (
    @inject('OrderRepository')
    private orderRepository: OrderRepository,
    @inject('DeliveryManRepository')
    private deliveryManRepository: DeliveryManRepository,
  ) {}

  async execute (orderId: number, deliveryManId:number, signature: string): Promise<Order> {
    const deliveryMan = await this.deliveryManRepository.findById(deliveryManId)

    if (!deliveryMan) throw new AppError('Delivery man not found')

    const order = await this.orderRepository.findById(orderId)

    if (!order) throw new AppError('Order not found')
    if (!order.startDate) throw new AppError('Order has not started yet')
    if (order.endDate) throw new AppError('Order has already finished')

    Object.assign(order, {
      endDate: new Date(),
      signature,
    })

    return this.orderRepository.save(order)
  }
}
