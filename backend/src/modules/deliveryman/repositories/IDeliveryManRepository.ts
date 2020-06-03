import ICreateDeliveryManDTO from '@modules/deliveryman/dtos/ICreateDeliveryManDTO'
import DeliveryMan from '@modules/deliveryman/infra/typeorm/entities/DeliveryMan'

export default interface IDeliveryManRepository {
  findAll(): Promise<DeliveryMan[]>;
  findById(id: number): Promise<DeliveryMan>;
  findByEmail(email: string): Promise<DeliveryMan>;
  create(deliveryMan: ICreateDeliveryManDTO): Promise<DeliveryMan>;
  save(deliveryMan: DeliveryMan): Promise<DeliveryMan>;
  remove(id: number): Promise<number>;
}
