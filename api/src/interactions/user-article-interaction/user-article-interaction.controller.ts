import {
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArticlesStatus } from 'src/articles/articles.status';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { HttpExceptionFilter } from 'src/common/exception/httpException.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { UserArticleInteractionService } from './user-article-interaction.service';

@Controller('articles')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class UserArticleInteractionController {
  constructor(
    private readonly userArticleInteractionService: UserArticleInteractionService,
  ) {}

  // create new article
  @UseGuards(JwtAuthGuard)
  @Post()
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

  // delete (article)id's article
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteArticle(@Param('id') articleId: string, userId: string) {
    const deleteArticle =
      this.userArticleInteractionService.deleteArticleForUser(
        articleId,
        userId,
      );
    return deleteArticle;
  }
}
