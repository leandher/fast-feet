import Order from '@modules/order/infra/typeorm/entities/Order'

export default interface IDeliveryManOrderRepository {
  findDeliveryManOrders(deliveryManId: number, startDate?: { from: Date; to: Date }): Promise<Order[]>;
}
