import { Repository, getRepository } from 'typeorm'

import ICreateDeliveryManDTO from '@modules/deliveryman/dtos/ICreateDeliveryManDTO'
import DeliveryMan from '@modules/deliveryman/infra/typeorm/entities/DeliveryMan'
import IDeliveryManRepository from '@modules/deliveryman/repositories/IDeliveryManRepository'

export default class DeliveryManRepository implements IDeliveryManRepository {
  private ormRepository: Repository<DeliveryMan>;

  constructor () {
    this.ormRepository = getRepository(DeliveryMan)
  }

  findAll (): Promise<DeliveryMan[]> {
    return this.ormRepository.find()
  }

  findByEmail (email: string): Promise<DeliveryMan> {
    return this.ormRepository.findOne({ where: { email } })
  }

  findById (id: number): Promise<DeliveryMan> {
    return this.ormRepository.findOne(id)
  }

  create (deliveryMan: ICreateDeliveryManDTO): Promise<DeliveryMan> {
    const newDeliveryMan = this.ormRepository.create({ ...deliveryMan })

    return this.ormRepository.save(newDeliveryMan)
  }

  save (deliveryMan: DeliveryMan): Promise<DeliveryMan> {
    return this.ormRepository.save(deliveryMan)
  }

  async remove (id: number): Promise<number> {
    const deleteResult = await this.ormRepository.delete(id)

    return deleteResult.affected
  }
}
