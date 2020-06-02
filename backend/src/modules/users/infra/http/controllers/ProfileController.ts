import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ShowProfileService from '@modules/users/services/ShowProfileService'
import AppError from '@shared/errors/AppError'

export default class ProfileController {
  public async get (req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user.id
      const showProfile = container.resolve(ShowProfileService)

      const user = await showProfile.execute({
        userId: Number(userId)
      })

      return res.json(classToClass(user))
    } catch (error) {
      return res.status(500).json(new AppError(error.message, 500))
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const user = {}

    return res.json(user)
  }
}
