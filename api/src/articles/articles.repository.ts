import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './articles.schema';
import { CreateArticleDto } from './dtos/createArticle.dto';

@Injectable()
export class ArticleRepository {
  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    userId: string,
  ): Promise<Article> {
    const newArticle = new this.articleModel({
      ...createArticleDto,
      authorId: userId,
    });
    return newArticle.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article | null> {
    return this.articleModel.findById(id).exec();
  }
}
