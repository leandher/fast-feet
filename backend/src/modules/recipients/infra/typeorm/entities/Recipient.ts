import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'recipients' })
export default class Recipient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  cep: string;
}
