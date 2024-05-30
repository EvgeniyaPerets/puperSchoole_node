import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsEmail({}, { message: 'неверная почта' })
  email: string;

  @IsString({ message: 'не указан пароль' })
  password: string;

  @IsString({ message: 'не указано имя' })
  name: string;
}
