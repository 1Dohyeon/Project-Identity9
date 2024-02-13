import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/service/users.service';
import { ArticleRepository } from '../articles.repository';
import { Article } from '../articles.schema';
import { CreateArticleDto } from '../dtos/createArticle.dto';
import { UpdateArticleDto } from '../dtos/updateArticle.dto';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private userService: UserService,
  ) {}

  // create new article
  async create(createArticleDto: CreateArticleDto, userId: string) {
    const newArticle = await this.articleRepository.create(createArticleDto);
    await this.userService.addArticleToUser(userId, newArticle._id); // User에 Article ID 추가
    await this.userService.plusPrivateArticle(userId);
    await this.userService.updateAllArticles(userId);

    return newArticle.readOnlyData;
  }

  // update (article)id's article
  async update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update(id, updateArticleDto);
  }

  // delete (article)id's article
  async delete(articleId: string, userId: string) {
    await this.userService.removeArticleFromUser(userId, articleId); // User에 Article ID 삭제
    await this.userService.minusPrivateArticle(userId);
    await this.userService.updateAllArticles(userId);
    const deleteArticle = await this.articleRepository.delete(articleId);

    return deleteArticle;
  }

  // show all articles
  async findAll(): Promise<Article[]> {
    return this.articleRepository.findAll();
  }

  // show (article)id's article
  async findOne(id: string) {
    return this.articleRepository.findOne(id);
  }

  async findArticlesIdByAuthorId(authorId: string) {
    return this.articleRepository.findArticlesIdByAuthorId(authorId);
  }
}
