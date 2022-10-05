import { CreateTransactionDto } from "./transactions.dto";

export class ReturnTransactionDto {
  transaction: CreateTransactionDto;
  message: string;
}
