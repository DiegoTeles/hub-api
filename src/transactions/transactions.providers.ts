import { Transaction } from './transactions.entity';

export const transactionProviders = [
  {
    provide: 'TRANSACTION_REPOSITORY',
    useValue: Transaction,
  },
];
