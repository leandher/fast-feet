import { container } from 'tsyringe'

import '@modules/users/providers'

import DeliveryManOrderRepository from '@modules/deliveryman/infra/typeorm/repositories/DeliveryManOrderRepository'
import DeliveryManRepository from '@modules/deliveryman/infra/typeorm/repositories/DeliveryManRepository'
import IDeliveryManOrderRepository from '@modules/deliveryman/repositories/IDeliveryManOrderRepository'
import IDeliveryManRepository from '@modules/deliveryman/repositories/IDeliveryManRepository'
import DeliveryProblemsRepository from '@modules/deliveryproblems/infra/typeorm/repositories/DeliveryProblemsRepository'
import IDeliveryProblemsRepository from '@modules/deliveryproblems/repositories/IDeliveryProblemsRepository'
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

container.registerSingleton<IDeliveryManOrderRepository>(
  'DeliveryManOrderRepository',
  DeliveryManOrderRepository,
)

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
)

container.registerSingleton<IDeliveryProblemsRepository>(
  'DeliveryProblemsRepository',
  DeliveryProblemsRepository,
)
