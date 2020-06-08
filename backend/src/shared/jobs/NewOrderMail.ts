import { Worker } from 'bullmq'

import redisConfig from '@config/redis'
import Order from '@modules/order/infra/typeorm/entities/Order'
import Mail from '@shared/infra/lib/Mail'

interface Data {
  data: {
    order: Order;
  };
}

const worker = new Worker(
  'NewOrderMail',
  async ({ data }: Data): Promise<void> => {
    const { order } = data

    console.log(order)

    await Mail.sendMail({
      to: `${order.deliveryMan.name} <${order.deliveryMan.email}>`,
      subject: 'Nova entrega',
      template: 'new-order',
      context: {
        provider: order.deliveryMan.name,
        address: `${order.recipient.street}, ${order.recipient.number}, ${order.recipient.complement}, ${order.recipient.district}, ${order.recipient.city}, ${order.recipient.state}`,
        order: `nº${order.id} - ${order.product}`,
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
