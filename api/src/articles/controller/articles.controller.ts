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
import { UserService } from 'src/users/service/users.service';
import { ArticlesStatus } from '../articles.status';
import { UpdateArticleDto } from '../dtos/updateArticle.dto';
import { ArticlesService } from '../service/articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private userService: UserService,
  ) {}

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

    const newArticle = this.articlesService.create(defaultArticleData);
    const newArticlesId = await this.articlesService.findArticlesIdByAuthorId(
      req.user.id,
    );

    await this.userService.updateArticlesId(req.user.id, newArticlesId);
    await this.userService.plusPrivateArticle(req.user.id);
    await this.userService.updateAllArticles(req.user.id);

    return await newArticle;
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
  async deleteArticle(@Param('id') id: string, @Request() req: any) {
    return (
      await this.articlesService.delete(id),
      await this.userService.minusPrivateArticle(req.user.id),
      await this.userService.updateAllArticles(req.user.id)
    );
  }
}
