import { Injectable } from '@nestjs/common';
import { ArticlesStatus } from 'src/articles/articles.status';
import { CreateArticleDto } from 'src/articles/dtos/createArticle.dto';
import { UpdateArticleDto } from 'src/articles/dtos/updateArticle.dto';
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
      await this.usersService.plusPrivateArticle(userId);
      await this.usersService.updateAllArticles(userId);
      await this.usersService.addPrivateArticleToUser(userId, newArticle);
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
      switch (deleteArticle.status) {
        case ArticlesStatus.PRIVATE:
          await this.usersService.minusPrivateArticle(userId);
          await this.usersService.updateAllArticles(userId);
          await this.usersService.removePrivateArticleFromUser(
            userId,
            deleteArticle,
          );
          break;

        case ArticlesStatus.PUBLIC:
          await this.usersService.minusPublicArticle(userId);
          await this.usersService.updateAllArticles(userId);
          await this.usersService.removePublicArticleFromUser(
            userId,
            deleteArticle,
          );
          break;
      }
    }

    return deleteArticle;
  }

  /**
   * article 객체 업데이트
   */
  async update(
    userId: string,
    articleId: string,
    updateArticleDto: UpdateArticleDto,
  ) {
    const user = await this.usersService.findUserById(userId);

    // 데이터 삭제시 매칭을 위해서 기존 article 객체 불러옴
    const originArticle = await this.articlesService.findOne(articleId);

    // 상태 비교
    const originArticleStatus =
      await this.articlesService.findOneStatus(articleId);

    if (originArticleStatus != updateArticleDto.status) {
      if (
        user.articles.publicArticlesCount >= 9 &&
        updateArticleDto.status === ArticlesStatus.PUBLIC
      ) {
        return 'YOU ALREADY HAVE NINE ARTICLES';
      } else {
        const updateArticle = await this.articlesService.update(
          articleId,
          updateArticleDto,
        );

        switch (updateArticle.status) {
          // PUBLIC -> PRIVATE
          case ArticlesStatus.PRIVATE:
            await this.usersService.plusPrivateArticle(userId);
            await this.usersService.minusPublicArticle(userId);
            await this.usersService.updateAllArticles(userId);
            await this.usersService.removePublicArticleFromUser(
              userId,
              originArticle,
            );
            await this.usersService.addPrivateArticleToUser(
              userId,
              updateArticle,
            );
            break;

          // PRIVATE -> PUBLIC
          case ArticlesStatus.PUBLIC:
            await this.usersService.plusPublicArticle(userId);
            await this.usersService.minusPrivateArticle(userId);
            await this.usersService.updateAllArticles(userId);
            await this.usersService.removePrivateArticleFromUser(
              userId,
              originArticle,
            );
            await this.usersService.addPublicArticleToUser(
              userId,
              updateArticle,
            );
            break;
        }

        return updateArticle;
      }
    }
  }

  /**
   * User 객체 삭제
   * to UsersController deleteUser
   */
  async deleteUser(userId: string) {
    await this.articlesService.deleteAll(userId);
    const deletedUser = await this.usersService.deleteUser(userId);
    return deletedUser;
  }
}
