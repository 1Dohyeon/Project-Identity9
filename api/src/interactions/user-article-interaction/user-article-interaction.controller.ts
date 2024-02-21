import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ArticlesStatus } from 'src/articles/articles.status';
import { UpdateArticleDto } from 'src/articles/dtos/updateArticle.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { UserArticleInteractionService } from './user-article-interaction.service';

@Controller()
export class UserArticleInteractionController {
  constructor(
    private readonly userArticleInteractionService: UserArticleInteractionService,
  ) {}

  /**
   * article 객체 생성
   */
  @UseGuards(JwtAuthGuard)
  @Post('articles')
  async createArticle(@Request() req: any) {
    const defaultArticle = {
      authorId: req.user.userId,
      status: ArticlesStatus.PRIVATE,
      title: 'New Article',
      description: 'Default content',
      mainImg: './images/default.jpg',
    };
    const newArticle = this.userArticleInteractionService.createArticleForUser(
      req.user.userId,
      defaultArticle,
    );

    return newArticle;
  }

  /**
   * article 객체 업데이트
   */
  @UseGuards(JwtAuthGuard)
  @Patch('articles/:articleId/write')
  updateArticle(
    @Request() req: any,
    @Param('articleId') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.userArticleInteractionService.update(
      req.user.userId,
      articleId,
      updateArticleDto,
    );
  }

  /**
   * article 객체 삭제
   */
  @UseGuards(JwtAuthGuard)
  @Delete('articles/:articleId')
  async deleteArticle(
    @Param('articleId') articleId: string,
    @Request() req: any,
  ) {
    const deleteArticle =
      this.userArticleInteractionService.deleteArticleForUser(
        articleId,
        req.user.userId,
      );
    return deleteArticle;
  }

  // 계정 삭제
  @UseGuards(JwtAuthGuard)
  @Delete('user/:userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userArticleInteractionService.deleteUser(userId);
  }
}
