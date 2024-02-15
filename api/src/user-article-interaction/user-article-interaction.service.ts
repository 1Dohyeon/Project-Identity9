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

  /**
   * 새 Article 생성 및 user 에 articleId 추가
   * to UserArticleInteractionController createArticle
   */
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

  /**
   * article 삭제 및 user에 존재하는 articleId 삭제
   * to UserArticleInteractionController deleteArticle
   */
  async deleteArticleForUser(articleId: string, userId: string) {
    const deleteArticle = await this.articlesService.delete(articleId);

    if (deleteArticle) {
      await this.usersService.removeArticleFromUser(userId, articleId); // User에 Article ID 삭제
      await this.usersService.minusPrivateArticle(userId);
      await this.usersService.updateAllArticles(userId);
    }

    return deleteArticle;
  }

  /**
   * User 객체 삭제
   * to UsersController deleteUser
   */
  async deleteUser(userId: string) {
    const deletedUser = await this.usersService.deleteUser(userId);
    await this.articlesService.deleteAll(userId);
    return deletedUser;
  }
}
