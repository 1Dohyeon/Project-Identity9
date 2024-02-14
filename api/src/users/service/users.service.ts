import { Injectable } from '@nestjs/common';
import { ArticlesService } from 'src/articles/service/articles.service';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { UsersRepository } from '../users.repository';
import { Users } from '../users.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly articlesService: ArticlesService,
  ) {}

  async getCurrentUser(nickname: string) {
    return this.usersRepository.getCurrentUser(nickname);
  }

  async updateInfo(userId: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateInfo(userId, updateUserDto);
  }

  async deleteUser(userId: string) {
    const deletedUser = await this.usersRepository.deleteUser(userId);
    await this.articlesService.deleteAll(userId);
    return deletedUser;
  }

  async plusPrivateArticle(userId: string) {
    return this.usersRepository.plusPrivateArticle(userId);
  }

  async minusPrivateArticle(userId: string) {
    return this.usersRepository.minusPrivateArticle(userId);
  }

  async updateAllArticles(userId: string) {
    return this.usersRepository.updateAllArticles(userId);
  }

  async addArticleToUser(userId: string, articleId: string): Promise<Users> {
    return this.usersRepository.addArticleToUser(userId, articleId);
  }

  async removeArticleFromUser(
    userId: string,
    articleId: string,
  ): Promise<Users> {
    return this.usersRepository.removeArticleFromUser(userId, articleId);
  }
}
