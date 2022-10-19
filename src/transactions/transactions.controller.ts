import 'multer';
import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindTransactionQueryDto } from './dto/find-query.dto';

import { TransactionService } from './transactions.service';
import { AllExceptionsFilter } from 'src/filters/http-exception.filter';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../users/users-roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';

@Controller('transaction')
/* @Role(UserRole.USER)
@UseGuards(AuthGuard(), RolesGuard) */
@UseFilters(AllExceptionsFilter)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File ) {
    const transaction = await this.transactionService.createTransaction(file);
    return {
      transaction,
      message: 'Transaction cadastrada com sucesso',
    };
  }

  @Get()
  async findTransactions(@Query() query: FindTransactionQueryDto) {
    return await this.transactionService.findTransactions(query);
  }
}
