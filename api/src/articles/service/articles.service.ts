import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../articles.repository';
import { Article } from '../articles.schema';
import { CreateArticleDto } from '../dtos/createArticle.dto';
import { UpdateArticleDto } from '../dtos/updateArticle.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async create(createArticleDto: CreateArticleDto) {
    const newArticle = await this.articleRepository.create(createArticleDto);
    return newArticle.readOnlyData;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update(id, updateArticleDto);
  }

  async delete(id: string) {
    return this.articleRepository.delete(id);
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepository.findAll();
  }

  async findOne(id: string) {
    return this.articleRepository.findOne(id);
  }
}
