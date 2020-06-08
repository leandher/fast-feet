import exphbs from 'express-handlebars'

import nodemailer, { Transporter, SendMailOptions } from 'nodemailer'
import nodemailerhbs from 'nodemailer-express-handlebars'
import { resolve } from 'path'

import mailConfig from '@config/mail'

interface MailOptions extends SendMailOptions{
  template: string;
  context: {
    [key: string]: string;
  };
}

class Mail {
  private transporter: Transporter;

  constructor () {
    const {
      host, port, secure, auth,
    } = mailConfig

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    })

    this.configureTemplates()
  }

  configureTemplates () {
    const viewPath = resolve(__dirname, '..', '..', 'views', 'emails')
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      }),
    )
  }

  sendMail (message: MailOptions) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    })
  }
}

export default new Mail()
