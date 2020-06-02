import { container } from 'tsyringe'

import '@modules/users/providers'

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
