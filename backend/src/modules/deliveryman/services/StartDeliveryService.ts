import { injectable, inject } from 'tsyringe'

import IDeliveryManOrderRepository from '@modules/deliveryman/repositories/IDeliveryManOrderRepository'
import Order from '@modules/order/infra/typeorm/entities/Order'
import OrderRepository from '@modules/order/infra/typeorm/repositories/OrderRepository'
import AppError from '@shared/errors/AppError'

@injectable()
export default class StartDeliveryService {
  constructor (
    @inject('OrderRepository')
    private orderRepository: OrderRepository,
    @inject('DeliveryManOrderRepository')
    private deliveryManOrderRepository: IDeliveryManOrderRepository,
  ) {}

  async execute (orderId: number, deliveryManId:number): Promise<Order> {
    const from = new Date()
    from.setHours(0, 0, 0)
    const to = new Date()

    to.setHours(23, 59, 59)

    const startDate = {
      from,
      to,
    }
    const deliveriesToday = await this.deliveryManOrderRepository.findDeliveryManOrders(deliveryManId, startDate)

    if (deliveriesToday.length >= 5) throw new AppError('Reached daily limit of deliveries')

    const order = await this.orderRepository.findById(orderId)

    if (!order) throw new AppError('Order not found')
    if (order.startDate) throw new AppError('Order has already started')

    Object.assign(order, {
      startDate: new Date(),
    })

    return this.orderRepository.save(order)
  }
}
