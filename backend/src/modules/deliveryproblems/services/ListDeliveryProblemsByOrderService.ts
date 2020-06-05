import { injectable, inject } from 'tsyringe'

import DeliveryProblem from '@modules/deliveryproblems/infra/typeorm/entities/DeliveryProblem'
import IDeliveryProblemsRepository from '@modules/deliveryproblems/repositories/IDeliveryProblemsRepository'

@injectable()
export default class ListDeliveryProblemsByOrderService {
  constructor (
    @inject('DeliveryProblemsRepository')
    private deliveryProblemsRepository: IDeliveryProblemsRepository,
  ) {}

  async execute (orderId: number): Promise<DeliveryProblem[]> {
    return this.deliveryProblemsRepository.findByOrder(orderId)
  }
}
