import { ValidateMiddleware } from './../common/validate.middleware';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { HTTPError } from '../errors/http-error.class';
import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserController } from './user.interface';
import { UserService } from './user.service';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: UserService,
  ) {
    super(loggerService);
    this.bindRouters([
      {
        path: '/register',
        method: 'post',
        func: this.register,
        middleware: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        path: '/login',
        method: 'post',
        func: this.login,
        middleware: [new ValidateMiddleware(UserLoginDto)],
      },
    ]);
  }

  async login(
    { body }: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.validateUser(body);
    if (!result) {
      return next(new HTTPError(401, 'hehe', 'login'));
    }

    this.ok(res, { email: body.email });
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.createUser(body);
    if (!result) {
      return next(new HTTPError(422, 'такой пользователь уже сущ'));
    }

    this.ok(res, { email: result.email, name: result.name, id: result.id });
  }
}
