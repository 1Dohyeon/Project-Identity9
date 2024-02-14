import { Injectable } from '@nestjs/common';
import { ArticlesService } from 'src/articles/service/articles.service';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { UsersRepository } from '../users.repository';
import { User } from '../users.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly articlesService: ArticlesService,
  ) {}

  async getCurrentUser(nickname: string) {
    return this.usersRepository.getCurrentUser(nickname);
  }

  async updateInfo(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateInfo(id, updateUserDto);
  }

  async deleteUser(userId: string) {
    const deletedUser = await this.usersRepository.deleteUser(userId);
    await this.articlesService.deleteAll(userId);
    return deletedUser;
  }

  async plusPrivateArticle(id: string) {
    return this.usersRepository.plusPrivateArticle(id);
  }

  async minusPrivateArticle(id: string) {
    return this.usersRepository.minusPrivateArticle(id);
  }

  async updateAllArticles(id: string) {
    return this.usersRepository.updateAllArticles(id);
  }

  async addArticleToUser(userId: string, articleId: string): Promise<User> {
    return this.usersRepository.addArticleToUser(userId, articleId);
  }

  async removeArticleFromUser(
    userId: string,
    articleId: string,
  ): Promise<User> {
    return this.usersRepository.removeArticleFromUser(userId, articleId);
  }
}
