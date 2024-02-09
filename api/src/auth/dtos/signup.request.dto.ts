import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/users.schema';

export class SignupRequestDto extends PickType(User, [
  'email',
  'password',
  'name',
  'nickname',
]) {}
