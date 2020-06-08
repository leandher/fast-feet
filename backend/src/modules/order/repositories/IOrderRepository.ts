import ICreateOrderDTO from '@modules/order/dtos/ICreateOrderDTO'
import Order from '@modules/order/infra/typeorm/entities/Order'

export default interface IOrderRepository {
  findAll(name: string): Promise<Order[]>;
  findById(id: number): Promise<Order>;
  create(order: ICreateOrderDTO): Promise<Order>;
  save(order: Order): Promise<Order>;
  remove(id: number): Promise<number>;
}
