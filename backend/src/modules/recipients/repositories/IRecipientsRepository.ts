import ICreateRecipientDTO from '@modules/recipients/dtos/ICreateRecipientDTO'
import Recipient from '@modules/recipients/infra/typeorm/entities/Recipient'

export default interface RecipientsRepository {
  findAll(): Promise<Recipient[]>;
  findById(id: number): Promise<Recipient | undefined>;
  create(data: ICreateRecipientDTO): Promise<Recipient>;
  save(recipient: Recipient): Promise<Recipient>;
}
