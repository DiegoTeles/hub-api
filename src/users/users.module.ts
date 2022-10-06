import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersRepository,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
