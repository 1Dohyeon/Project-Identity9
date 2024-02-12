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
  getOneArticle(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  // create new article
  @UseGuards(JwtAuthGuard)
  @Post()
  async createArticle(@Request() req: any) {
    const defaultArticleData = {
      authorId: req.user.id,
      status: ArticlesStatus.PRIVATE,
      title: 'New Article',
      description: 'Default content',
    };
    return await this.articlesService.create(defaultArticleData);
  }

  // show page that you can write
  @Get(':id/write')
  updateArticlePage(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  // update (article)id's article
  @UseGuards(JwtAuthGuard)
  @Patch(':id/write')
  updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, updateArticleDto);
  }

  // delete (article)id's article
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteArticle(@Param('id') id: string) {
    return this.articlesService.delete(id);
  }
}
