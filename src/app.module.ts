import { Module } from '@nestjs/common';
import { TransactionModule } from './transactions/transactions.module';

import { DatabaseModule } from './core/database/database.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    DatabaseModule,
    TransactionModule,
    WinstonModule.forRoot(winstonConfig),
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
