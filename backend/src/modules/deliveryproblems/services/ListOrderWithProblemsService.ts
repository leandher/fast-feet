import { injectable, inject } from 'tsyringe'

import IDeliveryProblemsRepository from '@modules/deliveryproblems/repositories/IDeliveryProblemsRepository'
import Order from '@modules/order/infra/typeorm/entities/Order'

@injectable()
export default class ListOrderWithProblemsService {
  constructor (
    @inject('DeliveryProblemsRepository')
    private deliveryProblemsRepository: IDeliveryProblemsRepository,
  ) {}

  async execute (): Promise<Order[]> {
    return this.deliveryProblemsRepository.findOrdersWithProblems()
  }
}
