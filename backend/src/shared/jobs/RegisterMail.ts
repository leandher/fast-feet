import { Worker } from 'bullmq'

import redisConfig from '@config/redis'
import DeliveryMan from '@modules/deliveryman/infra/typeorm/entities/DeliveryMan'
import Mail from '@shared/infra/lib/Mail'

interface Data {
  data: {
    deliveryMan: DeliveryMan;
  };
}

const worker = new Worker(
  'RegisterMail',
  async ({ data }: Data): Promise<void> => {
    const { deliveryMan } = data

    await Mail.sendMail({
      to: `${deliveryMan.name} <${deliveryMan.email}>`,
      subject: 'E-mail de boas vindas',
      template: 'register',
      context: {
        provider: deliveryMan.name,
      },
    })
  },
  {
    connection: redisConfig,
  },
)

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`)
})

export default worker
