import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../articles.repository';
import { Article } from '../articles.schema';

@Injectable()
export class ArticlesService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async create(createArticleDto: any, userId: string): Promise<Article> {
    return this.articleRepository.create(createArticleDto, userId);
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepository.findAll();
  }

  async findOne(id: string): Promise<Article | null> {
    return this.articleRepository.findOne(id);
  }
}
