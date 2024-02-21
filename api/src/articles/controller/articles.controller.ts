import { Controller, Get, Param } from '@nestjs/common';
import { ArticlesService } from '../service/articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // show all articles
  @Get()
  getArticlesPage() {
    // return this.articlesService.findAll();
    return this.articlesService.findAllPublicArticles();
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
