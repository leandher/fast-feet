import { Repository, getRepository, getConnection } from 'typeorm'

import ICreateDeliveryProblemDTO from '@modules/deliveryproblems/dtos/ICreateDeliveryProblemDTO'
import DeliveryProblem from '@modules/deliveryproblems/infra/typeorm/entities/DeliveryProblem'
import IDeliveryProblemsRepository from '@modules/deliveryproblems/repositories/IDeliveryProblemsRepository'
import Order from '@modules/order/infra/typeorm/entities/Order'

export default class DeliveryProblemsRepository
implements IDeliveryProblemsRepository {
  private ormRepository: Repository<DeliveryProblem>;

  constructor () {
    this.ormRepository = getRepository(DeliveryProblem)
  }

  findOrdersWithProblems (): Promise<Order[]> {
    return getConnection().query(
      'SELECT DISTINCT "order".* from "order" inner join delivery_problems on delivery_problems.order_id = "order".id',
    )
  }

  findByOrder (orderId: number): Promise<DeliveryProblem[]> {
    return this.ormRepository.find({
      where: { order: { id: orderId } },
      relations: ['order'],
    })
  }

  create (
    deliveryProblemDTO: ICreateDeliveryProblemDTO,
  ): Promise<DeliveryProblem> {
    const deliveryProblem = this.ormRepository.create(deliveryProblemDTO)

    return this.ormRepository.save(deliveryProblem)
  }
}
