import { Injectable } from '@nestjs/common';
import { Articles } from 'src/articles/articles.schema';
import { RegisterRequestDto } from 'src/auth/dtos/signup.request.dto';
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
  async create(user: RegisterRequestDto) {
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
   * id를 통해서 user를 찾아줌
   * UserArticleInteractionService update calls it
   */
  async findUserById(userId: string): Promise<any | null> {
    return this.usersRepository.findUserByIdWithoutPassword(userId);
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
   * user가 만든 articleId를 그 user의 publicArticles[]에 전달
   * UserArticleInteractionService createArticleForUser calls it
   */
  async addPublicArticleToUser(
    userId: string,
    article: Articles,
  ): Promise<Users> {
    return this.usersRepository.addPublicArticleToUser(userId, article);
  }

  /**
   * user가 만든 articleId를 그 user의 privateArticles[]에 전달
   * UserArticleInteractionService createArticleForUser calls it
   */
  async addPrivateArticleToUser(
    userId: string,
    article: Articles,
  ): Promise<Users> {
    return this.usersRepository.addPrivateArticleToUser(userId, article);
  }

  /**
   * user가 만든 article을 publicArticles[]에서 삭제
   * UserArticleInteractionService deleteArticleForUser calls it
   */
  async removePublicArticleFromUser(
    userId: string,
    article: Articles,
  ): Promise<Users> {
    return this.usersRepository.removePublicArticleFromUser(userId, article);
  }

  /**
   * user가 만든 article을 privateArticles[]에서 삭제
   * UserArticleInteractionService deleteArticleForUser calls it
   */
  async removePrivateArticleFromUser(
    userId: string,
    article: Articles,
  ): Promise<Users> {
    return this.usersRepository.removePrivateArticleFromUser(userId, article);
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
   * user의 allArticles 데이터 update
   * UserArticleInteractionService createArticleForUser calls it
   * UserArticleInteractionService deleteArticleForUser calls it
   */
  async updateAllArticles(userId: string) {
    return this.usersRepository.updateAllArticles(userId);
  }
}
