import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ArticlesService } from '../service/articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // 전체 게시물 보여줌
  @Get()
  getArticlesPage() {
    return 'hello world';
  }

  // 게시물 만들어줌
  @UseGuards(JwtAuthGuard)
  @Post()
  async createArticle(@Request() req: any) {
    const defaultArticleData = {
      title: 'New Article',
      description: 'Default content',
    };
    return await this.articlesService.create(defaultArticleData, req.user.id);
  }

  // 특정 게시물 보여줌
  @Get(':id')
  getOneArticle() {
    return 'hello world';
  }

  @Patch(':id')
  modifyArticle() {
    return 'hello world';
  }

  @Delete(':id')
  deleteArticle() {
    return 'hello world';
  }
}
