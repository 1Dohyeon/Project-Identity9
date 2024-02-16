import {
  Controller,
  Get,
  Param,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exception/httpException.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { ArticlesService } from '../service/articles.service';

@Controller('articles')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // show all articles
  @Get()
  getArticlesPage() {
    return this.articlesService.findAll();
  }

  // show (article)id's article
  @Get(':id')
  getOneArticle(@Param('id') articleId: string) {
    return this.articlesService.findOne(articleId);
  }

  // show page that you can write
  @Get(':id/write')
  updateArticlePage(@Param('id') articleId: string) {
    return this.articlesService.findOne(articleId);
  }
}
