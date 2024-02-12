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

  // 전체 게시물 보여줌
  @Get()
  getArticlesPage() {
    return this.articlesService.findAll();
  }

  // 특정 게시물 보여줌
  @Get(':id')
  getOneArticle(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  // 게시물 만들어줌
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

  // 게시물 작성 페이지
  @Get(':id/write')
  updateArticlePage(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  // 게시물 업데이트
  @UseGuards(JwtAuthGuard)
  @Patch(':id/write')
  updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  deleteArticle() {
    return 'hello world';
  }
}
