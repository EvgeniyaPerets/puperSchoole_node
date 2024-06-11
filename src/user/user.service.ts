import { UserModel } from '@prisma/client';
import { IUserRepository } from './user.interface.repository';
import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {}

  async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
    const user = new User(email, name);
    const salt = this.configService.get('SALT');
    await user.setPassword(password, salt);
    const existedUser = await this.userRepository.find(email);
    if (existedUser) {
      return null;
    }
    return this.userRepository.create(user);
  }

  async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
    const existedUser = await this.userRepository.find(email);
    if (!existedUser) {
      return false;
    }

    const user = new User(existedUser.email, existedUser.name, existedUser.password);
    return user.comparePassword(password);
  }

  async getUserInfo(email: string): Promise<UserModel | null> {
    return this.userRepository.find(email);
  }
}
