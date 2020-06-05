import { injectable, inject } from 'tsyringe'

import ICreateDeliveryProblemDTO from '@modules/deliveryproblems/dtos/ICreateDeliveryProblemDTO'
import DeliveryProblem from '@modules/deliveryproblems/infra/typeorm/entities/DeliveryProblem'
import IDeliveryProblemsRepository from '@modules/deliveryproblems/repositories/IDeliveryProblemsRepository'
import IOrderRepository from '@modules/order/repositories/IOrderRepository'
import AppError from '@shared/errors/AppError'

@injectable()
export default class CreateDeliveryProblemService {
  constructor (
    @inject('DeliveryProblemsRepository')
    private deliveryProblemsRepository: IDeliveryProblemsRepository,
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  async execute (deliveryProblem: ICreateDeliveryProblemDTO): Promise<DeliveryProblem> {
    const order = await this.orderRepository.findById(deliveryProblem.order.id)

    if (!order) throw new AppError('Order not found')
    if (order.endDate) throw new AppError('Order has already finished')

    return this.deliveryProblemsRepository.create(deliveryProblem)
  }
}
