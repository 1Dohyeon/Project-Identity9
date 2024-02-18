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
      authorId: req.user.id,
      status: ArticlesStatus.PRIVATE,
      title: 'New Article',
      description: 'Default content',
    };
    const newArticle = this.userArticleInteractionService.createArticleForUser(
      req.user.id,
      defaultArticle,
    );
    return newArticle;
  }

  /**
   * article 객체 업데이트
   */
  @UseGuards(JwtAuthGuard)
  @Patch('articles/:id/write')
  updateArticle(
    @Request() req: any,
    @Param('id') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.userArticleInteractionService.update(
      req.user.id,
      articleId,
      updateArticleDto,
    );
  }

  /**
   * article 객체 삭제
   */
  @UseGuards(JwtAuthGuard)
  @Delete('articles/:id')
  async deleteArticle(@Param('id') articleId: string, @Request() req: any) {
    const deleteArticle =
      this.userArticleInteractionService.deleteArticleForUser(
        articleId,
        req.user.id,
      );
    return deleteArticle;
  }

  // 계정 삭제
  @UseGuards(JwtAuthGuard)
  @Delete('user/:id')
  deleteUser(@Param('id') userId: string) {
    return this.userArticleInteractionService.deleteUser(userId);
  }
}
