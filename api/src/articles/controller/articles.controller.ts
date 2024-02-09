import { Controller, Get } from '@nestjs/common';

@Controller('articles')
export class ArticlesController {
  @Get()
  getArticlesPage() {
    return 'hello world';
  }

  @Get(':id')
  getOneArticle() {
    return 'hello world';
  }
}
