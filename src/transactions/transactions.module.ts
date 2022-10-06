import { Module } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { TransactionController } from './transactions.controller';
import { transactionProviders } from './transactions.providers';
import { TransactionRepository } from './transactions.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [TransactionRepository],
  providers: [
    TransactionService,
    ...transactionProviders,
    TransactionRepository,
  ],
  controllers: [TransactionController],
})
export class TransactionModule {}
