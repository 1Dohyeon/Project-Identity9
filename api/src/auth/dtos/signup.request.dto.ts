import { PickType } from '@nestjs/swagger';
import { Users } from 'src/users/users.schema';

export class RegisterRequestDto extends PickType(Users, [
  'email',
  'password',
  'name',
  'nickname',
]) {}
