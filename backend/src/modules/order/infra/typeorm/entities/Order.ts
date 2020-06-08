import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import DeliveryMan from '../../../../deliveryman/infra/typeorm/entities/DeliveryMan'
import Recipient from '../../../../recipients/infra/typeorm/entities/Recipient'

@Entity({ name: 'order' })
export default class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipient, { eager: true })
  @JoinColumn({ name: 'recipient_id' })
  recipient: Recipient;

  @ManyToOne(() => DeliveryMan, { eager: true })
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryMan: DeliveryMan;

  @Column({ name: 'signature_id' })
  signature: string;

  @Column()
  product: string;

  @Column({ name: 'canceled_at' })
  canceledAt: Date;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
