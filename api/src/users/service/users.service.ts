import { Injectable } from '@nestjs/common';
import { SignupRequestDto } from 'src/auth/dtos/signup.request.dto';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { UsersRepository } from '../users.repository';
import { Users } from '../users.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * 닉네임 사용자 페이지
   * UsersController getCurrentUser calls it
   */
  async getCurrentUser(nickname: string) {
    return this.usersRepository.getCurrentUser(nickname);
  }

  /**
   * 프로필 수정
   * UsersController updateInfo calls it
   */
  async updateInfo(userId: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateInfo(userId, updateUserDto);
  }

  /**
   * email 중복 확인
   * AuthService signUp calls it
   */
  async existsByEmail(email: string): Promise<boolean> {
    return this.usersRepository.existsByEmail(email);
  }

  /**
   * nickname 중복 확인
   * AuthService signUp calls it
   */
  async existsByNickname(nickname: string): Promise<boolean> {
    return this.usersRepository.existsByNickname(nickname);
  }

  /**
   * user 객체 생성
   * AuthService signUp calls it
   */
  async create(user: SignupRequestDto) {
    return await this.usersRepository.create(user);
  }

  /**
   * password 정보 없는 user 객체 반환
   * AuthService jwtLogIn calls it
   */
  async getReadOnlyData(id: string): Promise<any | null> {
    return this.usersRepository.getReadOnlyData(id);
  }

  /**
   * email을 통해서 user를 찾아줌
   * AuthService jwtLogIn calls it
   */
  async findUserByEmail(email: string): Promise<any | null> {
    return this.usersRepository.findUserByEmail(email);
  }

  /**
   * userId에 맞는 user 객체 삭제
   * userController deleteUser calls it
   */
  async deleteUser(userId: string) {
    const deletedUser = await this.usersRepository.deleteUser(userId);
    return deletedUser;
  }

  /**
   * user의 privateArticle 데이터 +1
   * UserArticleInteractionService createArticleForUser calls it
   */
  async plusPrivateArticle(userId: string) {
    return this.usersRepository.plusPrivateArticle(userId);
  }

  /**
   * user의 publicArticle 데이터 +1
   * UserArticleInteractionService createArticleForUser calls it
   */
  async plusPublicArticle(userId: string) {
    return this.usersRepository.plusPublicArticle(userId);
  }

  /**
   * user가 만든 articleId를 그 user에게 전달
   * UserArticleInteractionService createArticleForUser calls it
   */
  async addArticleToUser(userId: string, articleId: string): Promise<Users> {
    return this.usersRepository.addArticleToUser(userId, articleId);
  }

  /**
   * user의 privateArticle 데이터 -1
   * UserArticleInteractionService deleteArticleForUser calls it
   */
  async minusPrivateArticle(userId: string) {
    return this.usersRepository.minusPrivateArticle(userId);
  }

  /**
   * user의 publicArticle 데이터 -1
   * UserArticleInteractionService deleteArticleForUser calls it
   */
  async minusPublicArticle(userId: string) {
    return this.usersRepository.minusPublicArticle(userId);
  }

  /**
   * user가 만든 articleId를 그 user의 데이터에서 삭제
   * UserArticleInteractionService deleteArticleForUser calls it
   */
  async removeArticleFromUser(
    userId: string,
    articleId: string,
  ): Promise<Users> {
    return this.usersRepository.removeArticleFromUser(userId, articleId);
  }

  /**
   * user의 allArticles 데이터 update
   * UserArticleInteractionService createArticleForUser calls it
   * UserArticleInteractionService deleteArticleForUser calls it
   */
  async updateAllArticles(userId: string) {
    return this.usersRepository.updateAllArticles(userId);
  }
}
