import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class UserArticleInteractionService {
  constructor(private usersService: UsersService) {}

  async plusPrivateArticle(userId: string) {
    return this.usersService.plusPrivateArticle(userId);
  }

  async minusPrivateArticle(userId: string) {
    return this.usersService.minusPrivateArticle(userId);
  }

  async updateAllArticles(userId: string) {
    return this.usersService.updateAllArticles(userId);
  }

  async addArticleToUser(userId: string, articleId: string) {
    return this.usersService.addArticleToUser(userId, articleId);
  }

  async removeArticleFromUser(userId: string, articleId: string) {
    return this.usersService.removeArticleFromUser(userId, articleId);
  }
}
