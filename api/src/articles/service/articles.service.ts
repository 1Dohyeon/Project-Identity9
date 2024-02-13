import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { UserService } from 'src/users/service/users.service';
import { ArticleRepository } from '../articles.repository';
import { Article } from '../articles.schema';
import { CreateArticleDto } from '../dtos/createArticle.dto';
import { UpdateArticleDto } from '../dtos/updateArticle.dto';

@Injectable()
export class ArticlesService {
  private userService: UserService;

  constructor(
    private moduleRef: ModuleRef,
    private readonly articleRepository: ArticleRepository,
  ) {
    // ModuleRef를 사용하여 UserService 인스턴스를 늦게 가져옴
    this.userService = this.moduleRef.get(UserService, { strict: false });
  }

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

  async deleteAll(userId: string) {
    return this.articleRepository.deleteAll(userId);
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
