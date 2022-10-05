export class CreateTransactionDto {
  id?: number;
  transactionType: number;
  date: string;
  product: string;
  value: number;
  seller: string;
}
