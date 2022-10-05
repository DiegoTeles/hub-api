import { Inject } from '@nestjs/common';
import { singleton } from 'tsyringe';
import { Transaction } from './transactions.entity';
import { CreateTransactionDto } from './dto/transactions.dto';
import {
  ITransactionRepository,
  TransactionRepository,
} from './transactions.repository';
import { asyncReadFile } from 'src/helpers/normalizeTxt';
import { currencyFormater } from 'src/helpers/currencyFormater';

export interface ITransactionService {
  createTransaction(request: CreateTransactionDto): Promise<Transaction>;
}

@singleton<ITransactionService>()
export class TransactionService implements ITransactionService {
  constructor(
    @Inject(TransactionRepository)
    private transactionRepository: ITransactionRepository,
  ) {}

  async createTransaction(createTransactionDto: any): Promise<any> {
    if(!createTransactionDto) throw new Error("Documento obrigatório");
    
    const result = asyncReadFile(createTransactionDto);
    result
      .then((res) => {
        res.map(async (seller: any) => {
          if (seller.date) {
            await this.transactionRepository.create(seller);
          }
        });
      })
      .catch((err) => err);
  }

  async findTransactions(queryDto: any): Promise<any> {
    const offset: number = queryDto.page === undefined ? 0 : queryDto.page;
    const limit: number = queryDto.limit === undefined ? 15 : queryDto.limit;
    const seller = queryDto.seller;

    const result: any = await this.transactionRepository.findAndCountAll({
      limit,
      offset,
      raw: true,
      ...(seller && { where: { seller } }),
    });

    const transactions = result.rows.map(
      (transaction: CreateTransactionDto) => ({
        id: transaction.id,
        transactionType: transaction.transactionType,
        date: transaction.date,
        product: transaction.product,
        value: currencyFormater(transaction.value),
        seller: transaction.seller,
      }),
    );

    const totalTransactions = result.rows.reduce(
      (acc: number, transaction: CreateTransactionDto) =>
        acc + transaction.value,
      0,
    );

    return {
      totalCount: result.count,
      totalPages: Math.ceil(result.count / +limit),
      page: +offset,
      limit: +limit,
      data: {
        transactions,
        totalTransactions: currencyFormater(totalTransactions),
      },
    };
  }
}
