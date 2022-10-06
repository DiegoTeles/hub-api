import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { UserRole } from './users-roles.enum';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CredentialsDto } from 'src/auth/dto/credentials.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async createAdminUser(createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      console.log('createUserDto :>> ', createUserDto);
      try {
        const salt = await bcrypt.genSalt();
        const user = {
          status: true,
          name: createUserDto.name,
          role: 'ADMIN',
          email: createUserDto.email,
          confirmationToken: crypto.randomBytes(32).toString('hex'),
          salt,
          password: await this.hashPassword(createUserDto.password, salt),
        };

        console.log('user :>> ', user);
        return await this.userRepository.create(user);
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;
    const user = await this.userRepository.findOne({ email, status: true });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
