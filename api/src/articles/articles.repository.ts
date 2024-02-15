import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Articles } from './articles.schema';
import { CreateArticleDto } from './dtos/createArticle.dto';
import { UpdateArticleDto } from './dtos/updateArticle.dto';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel(Articles.name) private readonly articlesModel: Model<Articles>,
  ) {}

  // ArticlesRepository 내의 모든 메서드는 ArticleService를 통해서만 접근 가능

  /**
   * 새로운 article 생성
   */
  async create(createArticleDto: CreateArticleDto): Promise<any | null> {
    const newArticle = new this.articlesModel({
      ...createArticleDto,
    });
    newArticle.save();

    return newArticle.withoutDescription;
  }

  /**
   * article 업데이트
   */
  async update(articleId: string, updateArticleDto: UpdateArticleDto) {
    const article = await this.articlesModel
      .findByIdAndUpdate(articleId, updateArticleDto, { new: true })
      .exec(); // .exec() 메소드는 쿼리를 실행하고, 프로미스(Promise)를 반환하기 위해 사용됨.
    return article.withoutDescription;
  }

  /**
   * article 삭제
   */
  async delete(articleId: string) {
    const article = await this.articlesModel
      .findByIdAndDelete(articleId)
      .exec();

    return article.withoutDescription;
  }

  /**
   * 모든 article들 조회
   * Mongoose에서 직접적으로 가상 필드를 쿼리 결과에 포함시키는 것은 지원하지 않기 때문에,
   * 문서를 조회한 후 각 문서의 가상 필드에 접근하여 필요한 데이터를 수동으로 구성해야함.
   */
  async findAll(): Promise<any[]> {
    const articles = await this.articlesModel.find().exec();
    return articles.map((article) => article.withoutDescription);
  }

  /**
   * 특정 article 조회
   */
  async findOne(articleId: string): Promise<any> {
    const article = await this.articlesModel.findById(articleId).exec();
    return article ? article.withoutDescription : null;
  }

  /**
   * 모든 article 삭제
   */
  async deleteAll(userId: string) {
    // "userId: userId" 기존 문법에 ES6 속성 적용 userId(파라미터와 객체 키가 같을 때 적용)
    return await this.articlesModel.deleteMany({ authorId: userId });
  }
}
