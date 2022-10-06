import {
  Injectable,
  UnprocessableEntityException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/users.entity';
import { UserRole } from '../users/users-roles.enum';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      try {
        const salt = await bcrypt.genSalt();
        const user = {
          status: true,
          name: createUserDto.name,
          role: 'USER',
          email: createUserDto.email,
          confirmationToken: crypto.randomBytes(32).toString('hex'),
          salt,
          password: await this.hashPassword(createUserDto.password, salt),
        };

        return await this.userRepository.create(user);
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
  }

  async signIn(credentialsDto: any) {
    const user = await this.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return { token };
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
