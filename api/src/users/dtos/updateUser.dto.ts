import { PickType } from '@nestjs/swagger';
import { Users } from '../users.schema';

export class UpdateUserDto extends PickType(Users, ['name', 'nickname']) {}
