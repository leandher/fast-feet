export default interface ICreateOrderDTO {
  recipient: { id: number };
  deliveryMan: { id: number };
  product: string;
}
