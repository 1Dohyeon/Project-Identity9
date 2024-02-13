import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './articles.schema';
import { CreateArticleDto } from './dtos/createArticle.dto';
import { UpdateArticleDto } from './dtos/updateArticle.dto';

@Injectable()
export class ArticleRepository {
  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
  ) {}

  // create new article
  async create(createArticleDto: CreateArticleDto): Promise<any | null> {
    const newArticle = new this.articleModel({
      ...createArticleDto,
    });
    return newArticle.save();
  }

  // update article
  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const article = await this.articleModel
      .findByIdAndUpdate(id, updateArticleDto, { new: true })
      .exec(); // .exec() 메소드는 쿼리를 실행하고, 프로미스(Promise)를 반환하기 위해 사용됨.
    return article.readOnlyData;
  }

  // delete article
  async delete(articleId: string) {
    const article = await this.articleModel.findByIdAndDelete(articleId).exec();
    return article.readOnlyData;
  }

  // Mongoose에서 직접적으로 가상 필드를 쿼리 결과에 포함시키는 것은 지원하지 않기 때문에,
  // 문서를 조회한 후 각 문서의 가상 필드에 접근하여 필요한 데이터를 수동으로 구성해야함.
  async findAll(): Promise<any[]> {
    const articles = await this.articleModel.find().exec();
    return articles.map((article) => article.readOnlyData);
  }

  // 객체가 항상 존재한다고 보장할 수 없다. 즉, 문서를 찾지 못한 경우 null 또는 undefined가 될 수 있으므로, 이를 고려한 접근 방식이 필요함.
  async findOne(id: string): Promise<any> {
    const article = await this.articleModel.findById(id).exec();
    return article ? article.readOnlyData : null;
  }

  // user id를 통해서 articles의 id만 가져옴
  async findArticlesIdByAuthorId(authorId: string): Promise<string[]> {
    const articles = await this.articleModel.find({ authorId }).exec(); // 해당 사용자가 작성한 모든 게시글 조회
    const articlesId = articles.map((article) => article._id.toString()); // 각 게시글의 ID를 문자열로 변환하여 배열 생성
    return articlesId;
  }

  async deleteAll(userId: string) {
    return await this.articleModel.deleteMany({ authorId: userId });
  }
}
