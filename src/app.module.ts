import { Module } from '@nestjs/common';
import { TransactionModule } from './transactions/transactions.module';

import { DatabaseModule } from './core/database/database.module';
import { HealthController } from './health/health.controller';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import { AllExceptionsFilter } from './filters/http-exception.filter';

@Module({
  imports: [
    DatabaseModule,
    TransactionModule,
    WinstonModule.forRoot(winstonConfig),
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
