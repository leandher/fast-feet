import { Repository, getRepository } from 'typeorm'

import ICreateOrderDTO from '@modules/order/dtos/ICreateOrderDTO'
import Order from '@modules/order/infra/typeorm/entities/Order'
import IOrderRepository from '@modules/order/repositories/IOrderRepository'

export default class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor () {
    this.ormRepository = getRepository(Order)
  }

  findAll (): Promise<Order[]> {
    return this.ormRepository.find({
      relations: ['recipient', 'deliveryMan'],
    })
  }

  findById (id: number): Promise<Order> {
    return this.ormRepository.findOne(id)
  }

  create (order: ICreateOrderDTO): Promise<Order> {
    const newOrder = this.ormRepository.create(order)

    return this.ormRepository.save(newOrder)
  }

  save (order: Order): Promise<Order> {
    return this.ormRepository.save(order)
  }

  async remove (id: number): Promise<number> {
    const deleteResult = await this.ormRepository.delete(id)

    return deleteResult.affected
  }
}
