import { container } from 'tsyringe'

import '@modules/users/providers'

import DeliveryManRepository from '@modules/deliveryman/infra/typeorm/repositories/DeliveryManRepository'
import IDeliveryManRepository from '@modules/deliveryman/repositories/IDeliveryManRepository'
import OrderRepository from '@modules/order/infra/typeorm/repositories/OrderRepository'
import IOrderRepository from '@modules/order/repositories/IOrderRepository'
import RecipientsRepository from '@modules/recipients/infra/typeorm/repositories/RecipientsRepository'
import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IRecipientsRepository>(
  'RecipientsRepository',
  RecipientsRepository,
)

container.registerSingleton<IDeliveryManRepository>(
  'DeliveryManRepository',
  DeliveryManRepository,
)

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
)
