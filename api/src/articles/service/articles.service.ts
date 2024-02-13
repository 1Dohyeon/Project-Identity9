import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../articles.repository';
import { Article } from '../articles.schema';
import { CreateArticleDto } from '../dtos/createArticle.dto';
import { UpdateArticleDto } from '../dtos/updateArticle.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  // create new article
  async create(createArticleDto: CreateArticleDto) {
    const newArticle = await this.articleRepository.create(createArticleDto);
    return newArticle.readOnlyData;
  }

  // update (article)id's article
  async update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update(id, updateArticleDto);
  }

  // delete (article)id's article
  async delete(id: string) {
    return this.articleRepository.delete(id);
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
