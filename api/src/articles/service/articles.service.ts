import { Injectable } from '@nestjs/common';
import { ArticlesRepository } from '../articles.repository';
import { Articles } from '../articles.schema';
import { ArticlesStatus } from '../articles.status';
import { CreateArticleDto } from '../dtos/createArticle.dto';
import { UpdateArticleDto } from '../dtos/updateArticle.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  /**
   * 새로운 article 생성
   * UserArticleInteractionService createArticleForUser calls it
   */
  async create(createArticleDto: CreateArticleDto) {
    const newArticle = await this.articlesRepository.create(createArticleDto);
    return newArticle;
  }

  /**
   * articleId에 맞는 게시물 삭제
   * UserArticleInteractionService deleteArticleForUser calls it
   */
  async delete(articleId: string) {
    const deleteArticle = await this.articlesRepository.delete(articleId);
    return deleteArticle;
  }

  /**
   * userId가 만든 모든 article들 삭제
   * UserArticleInteractionService deleteUser calls it
   */
  async deleteAll(userId: string) {
    return this.articlesRepository.deleteAll(userId);
  }

  /**
   * articleId 게시물 업데이트
   * UserArticleInteractionService deleteArticleForUser calls it
   */
  async update(articleId: string, updateArticleDto: UpdateArticleDto) {
    return this.articlesRepository.update(articleId, updateArticleDto);
  }

  /**
   * 모든 article들 조회
   */
  async findAll(): Promise<Articles[]> {
    return this.articlesRepository.findAll();
  }

  /**
   * 모든 PUBLIC article들 조회
   * ArticlesController getArticlesPage calls it
   */
  async findAllPublicArticles(): Promise<Articles[]> {
    return this.articlesRepository.findAllPublicArticles();
  }

  /**
   * 파라미터와 같은 id값을 갖는 article 조회
   * ArticlesController getOneArticle calls it
   */
  async findOne(articleId: string) {
    return this.articlesRepository.findOne(articleId);
  }

  async findOneStatus(articleId: string): Promise<ArticlesStatus | null> {
    return this.articlesRepository.findOneStatus(articleId);
  }
}
