import { Repository, getRepository, Between } from 'typeorm'

import IDeliveryManOrderRepository from '@modules/deliveryman/repositories/IDeliveryManOrderRepository'
import Order from '@modules/order/infra/typeorm/entities/Order'

export default class DeliveryManOrderRepository
implements IDeliveryManOrderRepository {
  private ormRepository: Repository<Order>;

  constructor () {
    this.ormRepository = getRepository(Order)
  }

  findDeliveryManOrders (
    deliveryManId: number,
    startDate?: { from: Date; to: Date },
  ): Promise<Order[]> {
    return this.ormRepository.find({
      where: {
        deliveryMan: { id: deliveryManId },
        ...(startDate
          ? { startDate: Between(startDate.from, startDate.to) }
          : {}),
      },
      relations: ['recipient', 'deliveryMan'],
    })
  }
}
