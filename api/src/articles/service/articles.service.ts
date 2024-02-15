import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../articles.repository';
import { Articles } from '../articles.schema';
import { CreateArticleDto } from '../dtos/createArticle.dto';
import { UpdateArticleDto } from '../dtos/updateArticle.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  // create new article
  async create(createArticleDto: CreateArticleDto) {
    const newArticle = await this.articleRepository.create(createArticleDto);
    return newArticle;
  }

  // update (article)id's article
  async update(articleId: string, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update(articleId, updateArticleDto);
  }

  // delete (article)id's article
  async delete(articleId: string) {
    const deleteArticle = await this.articleRepository.delete(articleId);
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
