import { Queue, Job } from 'bullmq'

import redisConfig from '@config/redis'
import * as jobs from '@shared/jobs'

const queues = Object.values(jobs).map(job => (new Queue(job.name, { connection: redisConfig })))

export default {
  queues,
  add (name: string, data: any): Promise<Job<any, any>> {
    const queue = queues.find(queue => queue.name === name)

    return queue.add(name, data, { attempts: 3 })
  },
}
