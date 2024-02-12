import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { UsersRepository } from '../users.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getCurrentUser(nickname: string) {
    return this.usersRepository.getCurrentUser(nickname);
  }

  async updateInfo(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateInfo(id, updateUserDto);
  }

  async deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }

  async plusPrivateArticle(id: string) {
    return this.usersRepository.plusPrivateArticle(id);
  }
}
