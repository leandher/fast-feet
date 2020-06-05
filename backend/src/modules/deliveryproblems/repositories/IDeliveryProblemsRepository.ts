import ICreateDeliveryProblemDTO from '@modules/deliveryproblems/dtos/ICreateDeliveryProblemDTO'
import DeliveryProblem from '@modules/deliveryproblems/infra/typeorm/entities/DeliveryProblem'
import Order from '@modules/order/infra/typeorm/entities/Order'

export default interface IDeliveryProblemsRepository {
  findByOrder(orderId: number): Promise<DeliveryProblem[]>;
  findOrdersWithProblems(): Promise<Order[]>;
  create(deliveryProblem: ICreateDeliveryProblemDTO): Promise<DeliveryProblem>;
}
