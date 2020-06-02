import 'reflect-metadata'
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { errors } from 'celebrate'

import AppError from '@shared/errors/AppError'
import routes from '@shared/infra/http/routes'

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
    // eslint-disable-next-line
    this.express.use((err: Error, req: Request, res: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          status: 'error',
          message: err.message
        })
      }

      console.error(err)

      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      })
    })
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
