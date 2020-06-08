import 'reflect-metadata'
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'

import { router, setQueues } from 'bull-board'
import { errors } from 'celebrate'
import cors from 'cors'
import path from 'path'

import AppError from '@shared/errors/AppError'
import routes from '@shared/infra/http/routes'
import Queues from '@shared/infra/lib/Queues'

import '@shared/infra/typeorm'
import '@shared/container'

class App {
  public express: express.Application;

  public constructor () {
    this.express = express()

    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(errors())
    setQueues(Queues.queues)
    this.express.use('/admin/jobs', router)
    // eslint-disable-next-line
    this.express.use((err: Error, req: Request, res: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          status: 'error',
          message: err.message,
        })
      }

      console.error(err)

      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    })
  }

  private routes (): void {
    this.express.use(routes)
    this.express.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
  }
}

export default new App().express
