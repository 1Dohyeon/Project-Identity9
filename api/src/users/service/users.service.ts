import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}
}
