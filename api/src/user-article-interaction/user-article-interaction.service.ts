import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from 'src/articles/dtos/createArticle.dto';
import { ArticlesService } from 'src/articles/service/articles.service';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class UserArticleInteractionService {
  constructor(
    private readonly usersService: UsersService,
    private readonly articlesService: ArticlesService,
  ) {}

  async deleteAll(userId: string) {
    return this.articlesService.deleteAll(userId);
  }

  async createArticleForUser(
    userId: string,
    createArticleDto: CreateArticleDto,
  ) {
    const newArticle = await this.articlesService.create(createArticleDto);
    if (newArticle) {
      await this.usersService.addArticleToUser(userId, newArticle._id);
      await this.usersService.plusPrivateArticle(userId);
      await this.usersService.updateAllArticles(userId);
    }
    return newArticle;
  }

  async deleteArticleForUser(articleId: string, userId: string) {
    const deleteArticle = await this.articlesService.delete(articleId);

    if (deleteArticle) {
      await this.usersService.removeArticleFromUser(userId, articleId); // User에 Article ID 삭제
      await this.usersService.minusPrivateArticle(userId);
      await this.usersService.updateAllArticles(userId);
    }

    return deleteArticle;
  }

  async deleteUser(userId: string) {
    const deletedUser = await this.usersService.deleteUser(userId);
    await this.deleteAll(userId);
    return deletedUser;
  }
}
