import { singleton } from 'tsyringe';
import { BaseRepository, IBaseRepository } from '../core/repos/base.repos';
import { Transaction } from './transactions.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ITransactionRepository extends IBaseRepository<Transaction> {}

@singleton<TransactionRepository>()
export class TransactionRepository
  extends BaseRepository<Transaction>
  implements ITransactionRepository
{
  constructor() {
    super(Transaction);
  }
}
