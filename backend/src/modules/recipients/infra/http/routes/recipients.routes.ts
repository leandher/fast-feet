import { Router } from 'express'

import { celebrate, Segments, Joi } from 'celebrate'

import RecipientsController from '@modules/recipients/infra/http/controllers/RecipientsController'
import ensureAuthenticade from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const recipientsRouter = Router()
const recipientsController = new RecipientsController()

recipientsRouter.use(ensureAuthenticade)

recipientsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      street: Joi.string().required(),
      number: Joi.string().required(),
      complement: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      cep: Joi.string().required(),
      district: Joi.string().required(),
    },
  }),
  recipientsController.create,
)

recipientsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.number().integer().required(),
      street: Joi.string().required(),
      number: Joi.string().required(),
      complement: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      cep: Joi.string().required(),
      district: Joi.string().required(),
    },
  }),
  recipientsController.update,
)

recipientsRouter.get('/', recipientsController.index)

export default recipientsRouter
