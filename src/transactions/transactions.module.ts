import { Module } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { TransactionController } from './transactions.controller';
import { transactionProviders } from './transactions.providers';
import { TransactionRepository } from './transactions.repository';

@Module({
  imports: [],
  exports: [TransactionRepository],
  providers: [TransactionService, ...transactionProviders, TransactionRepository],
  controllers: [TransactionController],
})
export class TransactionModule {}
