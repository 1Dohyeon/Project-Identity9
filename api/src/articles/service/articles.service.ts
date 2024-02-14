import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { UsersService } from 'src/users/service/users.service';
import { ArticleRepository } from '../articles.repository';
import { Articles } from '../articles.schema';
import { CreateArticleDto } from '../dtos/createArticle.dto';
import { UpdateArticleDto } from '../dtos/updateArticle.dto';

@Injectable()
export class ArticlesService {
  private userService: UsersService;

  constructor(
    private moduleRef: ModuleRef,
    private readonly articleRepository: ArticleRepository,
  ) {}

  onModuleInit() {
    // onModuleInit 생명주기 훅을 사용하여 userService 인스턴스를 늦게 가져옴.
    this.userService = this.moduleRef.get(UsersService, { strict: false });
  }

  // create new article
  async create(createArticleDto: CreateArticleDto, userId: string) {
    const newArticle = await this.articleRepository.create(createArticleDto);
    if (newArticle) {
      await this.userService.addArticleToUser(userId, newArticle._id); // User에 Article ID 추가
      await this.userService.plusPrivateArticle(userId);
      await this.userService.updateAllArticles(userId);
    }

    return newArticle;
  }

  // update (article)id's article
  async update(articleId: string, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update(articleId, updateArticleDto);
  }

  // delete (article)id's article
  async delete(articleId: string, userId: string) {
    const deleteArticle = await this.articleRepository.delete(articleId);

    if (deleteArticle) {
      await this.userService.removeArticleFromUser(userId, articleId); // User에 Article ID 삭제
      await this.userService.minusPrivateArticle(userId);
      await this.userService.updateAllArticles(userId);
    }

    return deleteArticle;
  }

  async deleteAll(userId: string) {
    return this.articleRepository.deleteAll(userId);
  }

  // show all articles
  async findAll(): Promise<Articles[]> {
    return this.articleRepository.findAll();
  }

  // show (article)id's article
  async findOne(articleId: string) {
    return this.articleRepository.findOne(articleId);
  }

  async findArticlesIdByAuthorId(authorId: string) {
    return this.articleRepository.findArticlesIdByAuthorId(authorId);
  }
}
