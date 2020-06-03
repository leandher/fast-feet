import { injectable, inject } from 'tsyringe'

import IDeliveryManOrderRepository from '@modules/deliveryman/repositories/IDeliveryManOrderRepository'
import Order from '@modules/order/infra/typeorm/entities/Order'

@injectable()
export default class ListDeliveryManOrdersService {
  constructor (
    @inject('DeliveryManOrderRepository')
    private deliveryManOrderRepository: IDeliveryManOrderRepository,
  ) {}

  async execute (id: number): Promise<Order[]> {
    const orders = await this.deliveryManOrderRepository.findDeliveryManOrders(id)
    return orders
  }
}
