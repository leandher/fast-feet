import { Request, Response } from 'express'

import { classToClass } from 'class-transformer'
import { container } from 'tsyringe'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

export default class SessionController {
  public async sign (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const authenticateUser = container.resolve(AuthenticateUserService)

    const { user, token } = await authenticateUser.execute({ email, password })

    return res.json({ user: classToClass(user), token })
  }
}
