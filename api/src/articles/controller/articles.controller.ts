import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ArticlesStatus } from '../articles.status';
import { UpdateArticleDto } from '../dtos/updateArticle.dto';
import { ArticlesService } from '../service/articles.service';

@Controller('articles')
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
    const userId = req.user.id;

    const newArticle = this.articlesService.create(defaultArticle, userId);
    return newArticle;
  }

  // show page that you can write
  @Get(':id/write')
  updateArticlePage(@Param('id') articleId: string) {
    return this.articlesService.findOne(articleId);
  }

  // update (article)id's article
  @UseGuards(JwtAuthGuard)
  @Patch(':id/write')
  updateArticle(
    @Param('id') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(articleId, updateArticleDto);
  }

  // delete (article)id's article
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteArticle(@Param('id') articleId: string, @Request() req: any) {
    const userId = req.user.id;

    const deleteArticle = this.articlesService.delete(articleId, userId);
    return deleteArticle;
  }
}
